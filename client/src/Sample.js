import React from 'react'
import Cookies from 'js-cookie';

function Sample() {
  return (
    <div>
     <button onClick={()=>{
        console.log(Cookies.get('token'));
     }}>click</button>
    </div>
  )
}

export default Sample