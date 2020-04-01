const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const accessToken = require("../../config/accessToken");
const auth = require('../../middleware/auth')
const {registerValidation, loginValidation} = require('../../middleware/validator')

/**
 * @route   POST api/users
 * @desc    Register new user
 * @access  Public
 */
router.post("/register",registerValidation, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(saltRounds);
    if (!salt) throw Error("Something went wrong when generating salt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong when hashing password");
    const newUser = User({
      name,
      email,
      password: hash
    });

    const saveUser = await newUser.save();
    if (!saveUser) throw Error("Something went wrong when saving the user");
    res.status(200).json({
      user: {
        id: saveUser._id,
        name: saveUser.name,
        email: saveUser.email,
        date: saveUser.date
      }
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post('/login',loginValidation, async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    try {
        const user = await User.findOne({ email }).select('+password') //make sure gott password from database
         if (!user) throw Error('User does not exist')
         // compare password
         const isMatch = await bcrypt.compare(password, user.password);
         if (!isMatch) throw Error('Invalid credentials');

        const token = jwt.sign({ id: user.id }, accessToken.secretKey, {
            expiresIn: "30d"
          });

        if (!token) throw Error('Couldnt sign the token');
        
          res.status(200).json({
            token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                image: user.image,
                date: user.date
            }
        })
    } catch (e) {
        res.status(400).send({error: e.message})
    }
})

router.get('/user',auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) throw Error('User does not exist');
        res.status(200).json({user: user})
    } catch (e) {
        res.status(400).send({msg: e.message})
    }
})

module.exports = router;
