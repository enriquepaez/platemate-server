const User = require("../models/User.model")

const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const verifyToken = require("../middlewares/auth.middleware")

// POST "/api/auth/signp" => recibe credenciales del usuario y lo crea en la DB
router.post("/signup", async (req, res, next) => {

  console.log(req.body)
  const { username, email, password, image } = req.body

  // 1. Los campos son obligatorios
  if (!username | !email | !password) {
    res.status(400).json({ message: "All fields are required" })
    return
  }

  // 2. La contraseña debe ser suficientemente segura
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm
  if (regexPassword.test(password) === false) {
    res.status(400).json({ message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and be between 8 and 16 characters long" })
    return
  }

  // 3. El email debe tener una estructura correcta
  const regexEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  if (regexEmail.test(email) === false) {
    res.status(400).json({ message: "A valid email address must be entered" })
    return
  }

  try {

    // 4. No haya otro usuario con el mismo username
     const foundUserbyUsername = await User.findOne({ username })
     if (foundUserbyUsername) {
      res.status(400).json({ message: "User already registered with that username" })
      return
     }

     // 5. No haya otro usuario con el mismo email
     const foundUserbyEmail = await User.findOne({ email })
     if (foundUserbyEmail) {
      res.status(400).json({ message: "User already registered with that email" })
      return
     }

     const salt = await bcrypt.genSalt(12)
     const hashPassword = await bcrypt.hash(password, salt)

     await User.create({
      username,
      email,
      password: hashPassword,
      image
     })
     res.sendStatus(201)

  } catch (error) {
    next(error)
  }
})

// POST "/api/auth/login" => recibe credenciales de usuario y lo autentifica. Envía ese token
router.post("/login", async (req, res, next) => {

  const { email, password } = req.body
  console.log(email, password)

  // 1. Validar que todos los campos tengas información
  if (!email || !password) {
    res.status(400).json({ message: "All fields are required" })
    return
  }

  try {

    // 2. Validar que el usuario exista en la DB
    const foundUser = await User.findOne({ email })
    console.log(foundUser)
    if (!foundUser) {
      res.status(400).json({ message: "User not found with that email" })
      return
    }

    // 3. Validar que la contraseña sea correcta
    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password)
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Wrong password" })
      return
    }

    // 4. Enviarle al usuario su token tras la validación
    const payload = {
      _id: foundUser._id,
      email: foundUser.email
      // cualquier propiedad que identifique al usuario o le dé poderes especiales debe estar aquí
    }

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d"
    })

    res.status(200).json({ authToken })

  } catch (error) {
    next(error)
  }
})

// GET "/api/auth/verify" => recibe el token y lo valida. Ruta para cuando el usuario vuelve a la app
router.get("/verify", verifyToken, (req, res) => {

  console.log(req.payload)
  //! de ahora en adelante cada ruta que use el middleware verifyToken tendrá acceso a saber quién es el usuario que hace las llamadas (req.payload)

  res.status(200).json(req.payload)
  //! con esto el frontend sabe quién es el usuario que está navegando por la web
})

module.exports = router