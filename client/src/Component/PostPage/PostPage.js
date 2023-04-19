import React, { useContext, useEffect, useState } from 'react'
import { UrlLink } from '../../Links'
import { useParams ,useNavigate} from 'react-router-dom'
import './PostPage.css'
import { useCookies } from "react-cookie";
import { Usercontext } from '../../Context/UserContext'
import Header from '../Header/Header';
function PostPage(props) {
  
const history=useNavigate()
  const {user,setuserinfo}=useContext(Usercontext)

  function handleedit(id){
    console.log(id);
    history(`/editpost/${id}`,{
      method:'DELETE'
    })
  }

  function handledelet(id){
    fetch(`${UrlLink}/deletblog/${id}`,{
      method:'DELETE'
    }).then((res)=>{
      res.json().then((data)=>{
        window.location.reload()
         history('/')
      })
    })
  }
  const [cookies, setCookie] = useCookies();
      const [cmt,setcmnt]=useState([])
    const [comments,setcomment]=useState('')
    const [datas,setdatas] = useState([])
    const {id}=useParams()
    useEffect(() => {
      try{
        fetch(`${UrlLink}/PostPage/${id}`,{
          method:'GET',
          credentials:'include'
        }).then((res)=>{
          res.json().then((responses)=>{
            console.log(responses.result.length);
            if(responses.result.length===0){
              history('/')
            }else{
              console.log(responses.result[0]);
              setdatas(responses.result[0])
              setcmnt(responses.result[0].comments)
              console.log(user);
              console.log(responses.result[0].id);
            }
          })
        })
      }catch(e){
       history('/')
      }
    },[])
  



  return (
   <div>
    
    <div className='container px-5'>
       <h2 className='headtxt'>{datas ? datas.title : null}</h2>
       <div>
    
       <div className="image">
       <img className='MainImage' src={datas ? `${UrlLink}/${datas.image}` : null} class="img-fluid "   alt=""/>
        </div>
       </div >
       <div className='text-center'>

       {
        
         props.value === datas.id ? 
        <button onClick={()=>{handleedit(datas._id)}} style={{display:'inline-flex',alignItems:'center',gap:'8px',height:'33px'}} className='btn btn-danger me-4'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
        </svg>
         </button>: null
       }
     
  
      {
        props.value  === datas.id  ?
        <button onClick={()=>{handledelet(datas._id)}} style={{display:'inline-flex',alignItems:'center',gap:'8px',height:'33px'}} className='btn btn-danger '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
       </svg>
        </button> : null
      }

        </div>
       <div className=''>
       <div className='maincontent' style={{}} dangerouslySetInnerHTML={{__html:datas ? datas.content : null}}></div>
       </div>
       <div>
<section className='section2'>
<div className='container'>
   {
    user &&
    <div > 
    <input type="text" name="text" value={comments} onChange={(e)=>{setcomment(e.target.value)}} placeholder="+ Add a note" class="form-control addtxt"/>
     </div>
   }
  {
comments ?
<div class="inpbut">
    <button onClick={()=>{
       fetch(`${UrlLink}/PostPage/${datas._id}`,{
           method:'POST',
           body:JSON.stringify({comments,name:user.name}),
           headers:{'Content-Type':'application/json'},
           credentials:'include'
        }).then((val)=>{
            setcomment('')
            val.json().then((cmnt)=>{
                console.log(cmnt);
              setcmnt(cmnt.val)

            })
        })
       }} className="btn btn-danger">+</button>
    </div>
:null
  }
    
    </div>
</section>
   {
    cmt?
    cmt.map((obj)=>{
        return(
           <div id='cmnt'>
             <div  class="d-flex justify-content-center  py-2">
            <div class="second py-2 px-2"> <span class="text1">{obj.comnts}</span>
                <div class="d-flex justify-content-between py-1 pt-2">
                    <div><span class="text3">{obj.name}</span><span class="thumbup"><i class="fa fa-thumbs-o-up"></i></span><span class="text4"></span></div>
                </div>
            </div>
        </div>
           </div>
        )
    }) : null
   } 


</div>
       </div>
    
   </div> 
  )
}

export default PostPage