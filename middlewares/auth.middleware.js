const jwt = require("jsonwebtoken")

function verifyToken(req, res, next) {

  console.log(req.headers)

  try {
    const tokenArr = req.headers.authorization.split(" ")
    const token = tokenArr[1]

    const payload = jwt.verify(token, process.env.TOKEN_SECRET)
    req.payload = payload

    next()
  
  } catch (error) {
    res.status(401).json({ message: "Invalid or missing token" })
  }
}

module.exports = verifyToken
