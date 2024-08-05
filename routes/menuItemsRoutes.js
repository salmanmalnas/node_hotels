import express from "express";
const router = express.Router();

import MenuItems from "../models/MenuItems.js";


// Menu GET, POST 

router.post('/', async (req, res)=>{
    try{
        const response = req.body
        const newMenu = new MenuItems(response)

        const savedMenu = await newMenu.save()
        console.log('Menu data saved');
        res.status(200).json(savedMenu);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal server error'});
    }
});

router.get('/', async (req, res) =>{
    try{
        const menudata = await MenuItems.find();
        console.log('Menu data fetched');
        res.status(200).json(menudata);
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server error'});
    }
});

//parameterised API for menu
router.get('/:taste', async (req, res) =>{
    try{
        const tasteType = req.params.taste;

        if (tasteType=='sweet' || tasteType=='sour' || tasteType=='spicy'){
            const response = await MenuItems.find({ taste : tasteType });
            console.log('response fetched');
            res.status(200).json(response);
        }else{
            res.status(400).json({error : 'Invalid tasteType'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error : 'Internal Server error'});
    }
});

// Delete the data
router.delete('/:price', async (req, res) =>{
    try{
        const priceCost = req.params.price; //extract the price from url parameter
        const response = await MenuItems.findOneAndDelete({price : priceCost}); // assuming you have MenuItems model

        if (!response){
            return res.status(400).json({error: 'Menu Items data not found'});
        }

        console.log('Data deleted successfully..');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}) 

export default router;