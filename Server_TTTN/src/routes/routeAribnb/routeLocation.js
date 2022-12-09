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

routeLocations.post("/",verifyToken, upload.single("image"), createLocation);
routeLocations.put("/update/:id",verifyToken, upload.single("image"), updateLocation)
routeLocations.delete("/deleteLocation/:id", verifyToken, deleteLocation)

routeLocations.get('/getAllLocation', getAllLocation);
routeLocations.get("/getLocationById/:id", getLocationById)
routeLocations.post("/paginationLocation", getPaginationLocation)

module.exports = { routeLocations };