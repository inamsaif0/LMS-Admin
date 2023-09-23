// import mongoose from "mongoose";

// const connection={};

// async function connect(){
//   if(connection.isConnected){
//     return;
//   }
//   const db = await mongoose.connect(process.env.MONGO_URI)

//   connection.isConnected= db.connections[0].readyState;
//   console.log(connection.isConnected);
// }

// export default connect;
import mongoose from 'mongoose';

const connection = {};

async function dbConnect() {
    if (connection.isConnected) {
        return;
    }

    const db = await mongoose.connect("mongodb+srv://otp:inam1234@cluster0.jnbirzy.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.isConnected = db.connections[0].readyState;
    console.log(connection.isConnected);
}

export default dbConnect;