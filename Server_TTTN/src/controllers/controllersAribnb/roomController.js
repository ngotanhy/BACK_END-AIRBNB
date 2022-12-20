const { errorCode, successCode, failCode } = require('../../ultis/reponse')
const fs = require('fs');
const { uploadSingle, deletedImage } = require('../../models/ModelCloudinary');
const { checkItem, checkObjItem } = require('../../ultis/checkTemplate');
const { extractPublicId } = require('cloudinary-build-url');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


const getAllRoom = async (req, res, next) => {
    try {
        let data = await prisma.room.findMany({
            include: {
                Location: true,
                Typeroom: { select: { id: true, typeroom: true } },
                Image: { select: { urlimage: true } }
            }
        });
        if (data.length !== null) {
            successCode(res, data, "successfully")
        } else {
            failCode(res, data, "not data")
        }
    } catch (err) {
        errorCode(res, 'failure')
        next();
    }
}

const createRoom = async (req, res, next) => {
    try {
        let { nameRoom, description,
            price, numberCustomer,
            bedRoom, bed,
            bathRoom, washing,
            tivi, iron,
            airCondition, wifi,
            kitchen, parkingCar,
            pool, location_id } = req.body;
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
                description, price: Number(price),
                numberCustomer: Number(numberCustomer),
                bedRoom: Number(bedRoom), bed: Number(bed),
                bathRoom: Number(bathRoom), washing: checkItem(washing),
                tivi: checkItem(tivi), iron: checkItem(iron),
                airCondition: checkItem(airCondition), wifi: checkItem(wifi),
                kitchen: checkItem(kitchen), parkingCar: checkItem(parkingCar),
                pool: checkItem(pool), location_id: Number(location_id)
            }
            const dataRoom = await prisma.room.create({ data: data });
            if (dataRoom) {
                successCode(res, dataRoom, "create successfully");
            } else {
                failCode(res, false, "create unsuccessfully");
            }
        } else {
            failCode(res, false, "room is isValid")
        }
    } catch (err) {
        errorCode(res, 'failure')
    }
}

const updateRoom = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { nameRoom,
            description, price, numberCustomer, bedRoom,
            bed, bathRoom, washing, tivi, iron,
            airCondition, wifi, kitchen, parkingCar, pool, location_id } = req.body;
        let dataUpdate = {
            nameRoom, description,
            price, numberCustomer, bedRoom, bed,
            bathRoom, washing, tivi,
            iron, airCondition, wifi, kitchen,
            parkingCar, pool, location_id
        }
        let findRoom = await prisma.room.findFirst({ where: { id: Number(id) } });
        if (findRoom) {
            let data = checkObjItem(findRoom, dataUpdate);
            console.log(data);
            let updateRoom = await prisma.room.update({
                where: { id: Number(id) },
                data: data
            })
            if (updateRoom) {
                successCode(res, updateRoom, 'update successfully')
            } else {
                failCode(res, false, "update available")
            }
        } else {
            failCode(res, false, "not data")
        }
    } catch (err) {
        errorCode(res, "failure");
        next(err);
    }
}

const getRoomById = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.room.findFirst({
            where: { id: Number(id) },
            include: {
                Location: true,
                Typeroom: { select: { id: true, typeroom: true } },
                Image: { select: { urlimage: true } }
            },
        });
        if (data) {
            successCode(res, data, "successfully")
        } else {
            failCode(res, false, "not found")
        }
    } catch (err) {
        errorCode(res, 'failure')
    }
}

const getRoomByName = async (req, res, next) => {
    try {
        let { name } = req.params;
        let data = await prisma.room.findMany({
            where: {
                nameRoom: { contains: name }
            },
            include: {
                Image: { select: { urlimage: true } }
            }
        })
        if (data.length) {
            successCode(res, data, "find successfully")
        } else {
            failCode(res, false, 'not data')
        }
    } catch (err) {
        errorCode(res, 'failure')
    }
}

const uploadImage = async (req, res, next) => {
    try {
        let { id } = req.params;
        //delete url image 
        let checkImage = await prisma.image.findMany({
            where: { room_id: Number(id) }
        })

        if (checkImage.length !== null) {
            let res_dele = checkImage.map(item => new Promise((resolve, reject) => {
                const publicId = extractPublicId(item.urlimage)
                deletedImage((publicId)).then((result) => {
                    resolve(result);
                });
            }));
            Promise.all(res_dele).then((result) => {
                console.log(result, 'ok');
            }).catch((err) => {
                console.log('error: ' + err);
            })
        }


        let arrUrlImages = [];
        await (async () => {
            let length = req.files.length;
            for (let file = 0; file < length; file++) {
                let filePath = await req.files[file].path;
                await uploadSingle(filePath).then(async (result) => {
                    arrUrlImages.push(result.url)
                })
            }
        })();

        let res_promises = arrUrlImages.map(filePath => new Promise((resolve, reject) => {
            prisma.image.create({
                data: {
                    room_id: Number(id),
                    urlimage: filePath
                }
            }).then((result) => {
                resolve(result);
            })
        }))

        Promise.all(res_promises)
            .then(async (result) => {
                if (result.length !== null) {
                    successCode(res, true, "upload successfully")
                } else {
                    failCode(res, false, "upload failure")
                }
            })
            .catch((error) => {
                failCode(res, error, "upload failure")
            })

    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

const paginationRoom = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        let skip = (page - 1) * limit;
        let data = await prisma.room.findMany({
            skip: Number(skip),
            take: Number(limit),
            include: {
                Image: {
                    select: { id: true, urlimage: true }
                }
            }
        });
        if (data) {
            successCode(res, data, "pagination successfully")
        } else {
            failCode(res, false, "not data")
        }
    } catch (err) {
        errorCode(res, "failure");
        next(err);
    }
}

const getRoomLocation = async (req, res) => {
    try {
        let { id } = req.params;
        let data = await prisma.room.findMany({
            where: {
                location_id: Number(id)
            },
            include: {
                Image: {
                    select: {
                        id: true,
                        urlimage: true
                    }
                }
            }
        })
        if (data.length) {
            successCode(res, data, "find successfully")
        } else {
            failCode(res, false, "not data")
        }

    } catch (err) {
        errorCode(res, "failure");
    }
}

const deleteRoom = async (req, res, next) => {
    try {
        let { id } = req.params;
        let findRoom = await prisma.room.findFirst({ where: { id: Number(id) } });
        if (findRoom) {
            let findType = await prisma.typeroom.findFirst({ where: { room_id: Number(findRoom.id) } });
            if (findType) {
                await prisma.typeroom.deleteMany({ where: { room_id: Number(findRoom.id) } });
            }
            let deleteRoom = await prisma.room.delete({ where: { id: Number(id) } });
            if (deleteRoom) {
                successCode(res, true, "delete successfully");
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


module.exports = {
    getAllRoom,
    getRoomById,
    createRoom,
    uploadImage,
    paginationRoom,
    getRoomLocation,
    updateRoom,
    getRoomByName,
    deleteRoom
}