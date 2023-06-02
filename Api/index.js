const express = require('express')
const app = express()
const multer  = require('multer')
const upload = multer({ dest: 'uploads' })
const fs=require('fs')
const cookieparser=require('cookie-parser')
const port = 4000
const path=require('path')
const jwt=require('jsonwebtoken')
const userinfo=require('./Datastorage/Storage')
const cors=require('cors')
const db=require('./Config/Connection')
app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
app.use(express.json())
app.use('/uploads',express.static((__dirname+'/uploads')))
app.use(cookieparser())
db.connect((cb)=>{
if(cb){
  console.log("err");
}else{
  console.log("database comnected");
}
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register',(req,res)=>{
  console.log(req.body);
  userinfo.adduser(req.body).then((response)=>{
   console.log(response);
   if(response.status){
     res.status(200).json(response)
   }else if(response.status==false){
    res.status(400).json(response)
   }
  }).catch((err)=>{
    console.log(err);
  })
})

app.post('/login',(req,res)=>{
userinfo.searchuser(req.body).then((response)=>{
if(response.status){
const det={
  id:response.result._id,
  name:response.result.fname
}
jwt.sign(det,'thisisasceew',{},(err,data)=>{
if(err){
  res.status(400).json({responses:false,result:"login failed"})
}else{
  res.cookie('token',data).json({responses:true,result:"login success",token:data})
  
}
})
}else{
  res.status(400).json({responses:false,result:"username or password is incorrect"})
}
})
})

app.get('/checkjwt',async(req,res)=>{
  console.log(req.cookies.token);
  if(req.cookies.token){
    console.log("entered")
const check= await jwt.verify(req.cookies.token,'thisisasceew')
if(check){
 
  res.status(200).json({responses:true,result:check})
}else{
  res.status(400).json({responses:false,result:"i like your smartness but dont be over smart"})
}
  }else{
    res.status(400).json({responses:false,result:"not logged"})
  }
})


app.post('/logout',(req,res)=>{
res.cookie('token','').json({result:true})
})

app.post('/Blogpost',upload.single('image'),async(req,res)=>{
  console.log(req.body);
  if(req.file){
    console.log(req.file);
    let imageinfo=req.file.originalname
    let formate=imageinfo.split('.')
    console.log(formate[1]);
    if(formate[1]==='jpg' || formate[1]==='png'){
     await fs.renameSync(req.file.path,req.file.path+'.'+formate[1])
     const check= await jwt.verify(req.cookies.token,'thisisasceew')
     let data={
      id:check.id,
      createdat: new Date(),
      image:req.file.path+'.'+formate[1],
      title:req.body.title,
      summary:req.body.summary,
      content:req.body.content
     }
     userinfo.blogposts(data).then((valuegot)=>{
      
      res.status(200).json({responses:true,result:'data uploaded'})
     })
    }else{
   fs.unlink(req.file.path,(err)=>{
    if(err){
      throw err
    }else{
      res.status(400).json({responses:false,result:'image format is not supported'})
    }
   })
    }
  }else{
   console.log("er");
  }
  })

app.get('/getblog',(req,res)=>{
  console.log("hs");
  userinfo.getdata().then((data)=>{
   res.status(200).json({result:data})
  })
})

app.get('/PostPage/:id',(req,res)=>{
  console.log(req.params.id);
userinfo.PostData(req.params.id).then((data)=>{
res.json({result:data})
})
})

app.post('/PostPage/:id',(req,res)=>{
 console.log(req.params.id);
userinfo.updatedata(req.params.id,req.body.comments,req.body.name).then((val)=>{
 res.json({val})
})
})

app.get('/editpost/:id',(req,res)=>{
  userinfo.blogs(req.params.id).then((data)=>{
res.json({result:data})
  })
  
})

app.put('/updateone/:ids',upload.single('image'),async(req,res)=>{
var go=true
var imagepath=null
 if(req.file){
  let imageinfo=req.file.originalname
  let formate=imageinfo.split('.')
     if(formate[1]==='jpg' || formate[1]==='png'){  
      imagepath =req.file.path+'.'+formate[1];
     fs.renameSync(req.file.path,req.file.path+'.'+formate[1])
          }else{
            fs.unlink(req.file.path,(err)=>{
            if(!err){
              go=false
              res.status(400).json({responses:false,result:'image format is not supported'})
            }else{   
              throw err
            }
               })
              }
              }
            userinfo.updateblog(req.params.ids,req.body,imagepath).then(()=>{
              console.log("two");
              res.status(200).json({responses:true,result:'blog updated'})
            })
})

app.delete('/deletblog/:id',(req,res)=>{
userinfo.blogdelet(req.params.id).then(()=>{
  res.status(200).json({result:"delet success"})
})
})

app.post('/addtofav',(req,res)=>{
console.log(req.body);
userinfo.addtofav(req.body)
})

app.get('/addtofav',async(req,res)=>{
  console.log(req.cookies.token);
  if(req.cookies.token){
    let data= await jwt.verify(req.cookies.token,'thisisasceew')
    userinfo.getwishlist(data.id).then((data)=>{
     console.log(data);
     res.status(200).json(data)
    })
  }else{
    res.status(500).json('not signed in')
  }
})

app.get('/editprofile',async(req,res)=>{
  if(req.cookies.token!==''){
    console.log(req.cookies);
   const data=await jwt.verify(req.cookies.token,'thisisasceew')
   console.log(data.id);
   userinfo.Editprofile(data.id).then((responses)=>{
    console.log(responses);
    res.status(200).json(responses)
   })
  }else{
  res.status(400).json()
  }

})

app.put('/editprofile',(req,res)=>{
  userinfo.EditNow(req.body).then((data)=>{
    const det={
      id:data._id,
      name:data.fname
    }
    console.log(det);
    jwt.sign(det,'thisisasceew',{},(err,cookiedata)=>{
    if(err){
      res.status(400).json(false)
    }else{
      console.log("working");
      res.cookie('token',cookiedata).json(true)

    }
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})