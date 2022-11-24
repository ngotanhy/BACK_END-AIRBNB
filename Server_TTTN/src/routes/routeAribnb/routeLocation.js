const {
    createLocation,
    getAllLocation,
    deleteLocation,
    getLocationById,
    getPaginationLocation,
    updateLocation
} = require("../../controllers/controllersAriBnb/locationController");
const { verifyToken } = require("../../middleWares/auth");
const upload = require("../../middleWares/UploadImage");

const routeLocations = require("express").Router();

routeLocations.post("/", upload.single("image"), createLocation);
routeLocations.put("/update/:id", upload.single("image"), updateLocation)
routeLocations.get('/getAllLocation', verifyToken, getAllLocation);
routeLocations.delete("/deleteLocation/:id", verifyToken, deleteLocation)
routeLocations.get("/getLocationById/:id", verifyToken, getLocationById)
routeLocations.post("/paginationLocation", getPaginationLocation)

module.exports = { routeLocations };