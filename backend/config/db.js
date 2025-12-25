import mongoose from "mongoose";

const connectDB = async () => {
  const connect = await mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("monogDB connected successfully"));
};

export default connectDB;
