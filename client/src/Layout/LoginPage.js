import React, { useEffect } from 'react'
import Header from '../Component/Header/Header'
import Login from '../Component/Login/Login'
import { UrlLink } from '../Links'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

  const history=useNavigate()
  useEffect(()=>{
    fetch(`${UrlLink}/checkjwt`,{
      method:'GET',
      credentials:'include'
    }).then((data)=>{
      data.json().then((res)=>{
              if(res.responses){
                window.location.reload()
                history(-1)
              }else{
                
              }
      })
    })
  },[])

  return (
    <div>
        <Header></Header>
        <Login></Login>
    </div>
  )
}

export default LoginPage