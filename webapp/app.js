//Basic Framework from: https://snippets.cacher.io/snippet/79619822b802882f9dbf
const express = require("express");
const request = require("request");
const mongoose = require("mongoose");
const app = express();

//When strict option is set to true , Mongoose will ensure that only the fields that are specified in your Schema will be saved in the database, and all other fields will not be saved
mongoose.set('strictQuery', false);

//Give the abillity to set a custom PORT if needed
const PORT = process.env.PORT || 3000;

//Tell the app to look for external content within public
app.use(express.static("public"));

//Set ejs as standard no doc type has to be set when rendering ejs files
app.set("view engine","ejs");

//Start Routes
app.get("/main", function(req, res){
    console.log("You have come to the main site");
    res.render("main");

});

app.get("/login", function(req, res){
    console.log("You have come to the login site");
    res.render("login");
});

app.get("/pgprocess", function(req, res){
    console.log("You have entered the pgprocess site");
    res.render("pgprocess");
});


app.get("/pictures", function(req, res){
    console.log("entering picture side");
    request("https://http.cat/status/100", function(error, response, body){
        if(error){
            res.send(error);
        }else{
            res.send(body);
        }
    })

})


//The error Route has to be at the end or all websites will result in an error
app.get("*", function(req, res){
    res.send("Error 404. This Route does not exist");
});
//End Routes

//Connect to MongoDB
const start = async() => {
    try{
        await mongoose.connect("mongodb+srv://developer:01rjOZq2Ba3TbC3Z@cluster0.6iobce9.mongodb.net/");
        //Listen on given Port
        app.listen(PORT, function(){
            console.log("NodeJS Web Application is now running on port 3000");
        });
    } catch (error) {
        console.log(error.message);
    }
};

//Start the server
start();
//End server