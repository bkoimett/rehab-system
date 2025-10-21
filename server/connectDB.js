const mongoose = require("mongoose");

const connectDB = async ()=> {
    try {
        // ignore undefined fields in query
        mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Database Connected ${conn.connection.host}`);    
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;