import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'
function Register() {

  const history=useNavigate()

 const [fname, setfname] = useState('')
 const [pass, setpass] = useState('') 
 const [email, setemail] = useState('') 
 const [check,usecheck]=useState('')

 const handlesubmit=(e)=>{
e.preventDefault()
 fetch('http://localhost:4000/register',{
  method:'POST',
  body:JSON.stringify({fname,email,pass}),
  headers:{'Content-Type':'application/json'},
}).then((res)=>{
  res.json().then((val)=>{
    console.log(val);
    if(val.status===false){
      usecheck(val.result)
    }else if(val.status){
history('/login')
    }
  })
})
}
  
  return (
    <div>
        <div class="container1">
      <h2 class="login-title">Log in</h2>

      <form className="login-form"  onSubmit={handlesubmit}>
        <div>
          <label for="name">Name </label>
          <input
            id="name"
            type="text"
            placeholder="name..."
            name="name"
            onChange={(e)=>{setfname(e.target.value);usecheck(false)}}
            required
          />
        </div>

        <div>
          <label for="email">Email </label>
          <input
            id="email"
            type="email"
            placeholder="email"
            onChange={(e)=>{setemail(e.target.value);usecheck(false)}}
            name="email"
            required
          />
        </div>

        <div>
          <label for="password">Password </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            name="password"
            onChange={(e)=>{setpass(e.target.value);usecheck(false)}}
            required
          />
        </div>

        <button className="btn btn--form" type="submit" value="Log in">
          Sign up
        </button>
        {
          check ? <p>{check}</p> : null
        }
      </form>
    </div>
    </div>
  )
}

export default Register