const { errorCode, successCode, failCode } = require('../../ultis/reponse')
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const getTypeRoomByName = async (req, res, next) => {
    try {
        let { type } = req.params;
        let data = await prisma.typeroom.findMany({
            where: {
                typeroom: {
                    contains: type
                }
            },
            include: {
                Room: {
                    select: {
                        id: true,
                        nameRoom: true,
                        description: true,
                        price: true,
                        numberCustomer: true,
                        location_id: true
                    }
                },
            }
        })
        if (data.length) {
            successCode(res, data, "find successfully")
        } else {
            failCode(res, false, "not data")
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

const getAllTypes = async (req, res, next) => {
    try {
        let data = await prisma.typeroom.findMany();
        if (data.length) {
            successCode(res, data, 'find successfully');
            next()
        } else {
            failCode(res, false, 'not data')
        }
    } catch (err) {
        errorCode(res, "failure");
        next(err);
    }
}

const createType = async (req, res, next) => {
    try {
        let { idRoom, typeRoom } = req.body;
        let data = await prisma.typeroom.create({
            data: {
                room_id: Number(idRoom),
                typeroom: typeRoom
            }
        })
        if (data) {
            successCode(res, data, "successfully")
        } else {
            failCode(res, false, "create invalid")
        }
    } catch (err) {
        errorCode(res, "failure");
        next(err);
    }
}

const deleteType = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.typeroom.findFirst({
            where: { id: Number(id) }
        })
        if (data) {
            let deleteType = await prisma.typeroom.deleteMany({
                where: { id: Number(id) }
            })
            if (deleteType) {
                successCode(res, true, "delete successfully")
            } else {
                failCode(res, false, "delete unsuccessfully")
            }
        } else {
            failCode(res, false, "not data")
        }
    } catch (err) {
        errorCode(res, "failure");
        next(err);
    }
}

const updateType = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { typeRoom } = req.body;
        let findType = await prisma.typeroom.findFirst({ where: { id: Number(id) } })
        if (findType) {
            let updateType = await prisma.typeroom.update({
                where: { id: Number(id) },
                data: {
                    typeroom: typeRoom
                }
            });
            if (updateType) {
                successCode(res, updateType, "update successfully");
            } else {
                failCode(res, false, "update failed");
            }
        } else {
            failCode(res, false, "type invalid");
        }
    } catch (err) {
        errorCode(res, "failure");
        next(err);
    }
}

module.exports = {
    getTypeRoomByName,
    getAllTypes,
    createType,
    deleteType,
    updateType
}