const {
    getByIdUser,
    deleteBooking,
    getBookingById,
    getAllBooking,
    createBooking,
    updateBooking
} = require("../../controllers/controllersAriBnb/bookingRoomController");

const routeBookingRoom = require("express").Router();
const { verifyToken } = require("../../middleWares/auth");


routeBookingRoom.post("/",verifyToken, createBooking);
routeBookingRoom.put("/update/:id",verifyToken,updateBooking);
routeBookingRoom.get("/getBooking",verifyToken, getAllBooking);
routeBookingRoom.get("/getBooking/:id",verifyToken, getBookingById);
routeBookingRoom.delete("/:id",verifyToken, deleteBooking);
routeBookingRoom.get("/getByIdUser/:id",verifyToken, getByIdUser);


module.exports = {routeBookingRoom};