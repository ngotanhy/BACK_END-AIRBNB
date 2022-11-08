const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;
    const messages = await prisma.messages.findMany({
      where: {
        OR: [{
          user1: Number(from),
          user2: Number(to)
        },
        {
          user1: Number(to),
          user2: Number(from)
        }]
      },
      orderBy: {
        created_at: "desc"
      }
    })
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.send_id === Number(from),
        message: msg.message,
      };
    });
    res.json(projectedMessages);
  } catch (ex) {
    next(ex);
  }
};

module.exports.addMessage = async (req, res, next) => {
  try {
    const { from, to, message } = req.body;
    let data = {
      send_id: Number(from),
      user1: Number(from),
      user2: Number(to),
      message: message
    }
    const result = await prisma.messages.create({ data })
    if (result) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    next(ex);
  }
};
