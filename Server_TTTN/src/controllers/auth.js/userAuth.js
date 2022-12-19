const { PrismaClient } = require("@prisma/client");
const { successCode, failCode, errorCode } = require("../../ultis/reponse");
const prisma = new PrismaClient();
const { encodeToken } = require("../../middleWares/auth");
const jwt_decode = require('jwt-decode');
const bcrypt = require("bcrypt");
require('dotenv').config();



const register = async (req, res, next) => {
  try {
    const { username, gender, phone, email, password, birthday, role } = req.body;
    if (!email || !password) failCode(res, false, 'Missing email and/or password')
    let checkUerName = await prisma.users.findFirst({
      where: {
        OR: [
          { email: { contains: email } },
          { password: { contains: password } },
        ]
      }
    })

    if (checkUerName) {
      failCode(res, false, "email or password available")
      next()
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      let genderConvert = (gender === "true" ? true : false);
      let Role = 'USER';
      const authHeader = req.header('Authorization');
      if (authHeader) {
        const token = authHeader && authHeader.split(' ')[1]
        if (token) {
          let { data } = jwt_decode(token, { data: true });
          let checkAdmin = data ? data.roleAdmin : false;
          Role = checkAdmin ? role : "USER";
        }
      }
      let dataCreate = { username, gender: genderConvert, phone, email, password: hashedPassword, birthday, role: Role }
      let useCreate = await prisma.users.create({ data: dataCreate });
      if (useCreate) {
        successCode(res, useCreate, "create user successfully");
        next()
      } else { failCode(res, false, "create user failed") }
    }
  } catch (err) {
    errorCode(res, 'failCode')
  }
}

const singIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let UserLogin = await prisma.users.findFirst({ where: { email: email } });
    if (UserLogin) {
      const isPasswordValid = await bcrypt.compare(password, UserLogin.password)
      if (isPasswordValid) {
        const accessToken = await encodeToken({ userID: UserLogin.username + UserLogin.email, roleAdmin: UserLogin.role === 'ADMIN' ? true : false })
        let userLogin = {
          id: UserLogin.id,
          username: UserLogin.username,
          gender: UserLogin.gender,
          email: UserLogin.email,
          phone: UserLogin.phone,
          role: UserLogin.role
        }
        successCode(res, { ...userLogin, accessToken: accessToken }, true);
        next()
      }
    } else {
      failCode(res, false, "password or email is invalid")
    }
  } catch (err) {
    errorCode(res, 'failCode')
  }
}

// const resetPassword = async (req, res, next) => {
//   try {
//     const { password, email } = req.body;
//     if (!password && !email) { failCode(res, false, "password or email is invalid") }
//     // const userReset = await prisma.users.findFirst({ where: { email: email } })
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.USER_EMAIL,
//         pass: process.env.PASS_EMAIL
//       }
//     });
//     const mainOptions = {
//       // thiết lập đối tượng, nội dung gửi mail
//       from: 'Admin',
//       to: `${email}`,
//       subject: 'Test Nodemailer',
//       text: 'You recieved message from ' + email,
//       html: '<p>You have got a new message</p><ul><li>Email:' + email + '</li></ul>'
//     }
//     transporter.sendMail(mainOptions, function (err, info) {
//       if (err) {
//         console.log(err);
//         res.redirect('/');
//       } else {
//         console.log('Message sent: ' + info.response);
//         res.redirect('/');
//       }
//     });
//   } catch (err) {
//     errorCode(res, "failure")
//     next(err)
//   }
// }

module.exports = {
  singIn,
  register,
  // resetPassword
}