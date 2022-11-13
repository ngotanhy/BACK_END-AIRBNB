let { PrismaClient } = require('@prisma/client');
const { errorCode } = require('../../ultis/reponse');
const prisma = new PrismaClient();

const createLocation = async (req, res, next) => {
    try { } catch (err) {
        errorCode(res, "failure")
    }
}

module.exports = {

}