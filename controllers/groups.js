const Groups = require('../models/groups');

exports.addGroup = async(req, res, next)=>{
    try{
    const groupname = req.body.group;
    console.log(groupname)
    const group = await Groups.create({groupName: groupname, userId: req.user.id});
    res.status(200).json({'Success': true});
    }
    catch(err){
        res.status(401).json({'error': err});
    }
}

exports.getmygroups = async(req, res, next)=>{
    try{
    const groups = await Groups.findAll({where:{userId:req.user.id}});
    console.log(groups);
    res.status(200).json(groups);
    }
    catch(err){
        res.status(401).json('Something went wrong');
        console.log(err);
    }
}