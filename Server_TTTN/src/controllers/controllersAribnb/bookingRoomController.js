let { PrismaClient } = require('@prisma/client');
const { checkDayValid, checkDay } = require('../../ultis/checkTemplate');
const { failCode, errorCode, successCode } = require('../../ultis/reponse')
const prisma = new PrismaClient()
const moment = require('moment')


const createBooking = async (req, res, next) => {
    try {
        let { checkIn, checkOut, customer_id, room_id, note, numberCustomer, price, adult, baby, child, unit } = req.body;

        let dataBooking = await prisma.bookingRoom.findMany({
            where: {
                room_id: Number(room_id)
            }
        });
        if (dataBooking.length !== null) {
            let checkDate = true;
            for (let booking of dataBooking) {
                let check_In = booking.checkIn;
                let check_Out = booking.checkOut;
                checkDate = checkDayValid(check_In, checkIn, check_Out, checkOut);
                if (!checkDate) {
                    break;
                }
            }
            if (checkDate) {
                const formatDate = "MM/DD/YYYY hh:mm:ss";
                let data = await prisma.bookingRoom.create({
                    data: {
                        checkIn: new Date(moment(checkIn).format(formatDate)),
                        checkOut: new Date(moment(checkOut).format(formatDate)),
                        customer_id: Number(customer_id),
                        room_id: Number(room_id),
                        numberCustomer: Number(numberCustomer),
                        price: Number(price),
                        adult: Number(adult),
                        baby: Number(baby),
                        child: Number(child),
                        unit,
                        note
                    }
                })
                if (data) {
                    successCode(res, true, "create booking room successfully");
                }
            } else {
                failCode(res, false, "CheckIn Or CheckOut invalid ")
            }
        } else {
            failCode(res, false, "cannot create booking");
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

const updateBooking = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { checkIn, checkOut, customer_id, room_id, note, numberCustomer, price, adult, baby, child, unit } = req.body;
        let dataBooking = await prisma.bookingRoom.findFirst({
            where: {
                id: Number(id)
            }
        });
        let temp = false;
        if (dataBooking) {
            let check = checkDay(dataBooking.checkIn, checkIn, dataBooking.checkOut, checkOut);
            if (check) {
                temp = true;
            } else {
                let arrBookingRoom = await prisma.bookingRoom.findMany({ where: { room_id: Number(room_id) } })
                let arrBookingRoomNew = [...arrBookingRoom].filter((item) => item.id !== dataBooking.id);
                let checkDate = true;
                for (let booking of arrBookingRoomNew) {
                    let check_In = booking.checkIn;
                    let check_Out = booking.checkOut;
                    checkDate = checkDayValid(check_In, checkIn, check_Out, checkOut);
                    if (!checkDate) {
                        break;
                    }
                }
                if (checkDate) {
                    temp = true;
                }
            }
            if (temp) {
                const formatDate = "MM/DD/YYYY hh:mm:ss";
                let data = await prisma.bookingRoom.update({
                    where: { id: Number(id) },
                    data: {
                        checkIn: new Date(moment(checkIn).format(formatDate)),
                        checkOut: new Date(moment(checkOut).format(formatDate)),
                        customer_id: Number(customer_id),
                        room_id: Number(room_id),
                        numberCustomer: Number(numberCustomer),
                        adult: Number(adult),
                        baby: Number(baby),
                        child: Number(child),
                        price: Number(price),
                        unit,
                        note
                    }
                });
                if (data) {
                    successCode(res, true, "update booking successfully")
                } else {
                    failCode(res, false, "Cannot update booking");
                }
            } else {
                failCode(res, false, "CheckIn Or CheckOut invalid");
            }

        } else {
            failCode(res, false, "Cannot find booking");
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

// const changeNoteBookings = async (req, res, next) => {
//     try {
//         //thay doi trang thai booking
//         let { note, id } = req.body;
//         let findData = await prisma.bookingRoom.findFirst({
//             where: { id: Number(id) }
//         })
//         if (findData) {
//             let changeNoteBooking = await prisma.bookingRoom.update({
//                 where: { id: Number(id) },
//                 data: { note }
//             })
//             if (changeNoteBooking) {
//                 successCode(res, changeNoteBooking, "change note successfully")
//             } else {
//                 failCode(res, false, "cannot change note")
//             }
//         } else {
//             failCode(res, false, 'booking invalid')
//         }
//     } catch (err) {
//         errorCode(res, "failure");
//         next(err);
//     }
// }

const getAllBooking = async (req, res, next) => {
    try {
        let data = await prisma.bookingRoom.findMany({
            include: {
                Users: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        phone: true,
                    }
                },
                Room: {
                    select: {
                        id: true,
                        nameRoom: true,
                        price: true
                    }
                },
            }
        });
        if (data.length !== null) {
            successCode(res, data, "successfully")
        } else {
            failCode(res, false, "Kh co du lieu")
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

const getBookingById = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.bookingRoom.findFirst({
            where: { id: Number(id) },
            include: {
                Users: {
                    select: {
                        id: true,
                        username: true,
                        email: true,
                        phone: true,
                    }
                },
                Room: {
                    select: {
                        id: true,
                        nameRoom: true,
                        price: true,
                        location_id: true
                    }
                },
            }
        });
        if (data) {
            successCode(res, data, "successfully")
        } else {
            failCode(res, false, "No Booking")
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

const deleteBooking = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.bookingRoom.findFirst({ where: { id: Number(id) } });
        if (data) {
            let deleteBooking = await prisma.bookingRoom.delete({ where: { id: Number(data.id) } });
            if (deleteBooking) {
                successCode(res, true, "delete successfully")
            } else {
                failCode(res, false, "cannot delete booking")
            }
        } else {
            failCode(res, false, "cannot delete booking")
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

const getByIdUser = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.bookingRoom.findMany({
            where: {
                customer_id: Number(id)
            },
            include: {
                Room: {
                    select: {
                        id: true,
                        nameRoom: true,
                        numberCustomer: true,
                        location_id: true
                    }
                }
            }
        });
        if (data.length) {
            successCode(res, data, "successfully")
        } else {
            failCode(res, false, "cannot find booking by user")
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}



module.exports = {
    createBooking,
    getAllBooking,
    getBookingById,
    deleteBooking,
    getByIdUser,
    updateBooking,
}