const User = require('../models/users');
const Group = require('../models/groups');
const Usergroup = require('../models/usergroup');
const { Op } = require('sequelize');

exports.addmember = async(req, res, next)=>{
    try{
    const groupid = req.params.groupid;
    const email = req.body.userEmail;

    const Admin = await Usergroup.findOne({where: {[Op.and]: [{userId: req.user.id}, {admin: true}, {groupId: groupid}]}});
    if(!Admin){
        return res.json({message: 'Only admin can make changes'});
    }

    const usertobeadded = await User.findOne({where: {email: email}});
    if(!usertobeadded){
        return res.json({message: 'User not register'});
    }
    const group = await Group.findByPk(groupid);
        await group.addUser(usertobeadded);
        res.status(200).json({message: 'Successfuly added'});
}
catch(err){
    console.log(err);
    res.status(500).json('Something went wrong');
}
}

exports.deleteMember = async(req, res, next)=>{
    try{
        const groupid = req.params.groupid;
        const userid = req.params.userid;

        const Admin = await Usergroup.findOne({where: {[Op.and]: [{userId: req.user.id}, {admin: true}, {groupId: groupid}]}});
        if(!Admin){
        return res.json({message: 'Only admin can make changes'});
    }

        const usertobedeleted = await User.findOne({where: {id: userid}});
        const group = await Group.findByPk(groupid);
        await group.removeUser(usertobedeleted);
        res.status(200).json({message: 'Successfuly deleted'});
    }
    catch(err){
        console.log(err);
        res.status(401).json('Something went wrong');
    }
}

exports.makeadmin = async(req, res, next)=>{
    try{
    const groupid = req.params.groupid;
    const userid = req.params.userid;

    const Admin = await Usergroup.findOne({where: {[Op.and]: [{userId: req.user.id}, {admin: true}, {groupId: groupid}]}});
    if(!Admin){
        return res.json({message: 'Only admin can make changes'});
    }

    await Usergroup.update({ admin: true },{where: {[Op.and]: [{userId: userid}, {groupId: groupid}]}})
    res.status(200).json({message: 'Successfuly created'});
    }
    catch(err){
        console.log(err);
        res.status(402).json('Something went wrong');
    }
}