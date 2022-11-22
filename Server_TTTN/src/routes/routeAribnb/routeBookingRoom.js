const {
    getByIdUser,
    deleteBooking,
    updateBookingId,
    getBookingById,
    getAllBooking,
    createBooking
} = require("../../controllers/controllersAriBnb/bookingRoomController");

const routeBookingRoom = require("express").Router();
const { verifyToken } = require("../../middleWares/auth");


routeBookingRoom.post("/", createBooking)
routeBookingRoom.get("/getBooking", getAllBooking)
routeBookingRoom.get("/getBooking/:id", getBookingById)
routeBookingRoom.put("/updateBooking/:id", updateBookingId)
routeBookingRoom.delete("/:id", deleteBooking)
routeBookingRoom.get("/getBooking/:id", getByIdUser);


module.exports = routeBookingRoom;