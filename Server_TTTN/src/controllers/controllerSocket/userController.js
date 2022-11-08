const User = require("../../models/modelSocket/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    let newUser = {
      _id: user._id,
      username: user.username,
      avatarImage: user.avatarImage,
      role: user.role
    }
    return res.json({ status: true, user: newUser });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role: 'user'
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.registerAdmin = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      role: 'admin'
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getUsersById = async (req, res, next) => {
  try {
    const { id } = req.params
    const users = await User.findOne({ _id: id }).select([
      "username",
      "avatarImage",
      "_id",
      "role",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find().select([
      "username",
      "_id",
      "avatarImage",
      "role"
    ]);

    const arrUsers = allUsers.reduce((arrU, user) => {
      if (user.role === "user") { arrU.push(user) }
      return arrU
    }, [])

    return res.send(arrUsers);
  } catch (ex) {
    next(ex);
  }
}


module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};


module.exports.userAdmin = async (req, res, next) => {
  try {
    let userAdmin = await User.findOne({ role: "admin" }).select([
      "_id",
      "username",
      "avatarImage"
    ])
    res.send(userAdmin);
  } catch (ex) {
    next(ex);
  }
}