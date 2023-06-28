const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const sequelize = require('./database');

const UserRouter = require('./routers/users');
const ChatRouter = require('./routers/chat');
const GroupRouter = require('./routers/groups');
const AdminRouter = require('./routers/admin');

const Users = require('./models/users');
const Chats = require('./models/chat');
const Groups = require('./models/groups');
const Usergroup = require('./models/usergroup');

app.use(express.json());
app.use(UserRouter);
app.use(ChatRouter);
app.use(GroupRouter);
app.use(AdminRouter);

Users.hasMany(Chats);
Chats.belongsTo(Users);

Groups.hasMany(Chats);
Chats.belongsTo(Groups);

Groups.belongsToMany(Users, {through: Usergroup});
Users.belongsToMany(Groups, {through: Usergroup});

sequelize.sync()
.then((res)=>{
    app.listen(3000);
})
.catch((err)=>{
    console.log(err);
})