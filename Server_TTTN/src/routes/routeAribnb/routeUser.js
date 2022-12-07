const {
    getAllUsers,
    getAllUserRoleUser,
    getUsersById,
    getUserAdmin,
    getUsersByName,
    deleteUser,
    getPaginationUsers,
    uploadAvatar,
} = require("../../controllers/controllersAriBnb/userController");
const upload = require("../../middleWares/UploadImage");
const routeUser = require("express").Router();

routeUser.get("/", getAllUsers);
routeUser.get("/:id", getUsersById);
routeUser.get("/getUserByName/:name", getUsersByName);
routeUser.delete("/deleteUser/:id", deleteUser);
routeUser.post("/paginationUsers", getPaginationUsers);
routeUser.post("/role_admin", getUserAdmin);
routeUser.post("/role", getAllUserRoleUser);
routeUser.post("/upload/:id", upload.single('image'), uploadAvatar)

module.exports = { routeUser };