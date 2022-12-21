const {
    register,
    singIn,
    // resetPassword
} = require("../../controllers/auth.js/userAuth");

const routeAuthUser = require("express").Router();

routeAuthUser.post("/singup", register);
routeAuthUser.post("/singin", singIn);
// routeAuthUser.post("/reset",resetPassword)

module.exports = {routeAuthUser};