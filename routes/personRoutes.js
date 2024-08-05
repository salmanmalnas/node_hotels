import express from "express";
const router = express.Router();

import Person from "../models/Person.js";

// Person GET , POST etc
router.post('/', async (req , res) => {
    try{
        const response = req.body //yaha body-parse(postman), rq.body se lake de raha hai
        
        // create a new person document using mongoose model
        const newPerson = new Person(response); // body(client) ka data yaha new person me save horaha hai
        
        // save the new person to the database
        const savedPerson = await newPerson.save()
        console.log('Person data saved');
        res.status(200).json(savedPerson);
    }catch(err){
        console.log(err);
        res.status(500).json({error :'Internal server error'});

    }
});

// Get method to grt person data
router.get('/', async (req, res) => {
    try{
        const userdata = await Person.find();
        console.log('User data fetched');
        res.status(200).json(userdata);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

//parameterised API for person
router.get('/:work', async (req, res) => {
    try{
        const workType = req.params.work ;
        if(workType== 'chef' || workType == 'manager' || workType=='waiter'){
            const response = await Person.find({work : workType}); //yaha Work person.js se aayenga
            console.log('response fetched');
            res.status(400).json(response);
        }else{
            res.status(400).json({error : 'Invalid URL'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

//Update data By using jobid
router.put('/:jobid', async (req, res) => {
    try{
        const personId = req.params.jobid; //extract the id from url parameter
        const updatedPersonData = req.body; // Update data from the person

        const response = await Person.findOneAndUpdate( { jobid: personId} , updatedPersonData, {
            new: true, //return the updated document
            runValidators: true, //Run mongoose Validations
        });

        if (!response){
            return res.status(400).json({error: 'Person not found'});
        }

        console.log('Data updated successfully..');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
});

// Delete the data
router.delete('/:jobid', async (req, res) =>{
    try{
        const personId = req.params.jobid; //extract the id from url parameter
        const response = await Person.findOneAndDelete({jobid : personId}); // assuming you have person model

        if (!response){
            return res.status(400).json({error: 'Person data not found'});
        }

        console.log('Data deleted successfully..');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}) 

export default router;