import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;
if (!URI) throw new Error("Please define the MONGODB_URI environment variable");
const connect = async () => {
    try {
        await mongoose.connect(URI);
    } catch (error) {
        throw new Error(`MongoDB connection error: ${error}`);
    }
}

export default connect;