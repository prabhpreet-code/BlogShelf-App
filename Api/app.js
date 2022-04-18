const express = require("express");
const app = express() ;
const Post=require('./api/models/post');
var multer= require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '/My-Blog-APP/API/uploads')
  },
  filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`)
  }
});

const getExt = (mimetype) => {
  switch(mimetype){
      case "image/png":
          return '.png';
      case "image/jpeg":
          return '.jpg';
  }
}

var upload = multer({storage:storage});
const postsData = new Post() ;

app.use(express.json());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin" , "*") ;
  next() ;
})

app.use("/uploads" , express.static('/My-Blog-APP/API/uploads'));


app.get("/",(req,res)=>{
  res.status(200).send("Hello World");
})

app.get("/api/posts",(req,res)=>{
  res.status(200).send(postsData.get());
})

app.get("/api/posts/:post_id",(req,res)=>{
  const id = req.params.post_id ;
  const finalData= postsData.getIndividualBlog(id)
  if (finalData) {
    res.status(200).send(finalData);
  }

  else{
    res.status(404).send("Not Found");
  }
})

app.post("/api/posts",upload.single('post-image'),(req,res)=>{
  console.log(req.file);
  const arr = req.file.path.split("\\");
    const newPost ={
      "id":`${Date.now()}`,
      "title":req.body.title,
      "content":"This is my content!",
      "post_image":`${arr[3]}/${arr[4]}`,
      "added_date":`${Date.now()}`
    }
    postsData.add(newPost);
    res.status(201).send(newPost) ;
})

app.listen(3000,()=>console.log("Listen on http://localhost:3000"));
