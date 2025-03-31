import mongoose from "mongoose";

const employSchema = new mongoose.Schema(
    {
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
}
);

const Employ = mongoose.model("employ-registration", employSchema);

export default Employ;
