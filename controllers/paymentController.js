const Razorpay = require('razorpay');
const crypto = require('crypto');
const dotenv = require('dotenv');
const Application = require('../models/Application');
const Referral = require('../models/Referral');
dotenv.config();
const razorpay = new Razorpay({
 key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
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
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, ...formData } = req.body;

  console.log('Received formData:', formData);

  // Verify signature
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    console.log('Invalid signature!');
    return res.status(400).json({ success: false, message: "Invalid signature" });
  }

  try {
    // Fetch order from Razorpay to get trusted amount
    const order = await razorpay.orders.fetch(razorpay_order_id);
    const amount = order.amount; // amount in paise (100 paise = 1 INR)
    console.log('Fetched order amount:', amount);

    // Create new application record using trusted amount
    const application = new Application({
      ...formData,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      paidAmount: amount / 100, // convert paise to INR
    });

    await application.save();
    console.log('Application saved:', application);

    // Referral processing — use trusted amount, not frontend amount
    const { referralCode} = formData;
    const paidAmount = amount / 100;

    if (referralCode ) {
      console.log('Referral info present:', referralCode, paidAmount);

      let existingReferral = await Referral.findOne({ referralCode });
      if (existingReferral) {
        existingReferral.totalAmount += paidAmount;
        await existingReferral.save();
        console.log('Referral updated:', existingReferral);
      } else {
        const newReferral = new Referral({
          referralCode,
          totalAmount: paidAmount,
        });
        await newReferral.save();
        console.log('New referral saved:', newReferral);
      }
    } else {
      console.log('No referral info or missing fields');
    }

    res.json({ success: true, message: "Payment Verified & Data Saved" });
  } catch (err) {
    console.error('Error in verifyPayment:', err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
exports.fetchAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

exports.updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { applicationStatus } = req.body;

  try {
    const updated = await Application.findByIdAndUpdate(
      id,
      { applicationStatus },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Application not found" });
    }
    res.json({ success: true, updated });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
};