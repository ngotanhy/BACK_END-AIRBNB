const { 
    getTypeRoomByName, 
    getAllTypes, 
    createType,
    deleteType,
    updateType
} = require("../../controllers/controllersAriBnb/typeRoomController");
const { verifyToken } = require("../../middleWares/auth");
const routeTypeRoom = require("express").Router();

routeTypeRoom.post("/",verifyToken,createType)
routeTypeRoom.delete('/delete_type/:id',verifyToken,deleteType);
routeTypeRoom.put("/update_type/:id",verifyToken,updateType);

routeTypeRoom.get("/getTypeRoom/:type", getTypeRoomByName);
routeTypeRoom.get("/",getAllTypes);


module.exports = { routeTypeRoom }