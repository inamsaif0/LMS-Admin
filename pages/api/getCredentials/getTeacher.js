import connect from '../../../lib/mongodb'
import Teachers from '../../../model/teachers';

connect();

const teacherLists = async (req, res) => {

            try{
                const list = await Teachers.findOne({ email: req.body.email });
                res.json({success: true, data: list})

            } catch(error){
                res.status(400).json({ success: false })
            }
            
            
    }


export default teacherLists;