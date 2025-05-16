const Application = require('../models/Application');

exports.getReferralEarnings = async (req, res) => {
  const { referralCode } = req.params;

  try {
    const applications = await Application.find({
      referralCode,
      paidAmount: { $gt: 0 }
    });

    const totalPaid = applications.reduce((sum, app) => sum + app.paidAmount, 0);
    const commission = +(totalPaid * 0.30).toFixed(2);

    res.json({
      referralCode,
      totalPaid,
      commission,
      count: applications.length
    });
  } catch (error) {
    console.error("Referral earnings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
