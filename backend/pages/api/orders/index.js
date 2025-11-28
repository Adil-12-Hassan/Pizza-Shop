import connectDB from '../../lib/db';
import Order from '../../lib/models/Order';
import { validatePhoneNumber, validateOrderItems, sanitizeInput } from '../../utils/validation';

export default async function handler(req, res) {
    await connectDB();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Get all orders (you can add pagination later)
                const orders = await Order.find({}).sort({ orderDate: -1 }).limit(50);

                res.status(200).json({
                    success: true,
                    count: orders.length,
                    data: orders,
                });
            } catch (error) {
                console.error('Error fetching orders:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error fetching orders',
                    error: error.message,
                });
            }
            break;

        case 'POST':
            try {
                const { customerName, phoneNumber, address, items, totalAmount, notes } = req.body;

                // Validate required fields
                if (!customerName || !phoneNumber || !address || !items) {
                    return res.status(400).json({
                        success: false,
                        message: 'Please provide all required fields',
                    });
                }

                // Validate phone number
                if (!validatePhoneNumber(phoneNumber)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid phone number format',
                    });
                }

                // Validate order items
                const itemsValidation = validateOrderItems(items);
                if (!itemsValidation.valid) {
                    return res.status(400).json({
                        success: false,
                        message: itemsValidation.message,
                    });
                }

                // Calculate total amount
                let calculatedTotal = 0;
                const processedItems = items.map(item => {
                    const subtotal = item.price * item.quantity;
                    calculatedTotal += subtotal;
                    return {
                        ...item,
                        subtotal: subtotal,
                    };
                });

                // Verify total amount matches
                if (Math.abs(calculatedTotal - totalAmount) > 0.01) {
                    return res.status(400).json({
                        success: false,
                        message: 'Total amount mismatch',
                    });
                }

                // Create order
                const order = await Order.create({
                    customerName: sanitizeInput(customerName),
                    phoneNumber: sanitizeInput(phoneNumber),
                    address: sanitizeInput(address),
                    items: processedItems,
                    totalAmount: calculatedTotal,
                    notes: notes ? sanitizeInput(notes) : '',
                    status: 'Pending',
                });

                res.status(201).json({
                    success: true,
                    message: 'Order placed successfully!',
                    data: order,
                });
            } catch (error) {
                console.error('Error creating order:', error);
                res.status(400).json({
                    success: false,
                    message: 'Error creating order',
                    error: error.message,
                });
            }
            break;

        default:
            res.status(405).json({
                success: false,
                message: `Method ${method} not allowed`,
            });
            break;
    }
}