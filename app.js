const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const sequelize = require('./database');

const UserRouter = require('./routers/users');
const ChatRouter = require('./routers/chat');
const GroupRouter = require('./routers/groups');

const Users = require('./models/users');
const Chats = require('./models/chat');
const Groups = require('./models/groups');

app.use(express.json());
app.use(UserRouter);
app.use(ChatRouter);
app.use(GroupRouter);

Users.hasMany(Chats);
Chats.belongsTo(Users);

Users.hasMany(Groups);
Groups.belongsTo(Users);

sequelize.sync()
.then((res)=>{
    app.listen(3000);
})
.catch((err)=>{
    console.log(err);
})