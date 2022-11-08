const { uploadImage, getAllRoom } = require("../../controllers/controllersAribnb/roomController");
const upload = require("../../middleWares/UploadImage");

const routeRoom = require("express").Router();

routeRoom.get('/rooms',getAllRoom)
routeRoom.post('/upload_mage/:id', upload.single("image"), uploadImage)


module.exports = routeRoom;