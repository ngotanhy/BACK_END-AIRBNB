const {
    register,
    singIn
} = require("../../controllers/auth.js/userAuth");

const routeAuthUser = require("express").Router();

routeAuthUser.post("/singup", register);
routeAuthUser.post("/singin", singIn);

module.exports = {routeAuthUser};