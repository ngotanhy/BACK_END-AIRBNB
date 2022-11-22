let { PrismaClient } = require('@prisma/client');
const { checkSameDay } = require('../../ultis/checkTemplate');
const { failCode, errorCode, successCode } = require('../../ultis/reponse')
const prisma = new PrismaClient()



// const createBooking = async (req, res, next) => {
//     try {
//         let { checkIn, checkOut, customer_id, room_id, note, numberCustomer, price, adult, baby, child, unit } = req.body;
//         let dateForm = "MM/DD/YYYY";
//         let dataBooking = await prisma.bookingRoom.findMany({
//             where: {
//                 room_id: Number(room_id)
//             }
//         });
//         if (dataBooking?.length > 0) {
//             //check the sample customer_id, checkin, check out
//             let check = true;
//             check = dataBooking?.map((item) => {
//                 let dateCheckIn = moment(item.checkIn).format(dateForm);
//                 let dateCheckOut = moment(item.checkOut).format(dateForm);
//                 let checkDate = checkSameDay(dateCheckIn, checkIn) && checkSameDay(dateCheckOut, checkOut);
//                 if (item.customer_id === customer_id && checkDate) {
//                     return false;
//                 }
//             })
//             if (check) {
//                 let data = await prisma.bookingRoom.create({
//                     data: { checkIn, checkOut, customer_id, room_id, note }
//                 });
//                 if (data !== null) {
//                     let booking_id = Number(data.id);
//                     let createDetailBooking = await prisma.bookingDetail.create({
//                         data: {
//                             booking_id,
//                             numberCustomer: Number(numberCustomer),
//                             adult: Number(adult),
//                             baby: Number(baby),
//                             child: Number(child),
//                             price: Number(price)
//                         }
//                     })
//                     if (createDetailBooking) {
//                         successCode(res, data, "create booking successfully")
//                     } else {
//                         errorCode(res, "cannot create booking")
//                     }
//                 } else {
//                     errorCode(res, "cannot create booking")
//                 };
//             } else {
//                 failCode(res, checkData, "da co duoc dat");
//             }
//         }
//     } catch (err) {
//         errorCode(res, "failed")
//     }
// }


const createBooking = async (req, res, next) => {
    try {
        let { checkIn, checkOut, customer_id, room_id, note, numberCustomer, price, adult, baby, child, unit } = req.body;
        console.log(checkIn, checkOut, customer_id, room_id, note, numberCustomer, price, adult, baby, child, unit )
          
        // let dateForm = "MM/DD/YYYY";
        // let dataBooking = await prisma.bookingRoom.findMany({
        //     where: {
        //         room_id: Number(room_id)
        //     }
        // });
        // if (dataBooking?.length > 0) {
        //     //check the sample customer_id, checkin, check out
        //     let check = true;
        //     check = dataBooking?.map((item) => {
        //         let dateCheckIn = moment(item.checkIn).format(dateForm);
        //         let dateCheckOut = moment(item.checkOut).format(dateForm);
        //         let checkDate = checkSameDay(dateCheckIn, checkIn) && checkSameDay(dateCheckOut, checkOut);
        //         if (item.customer_id === customer_id && checkDate) {
        //             return false;
        //         }
        //     })
        //     if (check) {
                // let data = await prisma.bookingRoom.create({
                //     data: { checkIn, checkOut, customer_id, room_id, note }
                // });
                // if (data !== null) {
                //     let booking_id = Number(data.id);
                //     let createDetailBooking = await prisma.bookingDetail.create({
                //         data: {
                //             booking_id,
                //             numberCustomer: Number(numberCustomer),
                //             adult: Number(adult),
                //             baby: Number(baby),
                //             child: Number(child),
                //             price: Number(price)
                //         }
                //     })
                //     if (createDetailBooking) {
                //         successCode(res, data, "create booking successfully")
                //     } else {
                //         errorCode(res, "cannot create booking")
                //     }
                // } else {
                //     errorCode(res, "cannot create booking")
                // };
        //     } else {
        //         failCode(res, checkData, "da co duoc dat");
        //     }
        // }
    } catch (err) {
        errorCode(res, "failed")
    }
}
const getAllBooking = async (req, res, next) => {
    try {
        let data = await prisma.bookingRoom.findMany({
            include: {
                BookingDetail: true,
                Users: true,
                Room: true,
            }
        });
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
        let data = await prisma.booking.findMany({ 
            where: { 
                customer_id: Number(idUser.id) 
            } 
        });
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