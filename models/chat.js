const Sequelize = require('sequelize');
const sequelize = require('../database');

const Chats = sequelize.define('chats',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    message: Sequelize.STRING
})

module.exports = Chats;