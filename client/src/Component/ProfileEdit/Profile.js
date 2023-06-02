import React, { useEffect, useState } from 'react'
import './Profile.css'
import { UrlLink } from '../../Links'
import { useNavigate } from 'react-router-dom'
function Profile() {
const history=useNavigate()
const [newname, setnewname] = useState('')
const [email, setemail] = useState('')
const [pass, setpass] = useState('')
const [id, setid] = useState('')
    useEffect(() => {
     fetch(`${UrlLink}/editprofile`,{
        method:'GET',
        credentials:'include'
     }).then((res)=>{
        res.json().then((data)=>{
setnewname(data.fname)
setemail(data.email)
setpass(data.pass)
setid(data._id)
        })
     })
    },[])
    

  return (
    <section className='Formsection'>

        <div className='container'>
       <form className="Profile-Form">
       <div className="input-form">
       <input type="text" class="form-control" defaultValue={newname}  name="title" placeholder="Title" onChange={(e)=>{setnewname(e.target.value)}} required/>
            <label htmlFor="">Name</label>
        </div>
              
        <div className="input-form">
            <input type="email" defaultValue={email} onChange={(e)=>{setemail(e.target.value)}} />
            <label htmlFor="">Email</label>
        </div>

        <div className="input-form">
            <input type="password" />
            <label htmlFor="">Password</label>
        </div>

        <div className='input-btn'>
           <button onClick={(e)=>{
            e.preventDefault()
            console.log(newname);
            console.log(email);
            fetch(`${UrlLink}/editprofile`,{
                headers:{'Content-Type':'application/json'},
                method:'PUT',
                credentials:'include',
                body:JSON.stringify({newname,email,id})
            }).then((res)=>{
                res.json().then((Data)=>{
                    if(Data){
 history('/')
                    }
                })
            })
           }}>Update</button>
        </div>
       </form>
    </div>
    </section>
  )
}

export default Profile