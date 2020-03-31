const express = require("express")
const router  = express.Router()
const User = require('../../../models/User')
const auth = require('../../../middleware/auth')


router.get('/auth', auth, (req, res) => {
  res.json({user: {
    _id: req.user.id,
    username: req.user.username
  }})
} )

router.post('/register', (req, res) => {
  const user = new User(req.body)
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
        success: true,
        user: doc
    });
});
})


router.post('/login', (req, res) => {
  // const user = new User(req.body)
  User.findOne({username: req.body.username}, function(err, user) {
    if(!user) {
      res.json({msg: err})
    } else {
      user.comparePassword(req.body.password, (isMatch) => {
        if (!isMatch) {
          res.json({msg: 'password is wrong'})
        } else {
          user.generateToken(user.id, (token) => {
            if (!token) res.status(403)
            res.status(200).json({
              token: token,
              user: {
                _id: user._id,
                username: user.username
              }
            })
          })
        }
      })
    }
  })

})

module.exports = router;