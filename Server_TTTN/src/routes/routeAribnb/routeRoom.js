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

routeRoom.post('/', createRoom)
routeRoom.post('/upload_Image/:id', upload.array("image", 5), uploadImage)
routeRoom.post('/pagination/', paginationRoom)

routeRoom.put('/update_room/:id', updateRoom)

routeRoom.get('/getAllRoom', getAllRoom)
routeRoom.get('/getRoomById/:id', getRoomById)
routeRoom.get('/getRoomBynName/:name',getRoomByName)
routeRoom.get('/getRoom/locationRoom/:id', getRoomLocation)


module.exports = { routeRoom };