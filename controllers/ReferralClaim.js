const Referral = require("../models/Referral");
const generateCustomId = (accNumber, ifscCode) => {
    const accPart = accNumber.slice(0, Math.ceil(accNumber.length / 2)); // first half of accNumber
    const ifscPart = ifscCode.slice(Math.floor(ifscCode.length / 2));    // second half of ifscCode
    const randomNum = Math.floor(1000 + Math.random() * 9000);          // random 4 digit number
    return accPart + ifscPart + randomNum;
};
const claimReferralPayment = async (req, res) => {
    const {
        payableAmount,
        referralCode,
        accNumber,
        ifscCode,
        bankName,
        mobileNumber,
        activeStatus
    } = req.body;

    try {
        const user = await Referral.findOne({ referralCode });

        if (!user) {
            return res.status(404).json({ message: "Referral code not found" });
        }

        if (user.totalAmount < payableAmount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        user.transactions.push({
            _id: generateCustomId(accNumber, ifscCode),
            amount: payableAmount,
            accNumber,
            ifscCode,
            bankName,
            mobileNumber,
            activeStatus,
            name: user.name,
            phone: user.phone
        });

        await user.save();

        return res.status(200).json({ message: "Referral claim successful", user });
    } catch (error) {
        console.error("Error in referral claim:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getReferralDataByCode = async (req, res) => {
    const { referralCode } = req.body;

    if (!referralCode) {
        return res.status(400).json({ message: "referralCode is required" });
    }

    try {
        const referral = await Referral.findOne({ referralCode });

        if (!referral) {
            return res.status(404).json({ message: "Referral code not found" });
        }

        return res.status(200).json({ success: true, referral });
    } catch (error) {
        console.error("Error fetching referral:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const getAllReferrals = async (req, res) => {
    try {
        const referrals = await Referral.find({});
        return res.status(200).json({ success: true, referrals });
    } catch (error) {
        console.error("Error fetching all referrals:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const updateTransactionStatus = async (req, res) => {
  const { referralId, transactionId } = req.body;

  if (!referralId || !transactionId) {
    return res.status(400).json({ message: "referralId and transactionId are required" });
  }

  try {
    const referral = await Referral.findById(referralId);
    if (!referral) {
      return res.status(404).json({ message: "Referral not found" });
    }

    // Find transaction by _id inside transactions array
    const transaction = referral.transactions.id(transactionId);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.activeStatus === "paid") {
      return res.status(400).json({ message: "Transaction already marked as paid" });
    }

    // Update status to paid
    transaction.activeStatus = "paid";

    // Subtract transaction amount from totalAmount
    referral.totalAmount = referral.totalAmount - transaction.amount;

    await referral.save();

    return res.status(200).json({ message: "Transaction status updated to paid", referral });
  } catch (error) {
    console.error("Error updating transaction status:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Export both functions in one object
module.exports = { claimReferralPayment, getReferralDataByCode, getAllReferrals ,updateTransactionStatus};
