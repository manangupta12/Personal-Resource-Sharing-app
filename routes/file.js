
const middleware = require("../middleware/index");
const express = require("express");
const router = express.Router({mergeParams:true});
const File = require("../models/files")
const gfs = File.gfs;
const upload = File.upload;

router.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});

//========>>>>>>>>>>>>>>> routes <<<<<<<<<<<<<<<<<<<<=======================================

router.get('/',middleware.isLoggedIn, (req, res) => {
    gfs.files.find().toArray((err, files) => {
      // Check if files
      if (!files || files.length === 0) {
        res.render('index', { files: false , currentUser:req.user});
      } else {
        files.map(file => {
            file.isImage = false;
            file.isPdf = false;
            file.isWord = false;
          if (
            file.contentType === 'image/jpeg' ||
            file.contentType === 'image/png'
          ) file.isImage = true;
          if (
              file.contentType === 'application/pdf'
            ) file.isPdf = true;
          if (
          file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          ) file.isWord = true;
        });
        res.render('index', { files: files, currentUser:req.user});
      }
    });
});

router.post('/upload',middleware.isLoggedIn,upload.single('file'),(req, res) => {
    // res.json({ file: req.file });
    res.redirect('/');
  });
  
  // @route GET /files
  // @desc  Display all files in JSON
router.get('/all', (req, res) => {
gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
    return res.status(404).json({
        err: 'No files exist'
    });
    }

    // Files exist
    return res.json(files);
});
});
  
//   // @route GET /files/:filename
//   // @desc  Display single file object
//   app.get('/:filename', (req, res) => {
//     gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//       // Check if file
//       if (!file || file.length === 0) {
//         return res.status(404).json({
//           err: 'No file exists'
//         });
//       }
//       // File exists
//       return res.json(file);
//     });
//   });
  
  // @route GET /image/:filename
  // @desc Display Image
  router.get('/image/:filename',middleware.isLoggedIn, (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: 'No file exists'
        });
      }
  
      // Check if image
      if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }
    });
  });
  
  
  router.get('/pdf/:filename',middleware.isLoggedIn, (req, res) => {
      gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists'
          });
        }
    
        // Check if image
        if (file.contentType === 'application/pdf') {
          // Read output to browser
          const readstream = gfs.createReadStream(file.filename);
          readstream.pipe(res);
        } else {
          res.status(404).json({
            err: 'Not a pdf'
          });
        }
      });
    });
  
router.get('/:fileName/show',middleware.isLoggedIn, (req, res) => {
      gfs.files.findOne({filename:req.params.fileName},(err, file) => {
        if (!file || file.length === 0) {
          return res.status(404).json({
            err: 'No file exists'
          });
        }
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      });
    });

    router.delete('/files/:id',middleware.isLoggedIn, (req, res) => {
    gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
      res.redirect('/');
    });
  });

module.exports = router;
  