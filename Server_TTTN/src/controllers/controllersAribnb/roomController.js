const { errorCode, successCode, failCode } = require('../../ultis/reponse')
const fs = require('fs');

let { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


const getAllRoom = async (req, res, next) => {
    try {
        let data = await prisma.room.findMany();
        if (data.length !== 0) {
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
        let { tenPhong, khach, phongNgu, giuong, phongTam, moTa, giaTien, mayGiat, banLa, tivi, dieuHoa, wifi, bep, doXe, hoBoi, banUi, maViTri } = req.body
        let data = await prisma.room.create({ data: { tenPhong, khach, phongNgu, giuong, phongTam, moTa, giaTien, mayGiat, banLa, tivi, dieuHoa, wifi, bep, doXe, hoBoi, banUi, maViTri } });
        if (data) {
            successCode(res, data, "Them thanh cong")
            next()
        }
    } catch (err) {
        errorCode(res, 'failed')
    }
}

const getRoomById = async (req, res, next) => {
    try {
        let { id } = req.params;
        let data = await prisma.room.findUnique({ where: { id } });
        if (data) {
            successCode(res, data, "thanh cong")
        } else {
            failCode(res, data, "not found")
        }
    } catch (err) {
        failure(res, "khong co")
    }
}


const uploadImage = async (req, res, next) => {
    try {
        let { id } = req.params;
        let fileImages = await (process.cwd() + '/' + req.file.path);//lay duong dan file anh
        console.log(typeof fileImages)
        let data={
            room_id: Number(id),
            urlimage: fileImages
        }
        console.log(data)
        let addImages = await prisma.image.create({data})
        console.log('a');
        successCode(res, addImages, "successfully")

        // await fs.readFile(process.cwd() + '/' + req.file.path, async (err, data) => {
        //     let fileName = Buffer.from(data).toString('base64');
        //     let fileSee = `data:${req.file.mimetype};base64,${fileName}`;
        //     fs.unlinkSync(process.cwd() + '/' + req.file.path);
        //     res.send(fileSee)
        //     // let dataImages = await prisma.image.create({ data: { room_id: id, urlimage: fileSee } })
        //     // successCode(res, dataImages, "successfully")
        // })
    } catch (err) {

    }
}



module.exports = {
    getAllRoom,
    getRoomById,
    createRoom,
    uploadImage
}