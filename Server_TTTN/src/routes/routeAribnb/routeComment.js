
const {
    createComment,
    getAllCommentByIdRoom,
    getAllCommentByIdUser,
    updateCommentById,
    deleteComment
} = require("../../controllers/controllersAriBnb/commentController");

const { verifyToken } = require("../../middleWares/auth");

const routeComment = require("express").Router();

routeComment.post("/", createComment)
routeComment.get("/getCommentRoom/:id", getAllCommentByIdRoom)
routeComment.get("/getCommentUser/:id", getAllCommentByIdUser)
routeComment.put("/updateComment/:id", updateCommentById)
routeComment.delete("/deleteComment/:id", deleteComment)


module.exports = {
    routeComment
}