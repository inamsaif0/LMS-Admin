
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

const deleteAudio = async (req, res) => {

    // return data;
    // res.status(200).json({result})
    try {
        const { id } = req.body;
    console.log('data', id)
        // Delete the document by _id
        const result = await audioFiles.deleteOne({ _id: id });
    
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Audio file not found' });
        }
    
        res.status(200).json({ message: 'Audio file deleted successfully' });
      } catch (error) {
        console.error('Error deleting audio file:', error);
        res.status(500).json({ error: 'Failed to delete audio file' });
      }
    }

export default deleteAudio;