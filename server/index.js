const express = require('express')
const cors = require('cors')
const mongoose  = require("mongoose")
const dbURI = require('./config/key')
const auth = require('./middleware/auth')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000 

mongoose.connect(dbURI.mongoURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('database is conntected.'))
.catch(err => console.log(err))
app.use('/uploads', express.static(__dirname +'/uploads'));
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/video', require('./routes/api/video'))

app.get('/', auth, (req, res) => {
    res.status(200).json({msg:"hello fucking world"})
})

app.listen(PORT, () => console.log(`Server running on port ${PORT} `))


