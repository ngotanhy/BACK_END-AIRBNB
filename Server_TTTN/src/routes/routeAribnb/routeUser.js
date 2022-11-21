const { 
    getAllUsers, 
    getAllUserRoleUser, 
    getUsersById, 
    getUserAdmin, 
    getUsersByName 
} = require("../../controllers/controllersAriBnb/userController");

const routeUser = require("express").Router();

routeUser.get("/", getAllUsers);
routeUser.get("/role_admin", getUserAdmin);
routeUser.get("/role", getAllUserRoleUser);
routeUser.get("/:id", getUsersById);
routeUser.get("/getUserByName/:name",getUsersByName)

module.exports = routeUser;