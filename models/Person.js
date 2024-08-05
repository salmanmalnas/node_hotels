import mongoose from "mongoose";

//person Schema
const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    jobid : {
        type : Number,
        required : true,
        unique : true
    },
    age : {
        type : Number,
        required : true
    },
    work : {
        type : String,
        enum : ['chef' , 'waiter' , 'manager'],
        required : true
    },
    mobile : {
        type : Number,
        require : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    address : {
        type : String
    },
    salary : {
        type : Number,
        required : true,  
    }
})

// person Model
const Person = mongoose.model('Person', personSchema);

export default Person;