let { PrismaClient } = require('@prisma/client')
const { failCode, errorCode } = require('../../ultis/reponse')
const prisma = new PrismaClient()



const createBooking = async (req, res, next) => {
    try {
        let { checkIn, checkOut, customer_id, room_id, note } = req.body;
        let checkData = await prisma.bookingRoom.findFirst({
            where: {
                customer_id: Number(customer_id),
                room_id: Number(room_id),
                checkIn,
                checkOut
                //check ngay ho co hop ly
            }
        });
        if (checkData !== null) {
            failCode(res, checkData, "da co duoc dat");
        } else {
            let data = await prisma.bookingRoom.create({
                data: { checkIn, checkOut, customer_id, room_id, note }
            });
            if (data !== null) {
                successCode(res, data, "create booking successfully")
            } else {
                errorCode(res, "cannot create booking")
            };
        }
    } catch (err) {
        errorCode(res, "failed")
    }
}

const getAllBooking = async (req, res, next) => {
    try {
        let data = await prisma.bookingRoom.findMany();
        if (data.length !== null) {
            successCode(res, data, "successfully")
        } else {
            failCode(res, "", "Kh co du lieu")
        }
    } catch (err) {
        errorCode(res, 'failure')
    }
}

const getBookingById = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.bookingRoom.findFirst({ where: { id } });
        if (data.length !== null) {
            successCode(res, data, "successfully")
            next()
        } else {
            failCode(res, "", "Kh co du lieu")
        }
    } catch (err) {
        errorCode(res, 'failure')
    }
}

const updateBookingId = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { checkIn, checkOut, customer_id, room_id, note } = req.body;
        let findId = await prisma.bookingRoom.findFirst({ where: { id: Number(id) } });
        if (findId !== null) {
            let dataUpdate = await prisma.bookingRoom.update({
                where: { id: Number(id) },
                data: { checkIn, checkOut, customer_id, room_id, note }
            });
            if (dataUpdate !== null) {
                successCode(res, data, "update successfully")
            } else {
                failCode(res, data, "update failed")
            }
        } else {
            failCode(res, data, "cannot find booking room")
        }
    } catch (err) {
        errorCode(res, 'failure')
    }
}

const deleteBooking = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.bookingRoom.findFirst({ where: { id: Number(id) } });
        if (data !== null) {
            successCode(res, data, "delete successfully")
        } else {
            failure(res, data, "cannot delete booking")
        }
    } catch (err) {
        errorCode(res, 'failure')
    }
}

const getByIdUser = async (req, res, next) => {
    try {
        let { idUser } = req.params;
        let data = await prisma.booking.findMany({ where: { customer_id: Number(idUser.id) } });
        if (data.length !== null) {
            successCode(res, data, "successfully")
        } else {
            failure(res, data, "cannot find booking by user")
        }
    } catch (err) {
        errorCode(res, 'failure')
    }
}



module.exports = {
    createBooking,
    getAllBooking,
    getBookingById,
    updateBookingId,
    deleteBooking,
    getByIdUser,
}