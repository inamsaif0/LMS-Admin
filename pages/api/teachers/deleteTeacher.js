import connect from '../../../lib/mongodb';
import Teachers from '../../../model/teachers';

connect();

const deleteTeacher = async (req, res) => {
    const { query: { id }, method } = req;

    try {
        const deleteList = await Teachers.deleteOne({ _id: id });

        if (deleteList.deletedCount === 0) {
            return res.status(400).json({ success: false, message: 'No documents were deleted.' });
        }

        res.status(200).json({ success: true, data: deleteList });
    } catch (error) {
        console.error('Error during deletion:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

export default deleteTeacher;
