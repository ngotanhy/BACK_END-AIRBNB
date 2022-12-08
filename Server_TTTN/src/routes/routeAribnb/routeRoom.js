const {
    uploadImage,
    getAllRoom,
    createRoom,
    getRoomById,
    paginationRoom,
    getRoomLocation,
    updateRoom,
    getRoomByName
} = require("../../controllers/controllersAriBnb/roomController");
const { verifyToken } = require("../../middleWares/auth");
const upload = require("../../middleWares/UploadImage");

const routeRoom = require("express").Router();

routeRoom.post('/',verifyToken, createRoom)
routeRoom.post('/upload_Image/:id',verifyToken, upload.array("image", 5), uploadImage)
routeRoom.post('/pagination/',verifyToken, paginationRoom)

routeRoom.put('/update_room/:id', updateRoom)

routeRoom.get('/getAllRoom',verifyToken, getAllRoom)
routeRoom.get('/getRoomById/:id',verifyToken, getRoomById)
routeRoom.get('/getRoomBynName/:name',verifyToken,getRoomByName)
routeRoom.get('/getRoom/locationRoom/:id',verifyToken, getRoomLocation)


module.exports = { routeRoom };