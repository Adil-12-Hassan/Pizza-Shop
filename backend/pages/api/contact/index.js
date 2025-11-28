import connectDB from '../../../lib/db';
import Contact from '../../../lib/models/Contact';
import { validateEmail, validatePhoneNumber, sanitizeInput } from '../../../utils/validation';

export default async function handler(req, res) {
    await connectDB();

    const { method } = req;

    switch (method) {
        case 'POST':
            try {
                const { name, email, phoneNumber, message } = req.body;

                // Validate required fields
                if (!name || !phoneNumber || !message) {
                    return res.status(400).json({
                        success: false,
                        message: 'Please provide name, phone number, and message',
                    });
                }

                // Validate phone number
                if (!validatePhoneNumber(phoneNumber)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid phone number format',
                    });
                }

                // Validate email if provided
                if (email && !validateEmail(email)) {
                    return res.status(400).json({
                        success: false,
                        message: 'Invalid email format',
                    });
                }

                // Create contact message
                const contactMessage = await Contact.create({
                    name: sanitizeInput(name),
                    email: email ? sanitizeInput(email) : '',
                    phoneNumber: sanitizeInput(phoneNumber),
                    message: sanitizeInput(message),
                });

                res.status(201).json({
                    success: true,
                    message: 'Thank you for contacting us! We will get back to you soon.',
                    data: contactMessage,
                });
            } catch (error) {
                console.error('Error saving contact message:', error);
                res.status(400).json({
                    success: false,
                    message: 'Error saving contact message',
                    error: error.message,
                });
            }
            break;

        case 'GET':
            try {
                // Get all contact messages (Admin functionality)
                const messages = await Contact.find({}).sort({ createdAt: -1 }).limit(50);

                res.status(200).json({
                    success: true,
                    count: messages.length,
                    data: messages,
                });
            } catch (error) {
                console.error('Error fetching contact messages:', error);
                res.status(500).json({
                    success: false,
                    message: 'Error fetching contact messages',
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