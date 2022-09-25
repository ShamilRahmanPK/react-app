import './App.css';
import { useRef, useState } from "react";
import { signup, logout, login, useAuth } from "./firebase";
import Profile from "./Profile";


export default function App() {
  const [loading, setLoading ] = useState(false);
  const currentUser = useAuth();
  const emailRef = useRef();
  const passwordRef = useRef();

 async function handleSignuUp() {
  setLoading(true);
  try {
    await signup(emailRef.current.value, passwordRef.current.value);
  }  catch {
    alert("Error")
  }
  setLoading(false);
}

async function handleLogin() {
  setLoading(true);
  try {
    await login(emailRef.current.value, passwordRef.current.value);
  }  catch {
    alert("Error")
  }
  setLoading(false);
}

async function handleLogout() {
  setLoading(true);
  try {
    await logout();
  } catch {
    alert("Error!")
  }
  setLoading(false);
}

  return (
    <div id="main">

    

    {!currentUser && 
      <>
      <div className='login-page-container'>
        <div className="log-fields">
          <h2 className='login-txt'>LOGIN</h2>
          <input className='email-feild' ref={emailRef} type="text" placeholder='Email' />
          <input className='pass-feild' ref={passwordRef} type="password" placeholder='Password' />
          <div className="btn-cont">
          <button className='sign-btn' disabled={loading} onClick={handleSignuUp} >Sign Up</button>
          <button className='login-btn' disabled={loading} onClick={handleLogin} >Login</button>  
          </div>
        </div>
      </div>
      </>
    }

      {currentUser && 
      <>
      <div className='profile-page'>
        <div className='user-stat'>Currently logged in as :{ currentUser?.email }</div>
        <Profile />
        <button disabled={ loading || !currentUser } onClick={handleLogout}>Logout</button>
      </div>
      </>} 
    </div>
  )
}