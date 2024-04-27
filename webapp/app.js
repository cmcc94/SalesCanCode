//Basic Framework from: https://snippets.cacher.io/snippet/79619822b802882f9dbf
const express = require("express");
const app = express();

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

//The error Route has to be at the end or all websites will result in an error
app.get("*", function(req, res){
    res.send("Error 404. This Route does not exist");
});
//End Routes

//Start server
app.listen(3000, function(){
    console.log("NodeJS Web Application is now running on port 3000");
});
//End server