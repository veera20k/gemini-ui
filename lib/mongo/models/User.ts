import mongoose, { models } from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    image: String,
}, {
    timestamps: true
});

export default models.User || mongoose.model('User', userSchema);
