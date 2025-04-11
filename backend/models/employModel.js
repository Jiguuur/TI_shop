import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const employSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  role_name: { 
    type: String, 
    required: true,
    enum: ['admin', 'financier', 'transport_manager', 'cashier'],
  },
  password: { type: String, required: true },
});

// 🔐 Hash password before saving
employSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔍 Method to compare entered password with hashed password
employSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Employ = mongoose.model("employ-registration", employSchema);
export default Employ;
