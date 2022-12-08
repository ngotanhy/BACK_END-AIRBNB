const { errorCode, successCode, failCode } = require('../../ultis/reponse')
let { PrismaClient } = require('@prisma/client');
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

module.exports = {
    getTypeRoomByName,
    getAllTypes
}