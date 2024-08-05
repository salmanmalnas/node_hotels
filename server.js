import express from "express";
const app= express();
import db from "./db.js";

import personRouters from "./routes/personRoutes.js";
import menuItemsRouters from "./routes/menuItemsRoutes.js";
import bodyParser from "body-parser";
app.use(bodyParser.json());


app.get('/', function(req, res) {
    res.send ('<h2>Welcome to our hotel...</h2>');
});
// Use the Router
app.use('/person', personRouters);
app.use('/menu', menuItemsRouters);

app.listen(3005, ()=>{
    console.log("Server is running on PORT No. 3005");
}); 