import React, { useEffect, useState } from 'react'
import './EditPage.css'
import ReactQuill from 'react-quill'
import { UrlLink } from '../../Links'
import { useNavigate, useParams } from 'react-router-dom'
function EditPost() {
  const history=useNavigate()
    const {id}=useParams()
const [error,seterr]=useState('')    
const [userid,setuserid]=useState('')    
const [newimage, setnewimage] = useState('')
const [editsummary,seteditsummary]=useState('')
const [edittitle,setedittitle]=useState('')
const [editcontent,seteditcontent]=useState('')
const [first, setfirst] = useState(false)
const [disables,setdisables]=useState(false)
useEffect(() => {
 fetch(`${UrlLink}/editpost/${id}`,{
    method:'GET'
}).then((res)=>{
   res.json().then((data)=>{
    console.log(data.result);
    setedittitle(data.result.title)
    seteditsummary(data.result.summary)
    seteditcontent(data.result.content)
    setnewimage(data.result.image)
    setuserid(data.result.id)

   })
})  
}, [])


    const modules = {


        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
     const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ]

const hanldeupdate=(e)=>{
e.preventDefault()
let a=newimage.name.split('.')
console.log(newimage);
console.log(a[1]);
if(a[1]==='jpg' || a[1]==='png' || a[1]==='jpeg'){
  alert("working")
  try{
  const newdata=new FormData()
newdata.set('title',edittitle)
newdata.set('summary',editsummary)
newdata.set('content',editcontent)
newdata.set('image',newimage)
newdata.set('id',userid)
fetch(`${UrlLink}/updateone/${id}`,{
method:'PUT',
body:newdata,
credentials:'include'
}).then((res)=>{
  res.json().then((Data)=>{
    console.log(Data);
    if(Data.responses){
      history('/')
      setfirst(false)
    }else{
      seterr(Data.result)
    }
  })
})
}catch(e){
alert('sorry error')
}  
}else{
  alert("not working")
setdisables(true)  
}
}

  return (
    <div>
            <div>
        <div class="container">
  <div class="row ">
    <div class="col-md-12 mt-5">
      <form  onSubmit={hanldeupdate}>
        <br></br>
        <div class="form-group">
        <label> BLOG title </label>
          <input type="text" class="form-control" value={edittitle} onChange={(e)=>{setedittitle(e.target.value)}} name="title" placeholder="Title" required/>
        </div>
        <br></br>
        <div class="form-group">
        <label> BLOG summery </label>
          <input type="summery" class="form-control" name="summery" value={editsummary} onChange={(e)=>{seteditsummary(e.target.value)}} placeholder="summery" required/>
        </div>
        <br></br>
        <div class="form-group">
        <label> image </label>
          <input type="file" class="form-control" name="summery"  onChange={(e)=>{setnewimage(e.target.files[0]);setfirst(true);setdisables(false)
          }} placeholder="image" />
        </div>
        <br></br>
         
        <div className="logo">
          <img src={first ?  URL.createObjectURL(newimage) : `${UrlLink}/${newimage}`}width='200px' ></img>
      </div>
    
   
        <br></br>
        <ReactQuill theme="snow" value={editcontent} onChange={seteditcontent} modules={modules} formats={formats}>

        </ReactQuill >
        <br></br>
        <div class="form-group">
          
            <button name="Submit"value="Publish" class="btn btn-primary form-control" 
            >Edit post</button>
          
        </div>
        {disables ? <h1>image formate must be jpg or png</h1> : null}
       {error ? error : null}
      </form>
    </div>
  </div>
</div>
    </div>
    </div>
  )
}

export default EditPost