import React, { useEffect, useState } from 'react'
import {useParams,useNavigate, Link} from 'react-router-dom';
import { UrlLink } from '../Links';

function Searchdata() {
    const history=useNavigate()
    const [state,setstate]=useState([])
    const {id}=useParams()
    useEffect(() => {
        fetch('http://localhost:4000/getblog',{
            method:'GET',
          }).then((res)=>{
          res.json().then((get)=>{
            const val=get.result.filter((obj)=>{
               return obj.title.includes(id)
           })
           if(val){
            setstate(val)
           }else{
            history('/')
           }
           
          })
          })
    }, [])
    
  return (
    <div>
    {
        state&&
        state.map((val)=>{
            return(
               <Link to={`/PostPage/${val._id}`} style={{textDecoration:"none",color:'inherit'}}>
                <div class="card ms-5 mt-5" style={{width: "18rem",height:"25rem",overflow:'auto'}}>
                <img src={`${UrlLink}/${val.image}`} class="card-img-top" alt="..."/>
                <div class="card-body">
                  <h5 class="card-title">{val.title}</h5>
                  <p class="card-text">{val.summary}</p>
                </div>
              </div>
               </Link>
            )
        })
    }
    </div>
  )
}

export default Searchdata