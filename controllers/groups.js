const Group = require('../models/groups');

exports.addGroup = async(req, res, next)=>{
    try{
    const groupname = req.body.group;
    const group = await req.user.createGroup({groupName :groupname}, {through:{admin:true}});
    res.status(200).json({'Success': true});
    }
    catch(err){
        console.log(err)
        res.status(401).json({'error': err});
    }
}

exports.getmygroups = async(req, res, next)=>{
    try{
    const groups = await req.user.getGroups();
    console.log(groups);
    res.status(200).json(groups);
    }
    catch(err){
        res.status(401).json('Something went wrong');
        console.log(err);
    }
}

exports.getgroup = async(req, res, next)=>{
    try{
    const id = req.params.groupid;
    const group = await Group.findByPk(id);
    console.log(group);
    res.json(group);
    }
    catch(err){
        console.log(err);
    }
}