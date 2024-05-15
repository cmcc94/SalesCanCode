//Basic Framework from: https://snippets.cacher.io/snippet/79619822b802882f9dbf
const express = require("express");
const request = require("request");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

//use config file function
dotenv.config();

//When strict option is set to true , Mongoose will ensure that only the fields that are specified in your Schema will be saved in the database, and all other fields will not be saved
mongoose.set('strictQuery', false);

//Give the abillity to set a custom PORT if needed
const PORT = process.env.PORT || 3000;

//Set up connection to the database from env file
const CONNECTION = process.env.CONNECTION;

//Tell the app to look for external content within public
app.use(express.static("public"));

//Set ejs as standard no doc type has to be set when rendering ejs files
app.set("view engine","ejs");

//Accept data in json format
app.use(express.json());

//Decode data sent through the html form
app.use(express.urlencoded());

//Set MongoDB Collection
var wysSchema = new mongoose.Schema({
    email: String,
    password: String,
});

var form = mongoose.model("form", wysSchema);

/*
//Create a document within the database
form.create({
    title: "test",
    creator: "me",
    height: 300
});
*/

/*
//Async function to print all the data in the mongo db database
async function testsearch(){
    const test = await form.find({});
    console.log(test);
}
testsearch();
*/


//Routes
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


app.post("/login/add", function(req, res){
    console.log(req.body);
    console.log(req.body.email);

    form.create({
        email: req.body.email,
        password: req.body.password
    });

    res.render("./main")
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
//Routes

//Connect to MongoDB
const start = async() => {
    try{
        await mongoose.connect(CONNECTION);
        //Listen on given Port
        app.listen(PORT, function(){
            console.log("App listening on port " + PORT);
        });
    } catch (error) {
        console.log(error.message);
    }
};

//Start the server
start();
//End server