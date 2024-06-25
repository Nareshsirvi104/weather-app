const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const weatherData = require("../utils/weatherData")
const port = process.env.PORT || 3000 ; 
require("dotenv").config();

app.get("/", (req, res) => {
    res.send("server started successfully")
});
app.get("/weather", (req, res) => {
    if(!req.query.address){
        return res.send("address is required");
    }
   weatherData(req.query.address, (error, result) => {
    if(error) {
        return res.send(error);
    }
    res.send(result);
   })
});

app.get("*", (req,res) => {
    res.send("This route doesn't exists")
})

app.listen(port, () => {
    console.log("Server Listening on port" + port);

})