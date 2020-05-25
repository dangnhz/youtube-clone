const express = require('express');
const router  = express.Router()
const multer = require('multer')
const auth = require('../../middleware/auth')
const path = require('path')
const fs = require('fs')
const Video = require('../../models/Video')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
        // console.log(file)
    }
})

var upload = multer({ 
    storage: storage,
    limits: {fileSize: 100000000},
    fileFilter: function(req,file,cb) {
        checkFileType(file,cb)
    } 
}).single("file")

// check file type

function checkFileType(file, cb) {
    const fileTypes = /mov|mp4/
    // check ext
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true)
    } else {
        cb('Error: mp4 file only')
    }
}

// this route handle upload and delete file

router.post('/upload-file', auth, (req, res) => {
    // console.log(req.file.path, req.body)
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({err: err})
        } else {
            res.json({fileUploaded:req.file, body:req.body})
        }
    })
})

router.post('/remove-file',auth, (req, res) => {
    // console.log(req.file.path, req.body)
    fs.unlink(req.body.filePath, function(error) {
        if (error) {
            res.status(400).json({err: error})
        }
        console.log('Deleted file');
        res.status(200).json({msg: 'file removed!'})
    });
})


// handle create video 
//  localhost/api/video

router.post('/', auth, async (req, res) => {
    // const {title, description,secret,category,filePath,author} = req.body.video
    
    if (!req.body.video) return res.status(400).json({error:'Fail to save video'})
    const newVideo= new Video(req.body.video)
    try {
        const saveVideo = await newVideo.save()
        if (!saveVideo) throw Error('Something went wrong when saving the video')

        res.status(200).json({video:saveVideo})


    } catch (err) {
        res.status(400).json({error: err.message})
    }

})

// get all videos from public videos

router.get('/', (req, res) => {

    Video.find({secret:'public'})
        .populate('author')
        .exec((err, videos) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({ videos })
        })

})

// get video by id

router.get('/:id', (req, res) => {
    // Video.findById(req.params.id)
    // .populate('author')
    // .exec((err, video) => {
    //     if (err) return res.status(400).json({err: 'video not found'}) 
    //     res.status(200).json(video)
    // })

    //find and update the number of views

    Video.findByIdAndUpdate({_id:req.params.id}, {view: 1})
    .populate('author')
    .exec((err, video) => {
        if (err) return res.status(400).json({err: 'video not found'}) 
        res.status(200).json(video)
    })

}) 

module.exports = router