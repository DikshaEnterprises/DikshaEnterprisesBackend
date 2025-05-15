const Razorpay = require('razorpay');
const crypto = require('crypto');
const Application = require('../models/Application');

const razorpay = new Razorpay({
  key_id:"rzp_test_IFv0P1wWi2CvpJ",
  key_secret:"tePk6StiauVHYTqf5MpKLmDp",
});

exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_order_${Math.random() * 1000}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    res.status(500).json({ error: 'Order creation failed' });
  }
};

exports.verifyPayment = async (req, res) => {
  const {
    formData,
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    amount,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "tePk6StiauVHYTqf5MpKLmDp")
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const application = new Application({
      ...formData,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      paidAmount: amount / 100,
    });

    await application.save();
    res.json({ success: true, message: "Payment Verified & Data Saved" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
};
