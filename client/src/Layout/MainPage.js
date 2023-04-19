import React, { useContext, useState } from 'react'
import Header from '../Component/Header/Header'
import Page from '../Component/Page/Page'
import { useEffect } from 'react'
import { BlogContext } from '../Context/Blog'

function MainPage() {
  const {blogcontexts,setblogcontexts}=useContext(BlogContext)
 const [maindata,setmaindata]=useState([])
useEffect(()=>{
fetch('http://localhost:4000/getblog',{
  method:'GET',
}).then((res)=>{
res.json().then((get)=>{
  setmaindata(get.result)
  setblogcontexts(get.result)
})
})
},[])

  return (
    <div>
        <Header></Header>
        <br></br>
        <h1  style={{textAlign : "center"}} >Blog</h1>
        <br></br>
        {
          maindata ? 
          maindata.map((obj)=>{
            return(

              <Page {...obj} />
            )
          })
          :null
        }
        
    </div>
  )
}

export default MainPage