const {
    uploadImage,
    getAllRoom,
    createRoom,
    getRoomById
} = require("../../controllers/controllersAriBnb/roomController");
const upload = require("../../middleWares/UploadImage");

const routeRoom = require("express").Router();

routeRoom.post('/', createRoom)
routeRoom.get('/getAllRoom', getAllRoom)
routeRoom.post('/upload_Image', upload.single("image"), uploadImage)
routeRoom.get('/getRoomById/:id', getRoomById)


module.exports = routeRoom;