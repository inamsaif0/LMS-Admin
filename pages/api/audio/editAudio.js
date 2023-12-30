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
import audioFiles from '../../../model/audioFiles';
connect();

const editAudio = async (req, res) => {

    // return data;
    // res.status(200).json({result})
    try {
        const { _id, status } = req.body;
    console.log(_id, status, "data is fetched")
        // Update the status in the MongoDB document based on _id
        const response = await audioFiles.updateOne({ _id }, { $set: { status: status } });
    
        res.status(200).json({ message: 'Status updated successfully', data: response });
      } catch (error) {

        res.status(500).json({ error: 'Failed to update status' });
      }
            
    }


export default editAudio;