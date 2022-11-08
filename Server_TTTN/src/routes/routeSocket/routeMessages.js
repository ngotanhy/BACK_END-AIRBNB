const { addMessage, getMessages } = require("../../controllers/controllerSocket/messageController");
const routerMess = require("express").Router();

routerMess.post("/addmsg", addMessage);
routerMess.post("/getmsg", getMessages);

module.exports = routerMess;
