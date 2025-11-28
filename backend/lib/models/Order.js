import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
    menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    subtotal: {
        type: Number,
        required: true,
    },
});

const OrderSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: [true, 'Please provide customer name'],
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please provide phone number'],
        trim: true,
    },
    address: {
        type: String,
        required: [true, 'Please provide delivery address'],
    },
    items: [OrderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'],
        default: 'Pending',
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    notes: {
        type: String,
        default: '',
    },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);