import React, { useEffect, useState } from 'react'
import Header from '../Component/Header/Header'
import Fav from '../Component/Fav'

function Wishlist() {
const [data,setdata]=useState([])
const [err,seterror]=useState()
    useEffect(()=>{
     fetch('http://localhost:4000/addtofav',{
        method:'GET',
        credentials:'include'
     }).then((res)=>{
        res.json().then((data)=>{
          if(data.length!==0){
            console.log(data[0].Wishlist.summary);
            setdata(data)
          }else{
            seterror(true)
          }
        })
     })
    },[])

if(err){
return(
    <h1>no wishlist</h1>
)
}else{
    return (
        <div>
            <Header></Header>
           {
          data.map((obj)=>{
            return(
                <Fav  {...obj.Wishlist} />
            )
          })
           }
        </div>
      )
}

}

export default Wishlist