const {
    createLocation,
    getAllLocation,
    deleteLocation,
    getLocationById
} = require("../../controllers/controllersAriBnb/locationController");
const upload = require("../../middleWares/UploadImage");

const routeLocations = require("express").Router();

routeLocations.post("/", upload.single("image"), createLocation);
routeLocations.get('/getAllLocation', getAllLocation);
routeLocations.delete("/deleteLocation/:id", deleteLocation)
routeLocations.get("/getLocationById/:id", getLocationById)

module.exports = routeLocations;