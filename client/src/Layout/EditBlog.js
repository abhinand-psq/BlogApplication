import React, { useEffect } from 'react'
import Header from '../Component/Header/Header'
import EditPost from '../Component/EditPage/EditPost'
import { UrlLink } from '../Links'
import { useNavigate } from 'react-router-dom'

function EditBlog() {
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
                    history('/')
                    console.log(res.result);
                  }
          })
        })
      },[])

  return (
    <div>
        <Header></Header>
        <EditPost></EditPost>
    </div>
  )
}

export default EditBlog