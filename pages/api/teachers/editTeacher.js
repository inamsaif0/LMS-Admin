import connect from '../../../lib/mongodb'
import Teachers from '../../../model/teachers';

connect();

const editTeacher = async (req, res) => {

    const { query: { id }, method } = req;
    try {
        const updateList = await Teachers.findByIdAndUpdate(req.body._id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updateList) {
            return res.status(400).json({ success: false, data:'dddd' });
        }
        res.status(200).json({ success: true, data: updateList });
    } catch (error) {
        res.status(400).json({ success: false });
    }
            
    }


export default editTeacher;