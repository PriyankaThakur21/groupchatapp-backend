const Chats = require('../models/chat');
const User = require('../models/users');
const AWS = require('aws-sdk');
require('dotenv').config()

exports.postmsg = async(req, res, next)=>{
    try{
    const {message} = req.body;
    const id = req.params.groupid;
    const data = req.user.createChat({message: message, groupId: id, name: req.user.name});
    res.status(201).json({'success': true});
    }
    catch(err){
        res.status(401).json({'error': err});
    }
}

exports.getmsg = async(req, res, next)=>{
    try{
        const group = req.params.groupid;
        const msg = await Chats.findAll({where:{groupId: group}});
        res.status(200).json({'chat': msg, 'id': req.user.id});
    }
    catch(err){
        res.json({'error': err});
    }
}

exports.uploadfile = async (req, res, next)=>{
    try{
    const file = req.body.file;
    const groupid = req.params.groupid;
    const filename = `Files/${new Date()}.jpg`;
    const fileUrl = await uploadToS3(file, filename);
    await req.user.createChat({message: fileUrl, groupId: groupid, link: true, name: req.user.name});
    res.status(201).json('Successfuly send');
    } 
    catch(err){
        console.log(err);
        res.status(400).json('something went wrongg', err);
    }
}

async function uploadToS3(data, filename){
    const bucketName = process.env.BUCKET_NAME;
    const IAMuserkey = process.env.IAM_USER_KEY;
    const IAMusersecret = process.env.IAM_USER_SECRET;

    let s3bucket = new AWS.S3({
        accessKeyId : IAMuserkey,
        secretAccessKey: IAMusersecret
    })
        var params= {
            Bucket: bucketName,
            Key: filename,
            Body: data,
            ACL: 'public-read'
        }
        return new Promise((resolve, reject)=>{
            s3bucket.upload(params, (err,s3response)=>{
            if(err){
                console.log('something went wrong', err);
            }
            else{
                console.log('success', s3response);
                resolve(s3response.Location);
                
            }
        })})
    }