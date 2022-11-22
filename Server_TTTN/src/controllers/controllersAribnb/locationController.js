let { PrismaClient } = require('@prisma/client');
const { errorCode, successCode, failCode } = require('../../ultis/reponse');
const prisma = new PrismaClient();
const fs = require('fs');
const { uploadSingle } = require('../../models/ModelCloudinary');
const { pagination } = require('../../ultis/Pagination');


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
                failCode(res, resultData, "cannot create location")
            }
        })
    } catch (err) {
        errorCode(res, "failure")
    }
}

const deleteLocation = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.location.delete({ where: { id: Number(id) } });
        if (data) {
            successCode(res, data, "delete successfully")
        } else {
            failure(res, data, "cannot delete")
        }
    } catch (err) {
        errorCode(res, "failure")
    }
}

const getAllLocation = async (req, res, next) => {
    try {
        let data = await prisma.location.findMany({
            include: { Room: true }
        });
        if (!data.length) {
            failCode(res, data, "cannot find")
        } else {
            successCode(res, data, "successfully")
        }
    } catch (err) {
        errorCode(res, "failure")
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
            failCode(res, data, "cannot find");
        }
    } catch (err) {
        errorCode(res, "failure")
    }
}

const getPaginationLocation = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        let data = await prisma.location.findMany({include: {Room: true}});
        if (data) {
            let results = await pagination(data, page, limit);
            if (results) {
                successCode(res, results, "find successfully");
            }
        } else {
            failCode(res, "false", "cannot find")
        }
    } catch (err) {
        errorCode(res, "failure")
    }
}

module.exports = {
    createLocation,
    getAllLocation,
    deleteLocation,
    getLocationById,
    getPaginationLocation,
}