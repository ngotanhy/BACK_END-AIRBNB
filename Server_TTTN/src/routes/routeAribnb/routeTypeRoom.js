const { 
    getTypeRoomByName, 
    getAllTypes 
} = require("../../controllers/controllersAriBnb/typeRoomController");
const routeTypeRoom = require("express").Router();

routeTypeRoom.get("/getTypeRoom/:type", getTypeRoomByName);
routeTypeRoom.get("/",getAllTypes)

module.exports = { routeTypeRoom }