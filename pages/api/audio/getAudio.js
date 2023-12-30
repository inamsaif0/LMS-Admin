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

const teacherLists = async (req, res) => {

    let data = req
    const { email } = req.query;
    // const bucketName = 'otp-mobile';
    // const prefix = "otp-audio/"+email+"/";
    const query = { teacherEmail: email };

    // const result = await collection.find(query).toArray();
    console.log(data,'sssssssssssss')
    // return data;
    // res.status(200).json({result})
    try{

      // let data = req
      // const { email } = req.query;
      // const bucketName = 'otp-mobile';
      // const prefix = "otp-audio/"+email+"/";
      // const query = { teacherEmail: email };
  
      const result = await audioFiles.find(query);
      
      console.log(data,'sssssssssssss')
      // return data;
      res.status(200).json({result})
    }
    catch (error) {
      console.error('Error retrieving files:', error);
      res.status(500).json({ error: 'Failed to retrieve files' });
    }
            
    }


export default teacherLists;