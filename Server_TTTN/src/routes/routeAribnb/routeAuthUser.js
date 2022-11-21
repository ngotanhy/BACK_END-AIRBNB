const {
    register,
    singIn
} = require("../../controllers/auth.js/userAuth");
const { verifyToken } = require("../../middleWares/jwt");

const routeAuthUser = require("express").Router();

routeAuthUser.post("/singup", register);
routeAuthUser.post("/singin", verifyToken, singIn);

module.exports = routeAuthUser;