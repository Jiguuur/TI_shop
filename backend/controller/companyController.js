import Company from "../models/companyModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const list = asyncHandler(async (req, res) => {
  const companies = await Company.find();
  if (companies.length > 0) {
    res.json(companies);
  } else {
    res.status(404);
    throw new Error("No companies found");
  }
});
