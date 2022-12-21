const {
    getByIdUser,
    deleteBooking,
    getBookingById,
    getAllBooking,
    createBooking,
    updateBooking
} = require("../../controllers/controllersAriBnb/bookingRoomController");

const routeBookingRoom = require("express").Router();
const { verifyToken, verifyTokenAdmin } = require("../../middleWares/auth");


routeBookingRoom.post("/",verifyToken, createBooking);
routeBookingRoom.put("/update/:id",verifyToken,updateBooking);
routeBookingRoom.delete("/:id",verifyToken, deleteBooking);
routeBookingRoom.get("/getByIdUser/:id",verifyToken, getByIdUser);
routeBookingRoom.delete('/delete/:id',verifyToken, deleteBooking);


routeBookingRoom.get("/getBooking",verifyTokenAdmin, getAllBooking);
routeBookingRoom.get("/getBooking/:id",verifyTokenAdmin,getBookingById);


module.exports = {routeBookingRoom};