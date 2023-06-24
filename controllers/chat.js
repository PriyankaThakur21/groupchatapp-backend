const Chats = require('../models/chat');

exports.postmsg = async(req, res, next)=>{
    try{
    const {message} = req.body;
    const data = await Chats.create({message, userId: req.user.id});
    res.status(201).json({'success': true});
    }
    catch(err){
        res.status(401).json({'error': err});
    }
}

exports.getmsg = async(req, res, next)=>{
    try{
        const msg = await Chats.findAll();
        const id = req.user.id;
        res.status(200).json({'chat': msg, 'id': id});
    }
    catch(err){
        res.json({'error': err});
    }
}