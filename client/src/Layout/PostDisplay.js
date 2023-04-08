import React, { useEffect, useState } from 'react'
import PostPage from '../Component/PostPage/PostPage'
import Header from '../Component/Header/Header'
import { UrlLink } from '../Links'
import { useNavigate } from 'react-router-dom'

function PostDisplay() {

  const [userid,setuserid ] = useState('')

  useEffect(()=>{
    fetch(`${UrlLink}/checkjwt`,{
      method:'GET',
      credentials:'include'
    }).then((data)=>{
      data.json().then((res)=>{
              if(res.responses){
        console.log(res.result.id);
        setuserid(res.result.id)
              }else{
                 
                console.log(res.result);
              }
      })
    })
  },[])
  return (
    <div>
<Header></Header>
<PostPage value={userid} />
    </div>
  )
}

export default PostDisplay