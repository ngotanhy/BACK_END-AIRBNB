const { PrismaClient } = require("@prisma/client");
const { successCode, failCode, errorCode } = require("../../ultis/reponse");
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const { encodeToken } = require("../../middleWares/auth");


const register = async (req, res, next) => {
  try {
    const { username, gender, phone, email, password, role, birthday } = req.body;
    if (!email || !password)
      failCode(res, "", 'Missing email and/or password')
    let checkUerName = await prisma.users.findFirst({
      where: {
        email: { contains: email }
      }
    })

    if (checkUerName) {
      failCode(res, "", "email available")
      next()
    } else {
      let genderConvert = (gender === "true" ? true : false);
      let data = { username, gender: genderConvert, phone, email, password, role, birthday }
      let useCreate = await prisma.users.create({ data });
      // Return token
      const  accessToken = await encodeToken ({ userId: useCreate.email })

      if (useCreate) {
        successCode(res, { ...useCreate, accessToken: accessToken }, "create user successfully")
      } else { failCode(res, "", "create user failed") }
    }
    next();
  } catch (err) {
    errorCode(res, 'failCode')
  }
}

const singIn = async (req, res, next) => {
  // try {
    const { email, password } = req.body;
    let checkEmail = await prisma.users.findFirst({ where: { email: email } })
    if (checkEmail !== null) {
      let checkPassword = await prisma.users.findFirst({ where: { password: password } })
      // Return token
      const  accessToken = await encodeToken ({ userId: checkPassword.email })

      if (checkPassword !== null) {
        let userLogin = {
          id: checkPassword.id,
          username: checkPassword.username,
          gender: checkPassword.gender,
          email: checkPassword.email,
          phone: checkPassword.phone,
          role: checkPassword.role
        }
        successCode(res, {...userLogin,accessToken:accessToken}, true);
        next()
      } else {
        failCode(res, "password fail", false)
      }
    } else {
      failCode(res, "email fail", false)
    }
  // } catch (err) {
  //   errorCode(res, 'failCode')
  // }
}

module.exports={
    singIn,
    register
}