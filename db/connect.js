import mongoose from "mongoose";

/**
 * Connects to MongoDB with optimized Deno/NPM settings
 * @param {string} url - The MongoDB connection string
 */
const connectDB = async (url) => {
  if (!url) {
    throw new Error("MongoDB URI is missing!");
  }

  // Set strictQuery to prepare for Mongoose 7/8+ changes
  mongoose.set("strictQuery", false);

  try {
    const conn = await mongoose.connect(url, {
      // These help with connection stability in serverless/containerized Deno environments
      serverSelectionTimeoutMS: 5000, 
      connectTimeoutMS: 10000,
    });

    console.log(`🍃 MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    // In Deno, we often want to exit if the DB fails to connect on startup
    Deno.exit(1);
  }
};

export default connectDB;