const {
    getAllUsers,
    getAllUserRoleUser,
    getUsersById,
    getUsersByName,
    deleteUser,
    getPaginationUsers,
    uploadAvatar,
    changeRole,
    updateUser,
} = require("../../controllers/controllersAriBnb/userController");
const { verifyToken, verifyTokenAdmin } = require("../../middleWares/auth");
const upload = require("../../middleWares/UploadImage");
const routeUser = require("express").Router();

routeUser.get("/", verifyTokenAdmin, getAllUsers);
routeUser.get("/:id", verifyTokenAdmin, getUsersById);
routeUser.get("/getUserByName/:name", verifyTokenAdmin, getUsersByName);
routeUser.post("/paginationUsers",verifyTokenAdmin , getPaginationUsers);
routeUser.post("/role_user", verifyTokenAdmin, getAllUserRoleUser);
routeUser.post("/role_change/:id",verifyTokenAdmin,changeRole);


routeUser.delete("/deleteUser/:id", verifyToken, deleteUser);
routeUser.post("/upload/:id", verifyToken, upload.single('image'), uploadAvatar);
routeUser.put("/update_user/:id",verifyToken, updateUser);

// routeUser.post("/role_admin",verifyToken, getUserAdmin);


module.exports = { routeUser };