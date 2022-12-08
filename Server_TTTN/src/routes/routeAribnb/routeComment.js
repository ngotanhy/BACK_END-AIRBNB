
const {
    createComment,
    getAllCommentByIdRoom,
    getAllCommentByIdUser,
    updateCommentById,
    deleteComment
} = require("../../controllers/controllersAriBnb/commentController");

const { verifyToken } = require("../../middleWares/auth");

const routeComment = require("express").Router();

routeComment.post("/",verifyToken, createComment)
routeComment.get("/getCommentRoom/:id",verifyToken, getAllCommentByIdRoom)
routeComment.get("/getCommentUser/:id",verifyToken, getAllCommentByIdUser)
routeComment.put("/updateComment/:id",verifyToken, updateCommentById)
routeComment.delete("/deleteComment/:id",verifyToken, deleteComment)


module.exports = {
    routeComment
}