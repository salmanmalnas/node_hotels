import mongoose from "mongoose";

// Define the mangoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotel';

// setup MongoDB connections
mongoose.connect(mongoURL);

const db = mongoose.connection;

//Define event listner for connection

db.on('connected', () =>{
    console.log("Connected to MongoDB server");
});

db.on('error', (error) =>{
    console.log("MongoDB conection error", error);
});

db.on('disconnected', () =>{
    console.log("MongoDB disconnected");
});

//export the database connection

export default db;