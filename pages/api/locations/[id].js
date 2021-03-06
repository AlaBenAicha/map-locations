import dbConnect from '../../../utils/dbConnect';
import Location from '../../../models/Location';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch (method) {
        case 'GET':
            try {
                const location = await Location.findById(id);

                if (!location) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: location });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'PUT':
            try {
                const location = await Location.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                });

                if (!location) {
                    return res.status(400).json({ success: false });
                }

                res.status(200).json({ success: true, data: location });
            } catch (error) {
                res.status(400).json({ success: false });
            }
            break;
        case 'DELETE':
            try {
                const deletedLocation = await Location.deleteOne({ _id: id });

                if (!deletedLocation) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        default:
            res.status(400).json({ success: false })
            break;
    }
}