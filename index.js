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

var nodemailer = require('nodemailer')
var validator = require("email-validator");

const port=process.env.PORT ||4000;

const url = "mongodb+srv://rami30080:mxzmxz123@cluster0.halwb.mongodb.net/tasks";


mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'servicetest468@gmail.com',
        pass: 'mxzmxz123'
    }
});

const users = mongoose.model('users',{
    email:String,
    password:String,
    fname:String,
    lname:String,
    img:String,
    role:String,
    groupID:String
  });

const Key = mongoose.model('key',{
    email:String,
    keyTime:Date,
    key:String
})
const Tasks = mongoose.model('tasks',{
    user:{fname:String,lname:String,email:String,userID:String,groupID:String,role:String},
    task:{topic:String,desc:String,level:Number}
  });

  
  //tasks.insertMany({user:{fname:"Rami",lname:"Ayoub",userID:"31",groupID:"2",role:"User"},task:{topic:"Bede akol",desc:"kosa w waraq",level:2}})

app.post('/api/login', (req, res) => {
    const { email, password } = req.body
    if (validator.validate(email)) {
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
} else {
    res.send({ success: false, error: "Email is not Valid", info: null })
}
            
})

app.post('/api/SignUp', async(req, res) => {
    const { email, password,fname,lname,role} = req.body

     
    if (validator.validate(email)) {
    users.find({ email: email }).then( doc => {
        if (doc.length > 0) {
            res.send({ success: false, error: "Email Already In Use", info: null })
        }
        else{

// -------------------------------------------------------
            var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
// -------------------------------------------------------

        users.insertMany({email:email,
            password:password,
            fname:fname,
            lname:lname,
            img:null,
            role:role,
            groupID:result}).then(docs=>{
                if(docs.length>0){
                    res.send({ success: true, error: null, info: null })
                }
            })
    }
    })
} else {
    res.send({ success: false, error: "Email is not Valid", info: null })
}         
})

function makeGroupId(length)
{
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    users.find({groupID:result}).then(doc=>{
        if(doc.length>0)
        {
            return makeGroupId(8);
        }else{
            return result;
        }
    })
    

}

app.post('/api/forgetPassword', (req, res) => {
    const { email } = req.body;
    if (validator.validate(email)) {
        users.find({ email: email }).then(checkEmail => {
            if (checkEmail.length > 0) {
                const key = makeid(10)

                var mailOptions = {
                    from: 'servicetest468@gmail.com',
                    to: email,
                    subject: 'Reset Password',
                    text: `You requested to reset your password. 
Please copy the code below to continue the password reset process:  
                    
${key}`
                };

                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        return (res.send({ success: false, error: err, info: null }))
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                Key.insertMany(
                    {
                        email: email,
                        keyTime: Date.now(),
                        key: key
                    }
                )
                return (res.send({ success: true, error: null, info: { key: key } }))

            } else {
                res.send({ success: false, error: "Email not found", info: null })
            }
        })
    } else {
        res.send({ success: false, error: "Email not valid", info: null })
    }
})

app.post('/api/checkSendedPassword', (req, res) => {
    const { email, key } = req.body;
    Key.find({ email: email, key: key }).then(docs => {
        if(docs.length>0)
        {
        docs.map((item, index) => {
            if (item.email == email) {
                if (item.key == key) {
                    if ((Date.now() - item.keyTime) <= 1800000) {
                        return (res.send({ success: true, error: null, info: null }))
                    } else {
                        return (res.send({ success: false, error: 'time expired', info: null }))
                    }
                } else {
                    return (res.send({ success: false, error: 'key is incorrect', info: null }))
                }
            } 
        })
    }else{
        return (res.send({ success: false, error: 'key is incorrect', info: null }))

    }
    })

})

app.put('/api/updatePassword', (req, res) => {
    const { email, password } = req.body;
    const passwqord = req.body.password;
    let regex = /[^A-Za-z0-9]/;
    let containSepcChars = regex.test(password);
    if (!containSepcChars) {
    users.findOne({ email: email }).then(async docs => {
        if (docs) {
            // const salt = await bcrypt.genSalt(saltRounds)
            // const hashpassword = await bcrypt.hash(password, salt)
            // docs.userInfo.password = hashpassword
            docs.password=password;
            await docs.save();
            return (res.send({ success: true, error: null, info: null }))

        } else {
            return (res.send({ success: false, error: "email not valid", info: null }))
        }

        users.findOne({ email: email }).then(async docs => {
            if (docs) {
                // const name = docs.userInfo.employeeName
                // const role = docs.userInfo.employeeRole
                // const id = docs._id
                // const salt = await bcrypt.genSalt(saltRounds)
                // const hashpassword = await bcrypt.hash(password, salt)
                // docs.userInfo.password = hashpassword
                docs.password=password;
                await docs.save();
                return (res.send({ success: true, error: null, info: null }))
                // UserModel.updateOne({ _id: id }, { $set: { userInfo: { employeeName: name, employeeEmail: email, employeeRole: role, password: password } } }).then(doc => {
                //     if (doc.n > 0) {
                //         res.send({ success: true, error: null, info: null })
                //     } else {
                //         res.send({ success: false, error: null, info: null })
                //     }
                // })
            } else {
                return (res.send({ success: false, error: "email not valid", info: null }))
            }

        })
    })
}
else {
        res.send({ success: false, error: "No Special Characters or White Space allowed in User Password!", info: null })
    }

})

app.get('/api/getTasks', (req, res) => {
    const { groupID} = req.body;
    Tasks.find({ user:{groupID:groupID} }).then(docs => {
        let tasks=[];
        docs.map((element,index),()=>{
            tasks.push({user:{fname:String,role:String},
                task:{topic:String,desc:String,level:Number}});
        })
        
        res.send({ success: true, error: null, info: tasks })
        

    })

})

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;

    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}



app.listen(port, () => {
    console.log("App is Listening to port:",port)
})
