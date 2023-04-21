import React, { useContext, useEffect, useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UrlLink } from '../../Links'
import { Usercontext } from '../../Context/UserContext'
import { BlogContext } from '../../Context/Blog'
import './Header.css'
function Header() {

  const [search,setsearch]=useState([])
  const {user,setuserinfo}=useContext(Usercontext)
  const {blogcontexts,setblogcontexts}=useContext(BlogContext)
const history=useNavigate()

function handlesaerch(event){
const names= blogcontexts.filter((obj)=>{
return(
  obj.title.toLowerCase().includes(event.toLowerCase())
)
})
console.log(names);
if(event){
  setsearch(names)
}else{
  setsearch('')
}
}

  const [userdetails, setuserdetails] = useState('')
  useEffect(() => {
   fetch(`${UrlLink}/checkjwt`,{
    method:'GET',
    credentials:'include'
   }).then((res)=>{
    res.json().then((val)=>{
      if(val.responses){
        console.log(val.result);
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
   <div className='ms-5 me-5'>
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
</svg>
   </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <Link className='nav-link' to='/wishlist' >wishlist</Link>
        </li>
        
      </ul>

      {
        userdetails ?
        <>
        <Link  className='nav-link me-3 my-3'>{userdetails.name}</Link>

       <div className='profile'>
        <div class="dropdown">
        <img class="dropbtn" src="https://img.icons8.com/material-sharp/256/parse-resumes.png" alt="" />
         <div class="dropdown-content">
         <Link to='/createpost' className='nav-link me-3 '>create</Link>
         <Link to='/Editprofile' className='nav-link me-3 '>Edit profile</Link>
         <Link onClick={()=>{
          fetch('http://localhost:4000/logout',{
            method:'POST',
            credentials:'include'
          }).then(()=>{
            setuserinfo(null)
           setuserdetails(null)
           window.location.reload()
          })
        }} className='nav-link me-3'>logout</Link>
        </div>
         </div>
       </div>
        </>
         : 
         <>
         <Link to='/register' className='nav-link me-3 my-3'>register</Link>
           <Link to='/login' className='nav-link me-5 my-3'>login</Link>
         </>
      }
        
     <div className='search'>
     <form  class="d-flex" role="search">
        <input class="form-control me-2" type="search"  onChange={(e)=>{handlesaerch(e.target.value)}} placeholder="Search" aria-label="Search"/>
        <div className='searchbox'>
           {
            search&&
          search.map((obj)=>{
              return(
                <Link style={{textDecoration:"none",color:'black'}} to={`/searchdata/${obj.title}`} >{obj.title}</Link>
              )
            })
           }
        </div>
      </form>
     </div>
       
    </div>
  </div>
</nav> 
    </div>
  )
}

export default Header