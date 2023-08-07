import React, { useEffect, useState } from 'react';
import '../css/Register.css';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';
import { useUserContext } from './AppContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);

  const { user } = useUserContext();

  const User = "user";

  const navigate = useNavigate();

  useEffect(() => {
    if(user)
    return;

    if(user && (user.role==='admin'))
    navigate('/admin_page');

    if(user && (user.role==='user'))
    navigate('/user_page');
  }, []);
  
  const navigateToLogin = () => {
    navigate('/login'); 
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  }

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const register = async () => {
    try{
      const apiResponse = await ApiService.Register('/register', {"username" : username, "email" : email, "password" : password, "role" : User});
      console.log(apiResponse.data);
      navigateToLogin();
    }
    catch(err){
      console.log(err);
      setError(true);
    }
    
  }

  return (
    <div className='cover'>
      <h1>Register</h1>
      <input type="text" value={username} placeholder='Enter username..' onChange={handleUsername} />
      <input type="email" value={email} placeholder='Enter email..' onChange={handleEmail} />
      <input type="password" value={password} placeholder='Enter password..' onChange={handlePassword} />

      <div className="login-btn" onClick={register}>Register</div>
      {error && <div className='popup'>
        <p>Someone is already registered with this email account!</p>
        </div>}
    </div>
  )
}

export default Register;