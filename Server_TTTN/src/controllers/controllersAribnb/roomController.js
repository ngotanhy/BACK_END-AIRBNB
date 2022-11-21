const { errorCode, successCode, failCode } = require('../../ultis/reponse')
const fs = require('fs');
let { PrismaClient } = require('@prisma/client');
const { uploadSingle } = require('../../models/ModelCloudinary');
const { checkBoolean } = require('../../ultis/checkTemplate');
const prisma = new PrismaClient()


const getAllRoom = async (req, res, next) => {
    try {
        let data = await prisma.room.findMany({
            include: {
                Location: true,
                Typeroom: true,
            }
        });
        if (data.length !== 0) {
            console.log('a');
            successCode(res, data, "Thanh cong")
        } else {
            failCode(res, data, "Khong co phong")
        }
    } catch (err) {
        errorCode(res, 'failed')
    }
}

const createRoom = async (req, res, next) => {
    try {
        let { nameRoom,
            description,
            price,
            numberCustomer,
            bedRoom,
            bed,
            bathRoom,
            washing,
            tivi,
            iron,
            airCondition,
            wifi,
            kitchen,
            parkingCar,
            pool,
            location_id } = req.body;
        let checkNameRoom = await prisma.room.findFirst({
            where: {
                nameRoom: {
                    contains: nameRoom
                }
            }
        });
        if (!checkNameRoom) {
            let data = {
                nameRoom,
                description,
                price: Number(price),
                numberCustomer: Number(numberCustomer),
                bedRoom: Number(bedRoom),
                bed: Number(bed),
                bathRoom: Number(bathRoom),
                washing: checkBoolean(washing),
                tivi: checkBoolean(tivi),
                iron: checkBoolean(iron),
                airCondition: checkBoolean(airCondition),
                wifi: checkBoolean(wifi),
                kitchen: checkBoolean(kitchen),
                parkingCar: checkBoolean(parkingCar),
                pool: checkBoolean(pool),
                location_id: Number(location_id)
            }

            const dataRoom = await prisma.room.create({
                data
            });
            if (dataRoom) {
                successCode(res, dataRoom, "Them thanh cong");
            } else {
                failCode(res, dataRoom, "cannot create room");
            }
        } else {
            failCode(res, " ", "room is isValid")
        }
    } catch (err) {
        errorCode(res, 'failed')
    }
}

const getRoomById = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.room.findFirst({
            where: { id: Number(id) },
            include: {
                Location: true,
                Typeroom: true,
                Image: true
            },
        });
        if (data) {
            successCode(res, data, "thanh cong")
        } else {
            failCode(res, data, "not found")
        }
    } catch (err) {
        errorCode(res, 'failed')
    }
}


const uploadImage = async (req, res, next) => {
    try {
        let { room_id } = req.body;
        uploadSingle(process.cwd() + '/' + req.file.path).then(async (result) => {
            let resultData = await prisma.image.create({
                data: {
                    room_id: Number(room_id),
                    urlimage: result.url
                },
            })
            if (resultData) {
                successCode(res, resultData, "create location successfully")
            } else {
                failCode(res, resultData, "cannot create location")
            }
        })

    } catch (err) {
        errorCode(res, "failure")
    }
}


// const findImageRoom = async (req, res, next)=>{
//     try {
//         let { id}= req.params;
//         let data = await prisma.
//     }catch(err){
//         errorCode(res, "failure")
//     }
// }


module.exports = {
    getAllRoom,
    getRoomById,
    createRoom,
    uploadImage
}