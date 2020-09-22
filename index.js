const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ 
    extended: true
}));

const port=process.env.PORT ||4000;

const TaskModel = require('./schemas/TaskSchema');

var secret = 'abcdefghujklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789!@#$%^&*()_+';
module.exports = secret;


app.use(express.static('public'))

app.use(cookies());

const url = "mongodb+srv://nimer:N1N1N1N1@cluster0.tejcy.mongodb.net/server";

const mongoose = require('mongoose');
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});



const userRouter = require('./routing/user');
app.use("/api/users", userRouter);

const adminRouter = require('./routing/admin');
app.use("/api/admin", adminRouter);



app.listen(port, () => {
    console.log("App is Listening to port:",port)
})


