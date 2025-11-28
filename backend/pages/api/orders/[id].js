import connectDB from '../../../lib/db';
import Order from '../../../lib/models/Order';
import mongoose from 'mongoose';

export default async function handler(req, res) {
    await connectDB();

    const {
        query: { id },
        method,
    } = req;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid order ID',
        });
    }

    switch (method) {
        case 'GET':
            try {
                const order = await Order.findById(id);

                if (!order) {
                    return res.status(404).json({
                        success: false,
                        message: 'Order not found',
                    });
                }

                res.status(200).json({
                    success: true,
                    data: order,
                });
            } catch (error) {
                console.error('Error fetching order:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error fetching order',
                    error: error.message,
                });
            }
            break;

        case 'PUT':
            try {
                // Update order (e.g., status update)
                const { status, notes } = req.body;

                const updateData = {};
                if (status) updateData.status = status;
                if (notes !== undefined) updateData.notes = notes;

                const order = await Order.findByIdAndUpdate(
                    id,
                    updateData,
                    {
                        new: true,
                        runValidators: true,
                    }
                );

                if (!order) {
                    return res.status(404).json({
                        success: false,
                        message: 'Order not found',
                    });
                }

                res.status(200).json({
                    success: true,
                    message: 'Order updated successfully',
                    data: order,
                });
            } catch (error) {
                console.error('Error updating order:', error);
                res.status(400).json({
                    success: false,
                    message: 'Error updating order',
                    error: error.message,
                });
            }
            break;

        case 'DELETE':
            try {
                const order = await Order.findByIdAndDelete(id);

                if (!order) {
                    return res.status(404).json({
                        success: false,
                        message: 'Order not found',
                    });
                }

                res.status(200).json({
                    success: true,
                    message: 'Order deleted successfully',
                    data: {},
                });
            } catch (error) {
                console.error('Error deleting order:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error deleting order',
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