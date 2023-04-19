import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UrlLink } from '../../Links'
import './Page.css'
import { Usercontext } from '../../Context/UserContext'

function Page({_id,id,createdat,image,title,summary,content,userinfo}) {
const history=useNavigate()
const {user,setuserinfo}=useContext(Usercontext)
 const userid=user ? user.id : null;
function addtofav(blogid){
fetch('http://localhost:4000/addtofav',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({blogid,userid})
})
}


  return (
    <div>
           <section id="aboutus">
<div class="section3">
  <div class="container">
    <div class="row align-items-center">


      <div className="images col-lg-6 col-12 mt-5 ">
        <div class=" border-0 ">
          <img src={`${UrlLink}/${image}`} class="img-fluid w-80 "  alt=""/>
        </div>
      </div>
      <div class="col-lg-6 col-12 ">
        <h1 class="text-center  mt-5 " id="takeaway">{title}</h1>
        <div className='position-relative'>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{addtofav(_id,id)}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="position-absolute top-0 end-0">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
</svg>
        </div>
        <p id="p" class="text-center">────── {createdat} ───────</p>
        <h6 class="text-center  "><b class="aboutour">{userinfo.fname}</b></h6>
        <p class=" text1 mt-1 text-center">{summary} </p>
        <div class="text-center">
        <button type="button" onClick={()=>{history(`/PostPage/${_id}`)}} class="btn btn-danger  mt-2">learn more</button>
      </div>
      </div>
     

    </div>
  </div>
</div>
    </section>



    </div>
  )
}

export default Page