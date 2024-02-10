import mongoose, { models } from "mongoose";

const ChatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
     type: mongoose.Schema.Types.ObjectId,
     required: true   
    },
    conversations: [{
        tempId: String,
        role: String,
        parts: String,
    }]
}, {
    timestamps: true
});

const ChatModel = models.Chat || mongoose.model('Chat', ChatSchema);
export default ChatModel;