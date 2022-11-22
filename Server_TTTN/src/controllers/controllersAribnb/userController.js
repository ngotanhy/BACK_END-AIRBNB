const { PrismaClient } = require("@prisma/client");
const { pagination } = require("../../ultis/Pagination");
const { successCode, failCode, errorCode } = require("../../ultis/reponse");
const prisma = new PrismaClient();


const getUsersById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let data = await prisma.users.findFirst({ where: { id: Number(id) } });
    if (data !== null) {
      successCode(res, data, "find user successfully")
    } else {
      failCode(res, "false", "user undefined")
    }
  } catch (err) {
    errorCode(res, 'failCode');
  }
}

const getUsersByName = async (req, res, next) => {
  try {
    let { name } = req.params;
    let data = await prisma.users.findMany({
      where: {
        username: {
          contains: name,
        }
      }
    })
    if (data.length !== null) {
      successCode(res, data, "find user successfully")
    } else {
      failCode(res, "false", "user undefined")
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
      failCode(res, "false", "user undefined")
    }
  } catch (err) {
    errorCode(res, 'failCode');
    next();
  }
}

const deleteUser = async (req, res, next) => {
  try {
    let { id } = req.params;
    let findUser = await prisma.users.findFirst({
      where: { id: Number(id) }
    })
    if (findUser) {
      let data = await prisma.users.delete({
        where: { id: Number(id) }
      })
      if (data) {
        successCode(res, 'true', "delete user successfully")
      }
    } else {
      failCode(res, 'false', "cannot find user")
    }
  } catch (err) {
    errorCode(res, "failure")
  }
}

const getPaginationUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let data = await prisma.users.findMany();
    if (data) {
      const result = pagination(data, page, limit);
      if (result) {
        successCode(res, result, "successfully")
      } else {
        failCode(res, "false", "fail")
      }
    } else {
      failCode(res, "false", "fail")
    }
  } catch (err) {
    errorCode(res, "failure")
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
  getAllUsers,
  getAllUserRoleUser,
  getUsersById,
  getUserAdmin,
  getUsersByName,
  deleteUser,
  getPaginationUsers,
}