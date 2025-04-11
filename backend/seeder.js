import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import employees from './data/employees.js';
import companies from './data/companies.js';
import Employ from './models/employModel.js';
import Company from './models/companyModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Clear existing data
    await Employ.deleteMany();
    await Company.deleteMany();
    
    // Import new data
    const createdEmployees = await Employ.insertMany(employees);
    const createdCompanies = await Company.insertMany(companies);
    
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Employ.deleteMany();
    await Company.deleteMany();
    
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}