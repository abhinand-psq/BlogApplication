import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
function Login() {



  const history=useNavigate()
const [error,seterror]=useState('')
  const [pass,setpass] = useState('')
const [email,setmail] = useState('')

async function handlelogin(e){
e.preventDefault()
const response=await fetch('http://localhost:4000/login',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({email,pass}),
credentials:'include'
})
if(response.ok){
history('/')
}else{
response.json().then((res)=>{
  seterror(res.result)
  console.log(res.result);
})
}

}
  return (
    <div class="container1">
      <h2 class="login-title">Log in</h2>

      <form className="login-form"  onSubmit={handlelogin}>
       

        <div>
          <label for="email">Email </label>
          <input
            id="email"
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e)=>{setmail(e.target.value);seterror(false)}}
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
            value={pass}
            onChange={(e)=>{setpass(e.target.value);seterror(false)}}
            required
          />
        </div>

        <button className="btn btn--form"  value="Log in">
          Log in
        </button>
        {
          error ? <p>{error}</p> : null
        }
      </form>
    </div>
  )
}

export default Login