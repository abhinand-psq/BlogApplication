var db=require('../Config/Connection')
const bcrypt=require('bcrypt')
const mongodb=require('mongodb')
const objectid=mongodb.ObjectId

module.exports={
adduser:(data)=>{
return new Promise((res,rej)=>{
    db.get().collection('users').findOne({email:data.email}).then(async(ress)=>{
        if(ress!=null){
            res({status:false,result:'user already exist'})
        }
else if(ress==null){
data.pass = await bcrypt.hash(data.pass,10)
db.get().collection('users').insertOne(data).then((result) => {
res({status:true,result})
}).catch((error)=>{
    res(error)
})
}
 })
})
},
searchuser:(data)=>{
 
    let response={
       status:null,
       result:null
    }

    return new Promise((res,rej)=>{
        db.get().collection('users').findOne({email:data.email}).then(async(retrundata)=>{
           if(retrundata!=null){
             const compared=await bcrypt.compare(data.pass,retrundata.pass)
             if(compared){
                response.status=true
                response.result=retrundata
            res(response)
             }else{
                response.status=false
            res(response)
             }
           }else{
            response.status=false
            res(response)
           }
        })
    })
},
blogposts:(data)=>{
return new Promise((res,rej)=>{
db.get().collection('blogdata').insertOne(data).then((data)=>{
res(data)
})
})
},
getdata:()=>{
   return new Promise(async(res,rej)=>{
    const datas=await db.get().collection('blogdata').aggregate([
        {
            $addFields: {
              id: {
                $toObjectId: "$id"
              }
            }
          },
        {
            $lookup:
              {
                from: "users",
                localField: "id",
                foreignField: "_id",
                as: "userinfo"
              }
         },{$unwind:'$userinfo'},{$sort : { createdat  : -1 }},{ $limit : 10 } ])
         .toArray()
        console.log(datas);
   res(datas)
   })
},


PostData:(blogid)=>{
  return new Promise(async (res,rej)=>{
    const datas=await db.get().collection('blogdata').aggregate([{$match:{_id:new objectid(blogid)}},
      {
        $addFields: {
          id: {
            $toObjectId: "$id"
          }
        }
      },
      {
        $lookup:
          {
            from: "users",
            localField: "id",
            foreignField: "_id",
            as: "userinfo"
          }
     },{$unwind:'$userinfo'},{$project:{_id:1,id:1,createdat:1,image:1,title:1,summary:1,content:1,comments:1,'userinfo._id':1,'userinfo.fname':1,'userinfo.email':1}}
    ]).toArray()
    console.log(datas);
    res(datas)
    
})
},
updatedata:(blogid,comnts,name)=>{
return new Promise(async(res,rej)=>{

const avail=await db.get().collection('blogdata').findOne({_id:new objectid(blogid)})
if(avail.comments){
  
  db.get().collection('blogdata').updateMany({_id:new objectid(blogid)},{$push:{"comments":{comnts,name}}}).then((responses)=>{
    if(responses.modifiedCount==1 && responses.matchedCount==1){
      db.get().collection('blogdata').findOne({_id:new objectid(blogid)}).then((values)=>{
      res(values.comments)
      })
    }
  })



}else{
  db.get().collection('blogdata').updateMany({_id:new objectid(blogid)}, {$set: {"comments":[{comnts,name}] }}).then((response)=>{
    if(response.modifiedCount==1 && response.matchedCount==1){
      db.get().collection('blogdata').findOne({_id:new objectid(blogid)}).then((values)=>{
       res(values.comments)
      })
    }
 })
}

})
},
blogs:(blogid)=>{
  return new Promise((res,rej)=>{
db.get().collection('blogdata').findOne({_id:new objectid(blogid)}).then((data)=>{
  res(data)
})
  })
},
updateblog:(blogid,data,imageid)=>{
  console.log(blogid);
  if(imageid!=null){
    console.log("yes hooo");
    console.log(imageid);
    return new Promise((res,rej)=>{
      db.get().collection('blogdata').updateOne({_id:new objectid(blogid)},{$set:{image:imageid,title:data.title,summary:data.summary,content:data.content}}).then((response)=>{
        console.log(response);
        res(response)
      })
    })
  }else{
    console.log("else");
    return new Promise((res,rej)=>{
      db.get().collection('blogdata').updateOne({_id:new objectid(blogid)},{$set:{title:data.title,summary:data.summary,content:data.content}}).then((responses)=>{
        console.log(responses);
        res(responses)
      })
    })
  }
},
blogdelet:(blogid)=>{
return new Promise((response,reject)=>{
db.get().collection('blogdata').deleteOne({_id:new objectid(blogid)}).then((res)=>{
response(res)
})
})
},
addtofav:(reqbody)=>{
  return new Promise(async(res,rej)=>{
    let avail= await db.get().collection('favorite').findOne({userid:reqbody.userid})
    console.log(avail);
    if(!avail){
      let favarray={
        userid:reqbody.userid,
        blogs:[reqbody.blogid]
      }
      db.get().collection('favorite').insertOne(favarray).then((data)=>{
        res(data)
      })
    }else{
      db.get().collection('favorite').updateOne({userid:reqbody.userid},{$push:{ blogs : reqbody.blogid }}).then((data)=>{
        res(data)
      })
    }
  })
},
getwishlist:(userinfo)=>{
  return new Promise(async(res,rej)=>{
let datas=await db.get().collection('favorite').aggregate([
  
  {
  $match:{
    userid:userinfo
  }
  },
  {$unwind : '$blogs'},
  {
    $addFields: {
      id: {
        $toObjectId: "$blogs"
      }
    }
  },
  {
    $lookup:{
      from: "blogdata",
      localField: "id",
      foreignField: "_id",
      as: "Wishlist"
    },
  },
  {
    $project:{
       Wishlist:1
    }
  },{
    $unwind:'$Wishlist'
  }
]).toArray()

res(datas)
  })
},
Editprofile:(objId)=>{
  return new Promise((res,rej)=>{
    db.get().collection('users').findOne({_id:new objectid(objId)}).then((data)=>{
          res(data)
    })
  })
},
EditNow:(data)=>{
  return new Promise((res,rej)=>{
    db.get().collection('users').updateOne({_id:new objectid(data.id)},{
      $set:{
        fname:data.newname,
        email:data.email
      }
    }).then((da)=>{
      console.log(da);
      db.get().collection('users').findOne({_id:new objectid(data.id)}).then((value)=>{
        res(value)
  })
    })
  })
}
}