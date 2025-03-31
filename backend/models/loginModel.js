import mongoose from 'mongoose';


const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    remember: { type: Boolean, required: true, default: false },
    role_name: { type: String, required: true },
  },
  { timestamps: true }
);

const Users = mongoose.model("Users", userSchema);

export { Users };
