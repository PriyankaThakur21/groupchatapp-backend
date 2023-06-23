const User = require('../models/users');
const bcrypt = require('bcrypt');

// check weather email is already present or not
async function emailPresent(email){
    try{
        const user = await User.findOne({where: {email: email}});
        if(user===null) return false;
        else return true;
    }
    catch(error){
        console.log(error);
    }
}

function isStringInValid(string){
    if(string==undefined || string.length===0) return true;
    else return false;
}

exports.signupUsers = async (req, res, next)=>{
    try{   
    const {name, email, phone, password} = req.body;
    const emailExists= await emailPresent(email);

    if(emailExists===true){
        return res.status(404).json('Email should be unique');
    }

    if(isStringInValid(name) || isStringInValid(email) || isStringInValid(password) || isStringInValid(phone)){
        return res.status(404).json('Something is Missing');
    }
    
        bcrypt.hash(password, 10, async(err, hash)=>{
        const data = await User.create({name, email, phone, password:hash});
        res.status(201).json('Successfully Registered');
    })
}
    catch(error){
        console.log(error);
    }
}

exports.loginUsers = async(req, res, next)=>{
    try{
    const {email, password} = req.body;

    if(isStringInValid(email) || isStringInValid(password)){
        return res.status(404).json('Something is Missing');
    }

    const emailExists = await emailPresent(email);
    if(emailExists===false){
        return res.status(404).json('User does not exists');
    }

    const user = await User.findOne({where: {email: email}});
    bcrypt.compare(password, user.password, (err, result)=>{
        if(result===false){
            return res.status(401).json('Password is not correct');
        }
        if(result===true){
            res.status(201).json({message:'Successfully logged in'});
        }
    })
    }
    catch(err){
        console.log(err);
    }
}