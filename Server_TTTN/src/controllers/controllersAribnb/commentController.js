let { PrismaClient } = require('@prisma/client');
const { errorCode, failCode, successCode } = require('../../ultis/reponse');
const prisma = new PrismaClient();


const createComment = async (req, res, next) => {
    try {
        let { customer_id, room_id, datacomment, rate } = req.body;
        let data = await prisma.comments.create({
            data: {
                customer_id: Number(customer_id),
                room_id: Number(room_id),
                datacomment,
                rate: Number(rate)
            }
        });
        if (data) {
            successCode(res, data, "successfully")
        } else {
            failCode(res, 'false', "cannot create comment")
        }
    } catch (err) {
        errorCode(res, "failure")
    }
}

const getAllCommentByIdRoom = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.comments.findFirst({ where: { room_id: Number(id) } });
        if (data) {
            successCode(res, data, "find comment successfully")
        } else {
            failCode(res, 'false', "cannot find comment")
        }
    } catch (err) {
        errorCode(res, "failure")
    }
}

const getAllCommentByIdUser = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.comments.findFirst({ where: { customer_id: Number(id) } });
        if (data) {
            successCode(res, data, "find comment successfully")
        } else {
            failCode(res, 'false', "cannot find comment")
        }
    } catch (err) {
        errorCode(res, "failure")
    }
}

const updateCommentById = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { datacomment, rate } = req.body;
        let findComment = await prisma.comments.findFirst({ where: { id: Number(id) } });
        if (findComment) {
            let data = {
                datacomment: datacomment ? datacomment : findComment.datacomment,
                rate: rate ? Number(rate) : findComment.rate
            }
            let update = await prisma.comments.update({
                where: { id: Number(id) },
                data
            })
            if (update) {
                successCode(res, update, "update successfully")
            } else {
                failCode(res, 'false', "cannot update")
            }
        } else {
            failCode(res, 'false', "cannot update")
        }
    } catch (err) {
        errorCode(res, "failure")
    }
}

const deleteComment = async (req, res, next) => {
    try {   
        let { id } = req.params;
        let findComment = await prisma.comments.findFirst({ where: { id: Number(id) } });
        if (findComment) {
            let data = await prisma.comments.delete({
                where: {
                    id: Number(id)
                }
            })
            if (data) {
                successCode(res, 'true', "delete successfully")
            }
        }
        else {
            failCode(res, 'false', "comment invalid")
        }
    } catch (err) {
        errorCode(res, "failure")
    }
}



module.exports = {
    createComment,
    getAllCommentByIdRoom,
    getAllCommentByIdUser,
    updateCommentById,
    deleteComment,
}