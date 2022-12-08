const { getTypeRoomByName, getAllTypes } = require("../../controllers/controllersAriBnb/typeRoomController");
const { verifyToken } = require("../../middleWares/auth");

const routeTypeRoom = require("express").Router();

routeTypeRoom.get("/getTypeRoom/:type",verifyToken, getTypeRoomByName);
routeTypeRoom.get("/",verifyToken,getAllTypes)

module.exports = { routeTypeRoom }