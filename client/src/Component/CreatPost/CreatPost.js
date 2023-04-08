import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import FormData from 'form-data'
import 'react-quill/dist/quill.snow.css';

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
function CreatPost() {

   useEffect(() => {
   fetch('http://localhost:4000/checkjwt',{
        method:'GET',
        credentials:'include'
   }).then((res)=>{
    res.json().then((data)=>{
if(data.responses){

}else{
  history('/login')
}
    })
   })
  }, [])
  

  const history=useNavigate()

    const [title, settitle] = useState('')
    const [summary, setsummary] = useState('')
    const [content, setcontent] = useState('')
    const [image, setimage] = useState('')
    const [errors,seterrors]=useState('')
async function handleblogsubmit(e){
e.preventDefault()
const data = new FormData()
data.set('image',image)
data.set('title',title)
data.set('summary',summary)
data.set('content',content)
console.log(data);
try{
  await fetch('http://localhost:4000/Blogpost',{
    method:'POST',
    body:data,
    credentials:'include'
}).then((res)=>{
 res.json().then((data)=>{
console.log(data);
if(data.responses){
  history('/')
}else{
  seterrors(data.result)}
 })
})
}catch(err){
alert(err)
}
}

  return (
    <div>
        <div class="container">
  <div class="row ">
    <div class="col-md-12 mt-5">
      <form  onSubmit={handleblogsubmit}>
        <br></br>
        <div class="form-group">
        <label> BLOG title </label>
          <input type="text" class="form-control" value={title} onChange={(e)=>{settitle(e.target.value)}} name="title" placeholder="Title" required/>
        </div>
        <br></br>
        <div class="form-group">
        <label> BLOG summery </label>
          <input type="summery" class="form-control" name="summery" value={summary} onChange={(e)=>{setsummary(e.target.value)}} placeholder="summery" required/>
        </div>
        <br></br>
        <div class="form-group">
        <label> image </label>
          <input type="file" class="form-control" name="summery" onChange={(e)=>{setimage(e.target.files[0]);seterrors(false)}} placeholder="image" required />
        </div>
        <br></br>
        {
        image ?  
         
        <div className="logo">
        <img src={ URL.createObjectURL(image)} width="200" height="150" />
      </div>
    
    :
    null 
        }
        <br></br>
        <ReactQuill theme="snow" value={content} onChange={setcontent} modules={modules} formats={formats}>

        </ReactQuill >
        <br></br>
        <div class="form-group">
           <button name="Submit" value="Publish" class="btn btn-primary form-control" >Publish</button>
        </div>
        {
          errors ? <p>{errors}</p> : null
        }
      </form>
    </div>
  </div>
</div>
    </div>
  )
}

export default CreatPost