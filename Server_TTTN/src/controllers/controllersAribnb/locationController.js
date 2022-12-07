let { PrismaClient } = require('@prisma/client');
const { errorCode, successCode, failCode } = require('../../ultis/reponse');
const prisma = new PrismaClient();
const fs = require('fs');
const { uploadSingle, deletedImage } = require('../../models/ModelCloudinary');
const { pagination } = require('../../ultis/Pagination');
const { extractPublicId } = require('cloudinary-build-url')

const createLocation = async (req, res, next) => {
    try {
        let { location, provine, nation } = req.body;
        uploadSingle(process.cwd() + '/' + req.file.path).then(async (result) => {
            let resultData = await prisma.location.create({
                data: {
                    location, provine, nation, image: result.url
                },
            })
            if (resultData) {
                successCode(res, resultData, "create location successfully")
            } else {
                failCode(res, false, "cannot create location")
            }
        })
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

const updateLocation = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { location, provine, nation } = req.body;
        let findLocation = await prisma.location.findFirst({
            where: { id: Number(id) }
        });
        if (findLocation) {
            const publicId = extractPublicId(findLocation.image)
            await deletedImage((publicId)).then((result) => {
                console.log(result);
            });

            await uploadSingle(process.cwd() + '/' + req.file.path).then(async (result) => {
                let resultData = await prisma.location.update({
                    where: { id: Number(id) },
                    data: {
                        location, provine, nation, image: result.url
                    },
                })
                if (resultData) {
                    successCode(res, resultData, "create location successfully")
                } else {
                    failCode(res, false, "cannot create location")
                }
            })
        } else {
            failCode(res, false, 'cannot find location')
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

const deleteLocation = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.location.delete({ where: { id: Number(id) } });
        if (data) {
            successCode(res, data, "delete successfully")
        } else {
            failCode(res, false, "cannot delete")
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

const getAllLocation = async (req, res, next) => {
    try {
        let data = await prisma.location.findMany({
            include: { Room: true }
        });
        if (!data.length) {
            failCode(res, false, "cannot find")
        } else {
            successCode(res, data, "successfully")
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

const getLocationById = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.location.findFirst({
            where: { id: Number(id) },
            include: { Room: true }
        });
        if (data) {
            successCode(res, data, "find successfully");
        } else {
            failCode(res, false, "cannot find");
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

const getPaginationLocation = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        let data = await prisma.location.findMany({ include: { Room: true } });
        if (data) {
            let results = await pagination(data, page, limit);
            if (results) {
                successCode(res, results, "find successfully");
            }
        } else {
            failCode(res, false, "cannot find")
        }
    } catch (err) {
        errorCode(res, "failure")
        next(err);
    }
}

module.exports = {
    createLocation,
    getAllLocation,
    deleteLocation,
    getLocationById,
    getPaginationLocation,
    updateLocation,
}