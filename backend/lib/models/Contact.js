import mongoose from 'mongoose';

const ContactMessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide your phone number'],
        trim: true,
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
        maxlength: [1000, 'Message cannot exceed 1000 characters'],
    },
    status: {
        type: String,
        enum: ['New', 'Read', 'Replied', 'Archived'],
        default: 'New',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.ContactMessage || mongoose.model('ContactMessage', ContactMessageSchema);
