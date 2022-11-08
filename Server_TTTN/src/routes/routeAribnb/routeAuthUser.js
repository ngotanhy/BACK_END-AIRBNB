const { singIn, register } = require("../../controllers/controllersAribnb/userController");

const routeAuthUser = require("express").Router();

routeAuthUser.post("/singup", register);
routeAuthUser.post("/singin", singIn);

module.exports = routeAuthUser;