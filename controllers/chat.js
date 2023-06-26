const Chats = require('../models/chat');
const User = require('../models/users');

exports.postmsg = async(req, res, next)=>{
    try{
    const {message} = req.body;
    const id = req.params.groupid;
    const data = req.user.createChat({message: message, groupId: id});
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
        console.log(msg)
        const user = await User.findByPk(req.user.id);
        res.status(200).json({'chat': msg, 'id': req.user.id, 'name': user.name});
    }
    catch(err){
        res.json({'error': err});
    }
}