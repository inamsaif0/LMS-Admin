// app.get('/audio',async(req,res)=>{
    // const { email } = req.query;
    // const bucketName = 'otp-mobile';
    // const prefix = "otp-audio/"+email+"/";
  
    // try{
    //   const params={
    //     Bucket:bucketName,
    //     Delimiter: '/',
    //     Prefix: prefix
    //   }
    //   const data = await s3.listObjects(params).promise();
    //   const fileKeys = data.Contents.map(obj => obj.Key);
    //   res.json(fileKeys);
    // }
    // catch (error) {
    //   console.error('Error retrieving files:', error);
    //   res.status(500).json({ error: 'Failed to retrieve files' });
    // }
  
//   })
import connect from '../../../lib/mongodb'
import Teachers from '../../../model/teachers';
import contentList from '../../../model/contentList'

connect();

const editAudio = async (req, res) => {

    const { query: { id }, method } = req;

    try {
        const deleteList = await contentList.deleteOne({_id: id});
        if(!deleteList) {
            res.status(400).json({success:false})
        }
        res.status(200).json({ success: true, data: {} });

    }   catch (error) {
        res.status(400).json({ success: false });

    }
            
    }


export default editAudio;