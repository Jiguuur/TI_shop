import Employ from '../models/employModel.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
  const employees = await Employ.find(); 
  if (employees.length > 0) {
    res.json(employees); 
  } else {
    res.status(404);
    throw new Error("No employees found"); 
  }
});
