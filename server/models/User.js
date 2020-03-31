const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
// const jwt = require('jsonwebtoken')

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50
  },
  email: {
      type: String,
      unique: true,
  }
  ,
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  image: {
      type: String,
      default: 'https://www.lajornadadeoriente.com.mx/wp-content/uploads/2018/05/default.jpg'
  }
  , 
  role: {
      type: Number,
      default: 0
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

// userSchema.pre("save", function(next) {
//   let user = this;
//   bcrypt.hash(user.password, saltRounds, function(err, hash) {
//     if (err) return next(err);
//     user.password = hash;
//     next();
//   });
// });

// userSchema.method('comparePassword', function(plainPassword, cb) {
//     bcrypt.compare(plainPassword, this.password, function(err, result) {
//         if (err) return cb(err)
//         else {
//                 cb(result)
            
//         }
//     })

// })

// userSchema.method('generateToken', function(userId, cb) {
//     console.log(userId)
//  jwt.sign({userId}, 'secretKey',{ expiresIn: '1h' }, function(err, token){
//      if (err) return cb(err)
//      cb(token)
//  })

// })



const User = mongoose.model("User", userSchema);

module.exports = User;
