import mongoose from "mongoose";

let isConnected = false; // Track the connection status

const connectDB = async () => {
  if (isConnected) {
    console.log("✅ Using existing MongoDB connection.");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);

    isConnected = db.connections[0].readyState === 1;

    if (isConnected) {
      console.log(`✅ MongoDB connected! DB Host: ${db.connection.host}`);
    } else {
      console.log("❌ MongoDB not connected!");
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Exit on failure
  }
};

export default connectDB;
