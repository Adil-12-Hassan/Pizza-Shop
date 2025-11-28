import connectDB from '../../../lib/db';
import MenuItem from '../../../lib/models/MenuItem';

export default async function handler(req, res) {
    await connectDB();

    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                // Get all available menu items
                const menuItems = await MenuItem.find({ available: true }).sort({ category: 1, name: 1 });

                res.status(200).json({
                    success: true,
                    count: menuItems.length,
                    data: menuItems,
                });
            } catch (error) {
                console.error('Error fetching menu items:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error fetching menu items',
                    error: error.message,
                });
            }
            break;

        case 'POST':
            try {
                // Create new menu item (Admin functionality)
                const menuItem = await MenuItem.create(req.body);

                res.status(201).json({
                    success: true,
                    data: menuItem,
                });
            } catch (error) {
                console.error('Error creating menu item:', error);
                res.status(400).json({
                    success: false,
                    message: 'Error creating menu item',
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