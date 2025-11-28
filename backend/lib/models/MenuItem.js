import mongoose from 'mongoose';

const MenuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide item name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please provide item description'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide item price'],
        min: 0,
    },
    category: {
        type: String,
        required: [true, 'Please provide category'],
        enum: ['Pizza', 'Burger', 'Shawarma', 'Drinks', 'Sides', 'Desserts'],
    },
    image: {
        type: String,
        default: '/images/placeholder.jpg',
    },
    available: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.MenuItem || mongoose.model('MenuItem', MenuItemSchema);