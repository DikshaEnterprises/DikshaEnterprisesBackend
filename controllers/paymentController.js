const Razorpay = require('razorpay');
const crypto = require('crypto');
const Application = require('../models/Application');

const razorpay = new Razorpay({
  key_id: "rzp_test_IFv0P1wWi2CvpJ",
  key_secret: "tePk6StiauVHYTqf5MpKLmDp",
});

exports.createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
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
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    ... formData
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "tePk6StiauVHYTqf5MpKLmDp")
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    try {
      // ✅ Secure: Fetch amount from Razorpay backend
      const order = await razorpay.orders.fetch(razorpay_order_id);
      const amount = order.amount; // in paise

      const application = new Application({
        ...formData,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        paidAmount: amount / 100,
      });

      await application.save();
      res.json({ success: true, message: "Payment Verified & Data Saved" });
    } catch (err) {
      console.error("Error saving application:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
};
