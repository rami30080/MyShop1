const express = require('express')
const app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.use(express.static('public'));

const mongoose = require('mongoose');
const e = require('express');

const port=process.env.PORT ||4000;

const url = "mongodb+srv://rami30080:mxzmxz123@cluster0.halwb.mongodb.net/tasks";


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const users = mongoose.model('users',{
    email:String,
    password:String,
    fname:String,
    lname:String,
    img:String,
    role:String
  });
  
  //users.insertMany({email:"rami@hotmail.com",password:"123",name:"Rami",img:"pic",role:"master"})

app.post('/api/login', (req, res) => {
    const { email, password } = req.body
    console.log(email)
    users.find({ email: email }).then(doc => {
        if (doc.length > 0) {
            users.find({ email: email, password: password }).then(docs => {
                if (docs.length > 0) {
                    
                    res.send({ success: true, error: null, info: { role: docs[0].role } })
                }
                else {
                    res.send({ success: false, error: "Password Doesnt match Email", info: null })
                }
            })
        }
        else{
        res.send({ success: false, error: "Email not found", info: null })
    }
    })
            
})

app.post('/api/SignUp', (req, res) => {
    const { email, password,fname,lname,role} = req.body
    console.log(email)
    users.find({ email: email }).then(doc => {
        if (doc.length > 0) {
            res.send({ success: false, error: "Email Already In Use", info: null })
        }
        else{
        users.insertMany({email:email,
            password:password,
            fname:fname,
            lname:lname,
            img:null,
            role:role}).then(docs=>{
                if(docs.length>0){
                    res.send({ success: true, error: null, info: null })
                }
            })
    }
    })
            
})


app.listen(port, () => {
    console.log("App is Listening to port:",port)
})
