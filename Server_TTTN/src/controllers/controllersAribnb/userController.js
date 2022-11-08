const { PrismaClient } = require("@prisma/client");
const { successCode, failCode } = require("../../ultis/reponse");
const prisma = new PrismaClient();

const register = async (req, res, next) => {
  try {
    const { username, gender, phone, email, password, role, birthday, avatar } = req.body;
    let checkUerName = await prisma.users.findFirst({ where: { username: username } })
    if (checkUerName !== null) {
      res.send("co username roi")
      next()
    } else {
      let genderConvert = (gender === "true" ? true : false);
      let data = { username, gender: genderConvert, phone, email, password, role, birthday }
      let useCreate = await prisma.users.create({ data });
      res.send(useCreate)
    }
    next();
  } catch (err) {
    console.log(err)
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
    console.log(err)
  }
}

const getUsersById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let data = await prisma.users.findFirst({ where: { id: Number(id) } },)
    res.json(data);
  } catch (err) {
    console.log(err)
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    let data = await prisma.users.findMany();
    res.json(data)
  } catch (err) {
    console.log(err)
  }
}

const getAllUserRoleUser = async (req, res, next) => {
  try {
    let data = await prisma.users.findMany(
      { where: { role: "USER" } }
    );
    res.json(data);
  } catch (err) {
    console.log(err)
  }
};

const getUserAdmin = async (req, res, next) => {
  try {
    let data = await prisma.users.findFirst(
      { where: { role: "ADMIN" } }
    );
    res.json(data);
  } catch (err) {
    console.log(err)
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