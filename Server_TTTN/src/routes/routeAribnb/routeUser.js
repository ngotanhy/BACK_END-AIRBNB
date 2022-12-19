const {
    getAllUsers,
    getAllUserRoleUser,
    getUsersById,
    // getUserAdmin,
    getUsersByName,
    deleteUser,
    getPaginationUsers,
    uploadAvatar,
} = require("../../controllers/controllersAriBnb/userController");
const { verifyToken } = require("../../middleWares/auth");
const upload = require("../../middleWares/UploadImage");
const routeUser = require("express").Router();

routeUser.get("/", verifyToken, getAllUsers);
routeUser.get("/:id", verifyToken, getUsersById);
routeUser.get("/getUserByName/:name", verifyToken, getUsersByName);
routeUser.delete("/deleteUser/:id", verifyToken, deleteUser);
routeUser.post("/paginationUsers", verifyToken, getPaginationUsers);
routeUser.post("/role", verifyToken, getAllUserRoleUser);
routeUser.post("/upload/:id", verifyToken, upload.single('image'), uploadAvatar)
// routeUser.post("/role_admin",verifyToken, getUserAdmin);


module.exports = { routeUser };