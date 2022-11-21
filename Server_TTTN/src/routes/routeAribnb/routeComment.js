const {
    createComment,
    getAllCommentByIdRoom,
    getAllCommentByIdUser,
    updateCommentById,
    deleteComment,

} = require("../../controllers/controllersAriBnb/commentController");

const routeComment = require("express").Router();

routeComment.post("/", createComment)
routeComment.get("/getCommentRoom/:id", getAllCommentByIdRoom)
routeComment.get("/getCommentUser/:id", getAllCommentByIdUser)
routeComment.put("/updateCommentById/:id", updateCommentById)
routeComment.delete("/deleteCommentById/:id", deleteComment)


module.exports = routeComment