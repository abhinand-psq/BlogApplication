import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'
import BarLoader from "react-spinners/BarLoader";
function Login() {



  const history=useNavigate()
const [error,seterror]=useState('')
  const [pass,setpass] = useState('')
const [email,setmail] = useState('')
const [load,setload]=useState(false)
async function handlelogin(e){
e.preventDefault()
setload(true)
const response=await fetch('http://localhost:4000/login',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify({email,pass}),
credentials:'include'
})
if(response.ok){
  setload(false)
history('/')
}else{
response.json().then((res)=>{
  seterror(res.result)
  console.log(res.result);
})
}

} 
  return (
    <div>
<BarLoader 
color={'#36d7b7'} loading={load} width={1500} height={8} size={150}
/>
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
    </div>
    
  )
}

export default Login