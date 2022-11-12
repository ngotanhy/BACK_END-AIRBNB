const {
    getAllBooking,
    getBookingById,
    updateBookingId,
    deleteBooking,
    getByIdUser,
    createBooking
} = require("../../controllers/controllersAribnb/bookingRoomController");

const routeBookingRoom = require("express").Router();

routeBookingRoom.post("/createBooking",createBooking)
routeBookingRoom.get("/getBooking", getAllBooking)
routeBookingRoom.get("/getBooking/:id", getBookingById)
routeBookingRoom.put("/updateBooking/:id", updateBookingId)
routeBookingRoom.delete("/:id", deleteBooking)
routeBookingRoom.get("/getBooking/:id", getByIdUser);


module.exports = routeBookingRoom;