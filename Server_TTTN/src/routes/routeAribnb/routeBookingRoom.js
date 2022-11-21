const {
    getBookingById,
    updateBookingId,
    deleteBooking,
    getByIdUser,
    createBooking,
    getAllBooking
} = require("../../controllers/controllersAriBnb/bookingRoomController");

const routeBookingRoom = require("express").Router();

routeBookingRoom.post("/", createBooking)
routeBookingRoom.get("/getBooking", getAllBooking)
routeBookingRoom.get("/getBooking/:id", getBookingById)
routeBookingRoom.put("/updateBooking/:id", updateBookingId)
routeBookingRoom.delete("/:id", deleteBooking)
routeBookingRoom.get("/getBooking/:id", getByIdUser);


module.exports = routeBookingRoom;