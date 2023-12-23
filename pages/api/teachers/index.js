import connect from '../../../lib/mongodb'
// import Teachers from '../../../model/teachers'
import Teachers from '../../../model/teachers'
// import multer from 'multer';

connect();

// const upload  = multer({
//     storage: multer.diskStorage({
//         destination: function (req, file, cb){
//             cb(null, path.join(process.cwd(), "public", "upload"));
//         },
//         filename: function (req, file, cb){
//             cb(null, new Date().getTime() + "=" + file.originalname);
//         },
//     }),
// });
const Teacher = async (req, res) => {
    const { method } = req;

    
    switch(method) {
        case 'GET':
            try{
                const list = await Teachers.find({});
                res.status(200).json({success: true, data: list})
            } catch(error){
                res.status(400).json({success: false})
            }
            break;

        case 'POST':
            try {
                const existingUser = await Teachers.findOne({ email: req.body.email });
            
                if (existingUser) {
                    // User with the provided email already exists
                    return res.status(409).json({ success: false, message: 'User with this email already exists.' });
                }
            
                // User with the provided email doesn't exist, create a new one
                const newUser = await Teachers.create({
                    email: req.body.email,
                    password: req.body.password,
                    teacherName: req.body.teacherName,
                    role: 'teacher'
                });
            
                res.status(201).json({ success: true, data: newUser });
            }
            catch (error){
            
                res.status(400).json({success:false});
            }
            break;

        default: 
            res.status(400).json({success:false, data:'sssss'});
            break;

            
    }
}

export default Teacher;