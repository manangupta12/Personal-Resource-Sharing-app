const express = require("express");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodoverride = require("method-override");
const bodyParser = require("body-parser");

const app = express();


app.set("view engine","ejs");
//app.use(bodyParser.json);
app.use(methodoverride("_method"));

const mongoURI = "mongodb+srv://manan:manan@cluster0-yiw6j.mongodb.net/test?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI);

let gfs;
conn.once('open',()=>{
    gfs = Grid(conn.db,mongoose.mongo);
    gfs.collection("uploads");
})

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });
const upload = multer({ storage });


app.get("/",function(req,res){
    res.render("index")
})

app.post("/upload",upload.single("file"),function(req,res){
    res.redirect("/");
})

app.get("/files",function(req,res){
    gfs.files.find().toArray((err,files)=>{
        if(!files || files.length===0){
            return res.status(404).json({
                err: "No files exists"
            });
        }
        return res.json(files);
    })
});

app.get("/files/:filename",function(req,res){
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
        if(!file || file.length===0){
            return res.status(404).json({
                err : "No file found"
            })
        }
        return res.json(file);
    });
});

app.get("/image/:filename",function(req,res){
    gfs.files.findOne({filename:req.params.filename},(err,file)=>{
        if(!file || file.length===0){
            return res.status(404).json({
                err : "No file found"
            })
        }
        if(file.contentType==="image/png" || file.contentType==="image/jpeg"){
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        }
        else{
            res.status(404).json()({
                err : "Not an Image"
            });
        }
    });
});



app.listen(8000,function(err){
    console.log("Server running at 8000 !!")
})