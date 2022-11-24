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


routeBookingRoom.post("/", createBooking);
routeBookingRoom.put("/update/:id",updateBooking);
routeBookingRoom.get("/getBooking", getAllBooking);
routeBookingRoom.get("/getBooking/:id", getBookingById);
routeBookingRoom.delete("/:id", deleteBooking);
routeBookingRoom.get("/getByIdUser/:id", getByIdUser);


module.exports = routeBookingRoom;