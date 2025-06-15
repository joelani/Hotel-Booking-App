import mongoose from "mongoose";

const connectDB = async () => {
    try {
        // Register listeners before connecting
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected");
        });

        mongoose.connection.on("error", (err) => {
            console.log("MongoDB connection error:", err.message);
        });

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB disconnected");
        });

        process.on("SIGINT", async () => {
            await mongoose.connection.close();
            console.log("MongoDB disconnected on app termination");
            process.exit(0);
        });

        // Connect to MongoDB
        await mongoose.connect(`${process.env.MONGODB_URL}/hotel-booking`);
        console.log("MongoDB connected successfully (after await)");
    } catch (error) {
        console.log("Database connection failed:", error.message);
    }
};

export default connectDB;