const Sequelize = require('sequelize');
const sequelize = require('../database');

const Chats = sequelize.define('chats',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: Sequelize.STRING,
    message: Sequelize.STRING,
    link: {
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
})

module.exports = Chats;