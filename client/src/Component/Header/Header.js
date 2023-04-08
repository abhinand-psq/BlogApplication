import React, { useContext, useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UrlLink } from '../../Links'
import { Usercontext } from '../../Context/UserContext'

function Header() {


  const {userinfo,setuserinfo}=useContext(Usercontext)
const history=useNavigate()


  const [userdetails, setuserdetails] = useState('')
  useEffect(() => {
   fetch(`${UrlLink}/checkjwt`,{
    method:'GET',
    credentials:'include'
   }).then((res)=>{
    res.json().then((val)=>{
      if(val.responses){
        console.log('head working');
        setuserinfo(val.result)
        setuserdetails(val.result)
      }else{
        console.log('head working');
        
setuserdetails(null)
      }
    })
   })
  },[])


  return (
    <div>
       <nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <Link class="navbar-brand" to="/">Blog</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/">Link</a>
        </li>
        
      </ul>

      {
        userdetails ?
        <>
        <Link  className='nav-link me-3'>{userdetails.name}</Link>
        <Link onClick={()=>{
          fetch('http://localhost:4000/logout',{
            method:'POST',
            credentials:'include'
          }).then(()=>{
            setuserinfo(null)
           setuserdetails(null)
           history('/login')
          })
        }} className='nav-link me-3'>logout</Link>
        <Link to='/createpost' className='nav-link me-3'>create</Link>
        </>
         : 
         <>
         <Link to='/register' className='nav-link me-3'>register</Link>
           <Link to='/login' className='nav-link me-5'>login</Link>
         </>
      }
        
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        
      </form>
      
    </div>
  </div>
</nav> 
    </div>
  )
}

export default Header