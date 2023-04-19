import React, { useEffect } from 'react'
import Profile from '../Component/ProfileEdit/Profile'
import Header from '../Component/Header/Header'
import { UrlLink } from '../Links'
import { useNavigate } from 'react-router-dom'

function Edit() {
  const history=useNavigate()
  useEffect(()=>{
    fetch(`${UrlLink}/checkjwt`,{
      method:'GET',
      credentials:'include'
    }).then((data)=>{
      data.json().then((res)=>{
              if(res.responses){
        console.log(res.result.id);
              }else{
                window.location.reload()
                 history(-1)
                console.log(res.result);
              }
      })
    })
  },[])

  return (
    <div>
        <Header></Header>
        <Profile></Profile>
    </div>
  )
}

export default Edit