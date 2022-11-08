const { getAllUsers, getAllUserRoleUser, getUsersById, getUserAdmin} = require("../../controllers/controllersAribnb/userController");

const routeUser = require("express").Router();

routeUser.get("/", getAllUsers);
routeUser.get("/role_admin",getUserAdmin);
routeUser.get("/role", getAllUserRoleUser);
routeUser.get("/:id", getUsersById)

module.exports = routeUser;