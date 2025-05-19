
const jobRoles = {
  "Field Survey Executive": {
    location: "Bihar (Field Work)",
    work: "Booth level survey, voter data collection, and outreach.",
    salary: "₹13,000/month + Performance Incentives",
    tenure: "5–6 months",
    GeneralFee: 350,
    ReservationFee: 200
  },
  "Telecalling Executive": {
    location: "Work from Home",
    work: "Calling voters and data entry.",
    salary: "₹13,500/month + Incentives on Conversion",
    tenure: "5–6 months",
    GeneralFee: 350,
    ReservationFee: 200
  },
  "Social Media Manager": {
    location: "Bihar (Field/Studio Work)",
    work: "Managing outreach on Facebook, WhatsApp, Instagram.",
    salary: "₹18,000/month + Bonus",
    tenure: "5–6 months",
    GeneralFee: 400,
    ReservationFee: 300
  },
  "District Coordinator": {
    location: "Bihar (District-wise)",
    work: "Supervising teams, reporting progress, and area-level control.",
    salary: "₹22,500/month + Team Performance Incentives",
    tenure: "5–6 months",
    GeneralFee: 500,
    ReservationFee: 300
  },
  "Video Editor": {
    location: "Bihar (Field/Studio Work)",
    work: "Editing campaign videos, creating clips and ads.",
    salary: "₹18,000/month + Bonus",
    tenure: "5–6 months",
    GeneralFee: 400,
    ReservationFee: 300
  },
  "Supervisor": {
    location: "Bihar (Field/Studio Work)",
    work: "Field Supervision",
    salary: "₹20,000/month + Bonus",
    tenure: "5–6 months",
    GeneralFee: 500,
    ReservationFee: 300
  },
  "Media Anchor": {
    location: "Bihar (Field/Studio Work)",
    work: "Hosting live discussions, debates & social events.",
    salary: "₹20,000/month + On-Air Bonus",
    tenure: "5–6 months",
    GeneralFee: 500,
    ReservationFee: 300
  },
};

const getJobDetails = (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const job = jobRoles[title];

  if (!job) {
    return res.status(404).json({ message: "Job role not found" });
  }

  return res.json({ title, ...job });
};

module.exports = { getJobDetails };
