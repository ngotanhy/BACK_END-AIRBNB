const {
    getAllUsers,
    getAllUserRoleUser,
    getUsersById,
    getUserAdmin,
    getUsersByName,
    deleteUser,
    getPaginationUsers,
} = require("../../controllers/controllersAriBnb/userController");

const routeUser = require("express").Router();

routeUser.get("/", getAllUsers);
routeUser.get("/:id", getUsersById);
routeUser.get("/getUserByName/:name", getUsersByName);
routeUser.delete("/deleteUser/:id", deleteUser);
routeUser.post("/paginationUsers", getPaginationUsers);
routeUser.post("/role_admin", getUserAdmin);
routeUser.post("/role", getAllUserRoleUser);

module.exports = { routeUser };