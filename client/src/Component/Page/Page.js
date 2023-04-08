import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UrlLink } from '../../Links'
function Page({_id,id,createdat,image,title,summary,content,userinfo}) {
const history=useNavigate()

  return (
    <div>
           <section id="aboutus">
<div class="section3">
  <div class="container">
    <div class="row align-items-center">


      <div class="col-lg-6 col-12 mt-5">
        <div class=" border-0 ">
          <img src={`${UrlLink}/${image}`} class="img-fluid w-100 "  alt=""/>
        </div>
      </div>
      <div class="col-lg-6 col-12 ">
        <h1 class="text-center  mt-5 " id="takeaway">{title}</h1>
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