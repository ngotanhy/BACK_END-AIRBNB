const { PrismaClient } = require("@prisma/client");
const { successCode, failCode } = require("../../ultis/reponse");
const prisma = new PrismaClient();

const register = async (req, res, next) => {
  try {
    const { username, gender, phone, email, password, role, birthday, avatar } = req.body;
    let checkUerName = await prisma.users.findFirst({ where: { username: username } })
    if (checkUerName !== null) {
      failCode(res, "co user roi", "failed to find user")
      next()
    } else {
      let genderConvert = (gender === "true" ? true : false);
      let data = { username, gender: genderConvert, phone, email, password, role, birthday }
      let useCreate = await prisma.users.create({ data });
      successCode(res, useCreate, "create user successfully")
    }
    next();
  } catch (err) {
    errorCode(res, 'failCode')
  }
}

const singIn = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let checkUerName = await prisma.users.findFirst({ where: { username: username } })
    if (checkUerName !== null) {
      let checkPassword = await prisma.users.findFirst({ where: { password: password } })
      if (checkPassword !== null) {
        let userLogin = {
          id: checkUerName.id,
          username: checkUerName.username,
          gender: checkUerName.gender,
          email: checkUerName.email,
          phone: checkUerName.phone,
          role: checkUerName.role
        }
        successCode(res, userLogin, true)
      } else {
        failCode(res, "password fail", false)
      }
    } else {
      failCode(res, "username fail", false)
    }
  } catch (err) {
    errorCode(res, 'failCode')
  }
}

const getUsersById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let data = await prisma.users.findFirst({ where: { id:Number(id)} });
    if (data !== null) {
      successCode(res, data, "find user successfully")
    } else {
      failCode(res, "kh co user", "user undefined")
    }
  } catch (err) {
    errorCode(res, 'failCode');
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    let data = await prisma.users.findMany();
    if (data.length !== null) {
      successCode(res, data, "successfully")
    } else {
      failCode(res, "kh co user", "user undefined")
    }
  } catch (err) {
    errorCode(res, 'failCode')
  }
}

const getAllUserRoleUser = async (req, res, next) => {
  try {
    let data = await prisma.users.findMany(
      { where: { role: "USER" } }
    );
    if (data.length !== null) {
      successCode(res, data, "successfully")
    } else {
      failCode(res, "kh co user", "user undefined")
    }
  } catch (err) {
    errorCode(res, 'failCode')
  }
};

const getUserAdmin = async (req, res, next) => {
  try {
    let data = await prisma.users.findFirst(
      { where: { role: "ADMIN" } }
    );
    if (data !== null) {
      successCode(res, data, "successfully")
    } else {
      failCode(res, "kh co user", "user undefined")
    }
  } catch (err) {
    errorCode(res, 'failCode')
  }
};


module.exports = {
  register,
  singIn,
  getAllUsers,
  getAllUserRoleUser,
  getUsersById,
  getUserAdmin,
}