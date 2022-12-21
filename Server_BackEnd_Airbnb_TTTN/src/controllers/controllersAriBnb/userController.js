const { extractPublicId } = require("cloudinary-build-url");
const { uploadSingle, deletedImage } = require("../../models/ModelCloudinary");
const { successCode, failCode, errorCode } = require("../../ultis/reponse");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const uploadAvatar = async (req, res, next) => {
  try {
    let { id } = req.params;
    let data = await prisma.users.findFirst({ where: { id: Number(id) } })
    if (data) {
      if (data.avatar) {
        const publicId = extractPublicId(data.avatar)
        await deletedImage((publicId)).then((result) => {
          console.log(result);
        });
      }
      await uploadSingle(process.cwd() + '/' + req.file.path).then(async (result) => {
        let dataUpdate = await prisma.users.update({
          where: { id: Number(id) },
          data: {
            avatar: result.url
          },
          select: {
            id: true,
            username: true,
            gender: true,
            phone: true,
            email: true,
            role: true,
            created_at: true,
            birthday: true,
            avatar: true
          }
        })
        if (dataUpdate) {
          successCode(res, dataUpdate, "successfully")
        } else {
          failCode(res, false, "update Invalid")
        }
      })
    } else {
      failCode(res, false, 'not data');
    }
  } catch (err) {
    errorCode(res, "failure");
    next(err);
  }
}

const changeRole = async (req, res, next) => {
  try {
    let { id } = req.params;
    let { role } = req.body
    let findUser = await prisma.users.findFirst({ where: { id: Number(id) } });
    if (findUser) {
      let changeRole = await prisma.users.update({
        where: { id: Number(findUser.id) },
        data: {
          role: role.toUpperCase()
        }
      })
      if (changeRole) {
        successCode(res, changeRole, "successfully")
      } else {
        failCode(res, false, "failure")
      }
    } else {
      failCode(res, false, "note data")
    }
  } catch (err) {
    errorCode(res, "failure");
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    let { id } = req.params;
    const { username, gender, phone, email, birthday } = req.body;
    let genderConvert = (gender === "true" || gender === true ? true : false);
    let findUser = await prisma.users.findFirst({ where: { id: Number(id) } });
    if (findUser) {
      let updateUser = await prisma.users.update({
        where: { id: Number(findUser.id) },
        data: {
          username: username,
          phone: phone,
          email: email,
          birthday: birthday,
          gender: genderConvert
        }
      })
      if (updateUser) {
        successCode(res, updateUser, "successfully")
      } else {
        failCode(res, false, "update failure")
      }
    } else {
      failCode(res, false, "note data")
    }
  } catch (err) {
    errorCode(res, "failure");
    next(err);
  }
}

const getUsersById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let data = await prisma.users.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        username: true,
        gender: true,
        phone: true,
        email: true,
        role: true,
        created_at: true,
        birthday: true,
        avatar: true,
      }
    });
    if (data !== null) {
      successCode(res, data, "find user successfully")
    } else {
      failCode(res, false, "not data")
    }
  } catch (err) {
    errorCode(res, 'failure');
    next(err);
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
      },
      select: {
        id: true,
        username: true,
        gender: true,
        phone: true,
        email: true,
        role: true,
        created_at: true,
        birthday: true,
        avatar: true
      }
    })
    if (data.length !== null) {
      successCode(res, data, "find user successfully")
    } else {
      failCode(res, false, "not data")
    }
  } catch (err) {
    errorCode(res, "failure");
    next(err);
  }
}

const getAllUsers = async (req, res, next) => {
  try {
    let data = await prisma.users.findMany({
      select: {
        id: true,
        username: true,
        gender: true,
        phone: true,
        email: true,
        role: true,
        created_at: true,
        birthday: true,
        avatar: true
      }
    });
    if (data.length !== null) {
      successCode(res, data, "successfully")
    } else {
      failCode(res, false, "not data")
    }
  } catch (err) {
    errorCode(res, "failure");
    next(err);
  }
}

const deleteUser = async (req, res, next) => {
  try {
    let { id } = req.params;
    let findUser = await prisma.users.findFirst({
      where: { id: Number(id) }
    })
    if (findUser) {
      let data = await prisma.users.update({
        where: { id: Number(findUser.id) },
        data: {
          isRemove: false
        }
      })
      if (data) {
        successCode(res, true, "delete user successfully")
      }
    } else {
      failCode(res, false, "not data")
    }
  } catch (err) {
    errorCode(res, "failure");
    next(err);
  }
}

const getPaginationUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    let skip = (page - 1) * limit;
    let data = await prisma.users.findMany({
      skip: Number(skip),
      take: Number(limit),
      select: {
        id: true,
        username: true,
        gender: true,
        phone: true,
        email: true,
        role: true,
        created_at: true,
        birthday: true,
        avatar: true
      }
    })
    if (data) {
      successCode(res, data, ' successfully');
    } else {
      failCode(res, false, "not data")
    }
  } catch (err) {
    errorCode(res, "failure");
    next(err);
  }
}

const getAllUserRoleUser = async (req, res, next) => {
  try {
    let data = await prisma.users.findMany(
      {
        where: { role: "USER" },
        select: {
          id: true,
          username: true,
          gender: true,
          phone: true,
          email: true,
          role: true,
          created_at: true,
          birthday: true,
          avatar: true
        }
      }
    );
    if (data.length !== null) {
      successCode(res, data, "successfully")
    } else {
      failCode(res, false, "note data")
    }
  } catch (err) {
    errorCode(res, "failure");
    next(err);
  }
};

// const getUserAdmin = async (req, res, next) => {
//   try {
//     let data = await prisma.users.findFirst(
//       { where: { role: "ADMIN" } }
//     );
//     if (data !== null) {
//       successCode(res, data, "successfully")
//     } else {
//       failCode(res, "kh co user", "not data")
//     }
//   } catch (err) {
//     errorCode(res, "failure");
//     next(err);
//   }
// };



module.exports = {
  getAllUsers,
  getAllUserRoleUser,
  getUsersById,
  // getUserAdmin,
  getUsersByName,
  deleteUser,
  getPaginationUsers,
  uploadAvatar,
  changeRole,
  updateUser
}