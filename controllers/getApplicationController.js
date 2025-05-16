const Application = require('../models/Application');

exports.getApplication = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, message: "userId is required" });
  }

  try {
    const applications = await Application.find({ userId });

    if (applications.length === 0) {
      return res.status(404).json({ success: false, message: "No applications found" });
    }
   const filteredApplications = applications.map(app => {
      const appObj = app.toObject();
      delete appObj.userId;
      delete appObj.orderId;
      delete appObj.paymentId;
      return appObj;
    });
    res.status(200).json({ success: true, filteredApplications });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
