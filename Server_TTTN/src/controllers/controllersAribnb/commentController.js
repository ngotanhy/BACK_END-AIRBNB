let { PrismaClient } = require('@prisma/client');
const { errorCode, failCode, successCode } = require('../../ultis/reponse');
const prisma = new PrismaClient();


const createComment = async (req, res, next) => {
    try {
        let { customer_id, room_id, datacomment, rate } = req.body;
        let data = await prisma.comments.create({
            data: { customer_id, room_id, datacomment, rate }
        });
        if (data) {
            successCode(res, data, "successfully")
        } else {
            failCode(res, data, "cannot create comment")
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
            failure(res, data, "cannot find comment")
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
            failure(res, data, "cannot find comment")
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
            let update = await prisma.comments.update({
                where: { id: Number(id) },
                data: {
                    datacomment,
                    rate
                }
            })
            if (update) {
                successCode(res, data, "update successfully")
            } else {
                failCode(res, data, "cannot update")
            }
        } else {
            failCode(res, data, "cannot update")
        }
    } catch (err) {
        errorCode(res, "failure")
    }
}

const deleteComment = async (req, res, next) => {
    try {
        let { id } = req.body;
        let data = await prisma.comments.delete({
            where: {
                id: Number(id)
            }
        })
        if (data) {
            successCode(res, data, "delete successfully")
        } else {
            failure(res, data, "cannot find comment")
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