import React, { useContext, useState } from 'react';
import '../css/Login.css';
import ApiService from '../service/ApiService';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './AppContext';
import axios from 'axios';

const Login = () => {

  const [popupStyle, showPopup] = useState("hide")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

  const { setUser, setRole } = useUserContext();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); 
  }

  // const handleAdminChange = (e) => {
  //   e.target.value = !e.target.value;
  //   setAdmin(e.target.value);
  // }

    const popup = () => {
        showPopup("login-popup")
        setTimeout(() => showPopup("hide"), 3000)
    }

    const login = async () => {
        try{
          const apiResponse = await axios.post(
            'http://127.0.0.1:8000/backend/login',
            {
              email,
              password
            }
          ).catch(err => console.log(err))
          console.log(apiResponse.data);
          setUser(apiResponse.data);

          if(apiResponse.data.jwt){
            Cookies.set('jwt', apiResponse.data.jwt, { expires: 24, secure: true, sameSite: 'strict' });
          
          if(apiResponse.data.role==='admin'){
            setRole('admin');
            navigateToAdminPage();
          }
          
          else if(apiResponse.data.role==='user'){
            console.log('user')
            setRole('user');
            navigateToUserPage();
          }
          
          }
          else{
            setError(true);
            console.log('Login error');
            popup();
          }
        }
        catch(err){
          setError(true);
          console.log(err);
          popup();
        }
    }

  const navigate = useNavigate();
  const navigateToAdminPage = () => {
    navigate('/admin_page'); 
  };

  const navigateToUserPage = () => {
    navigate('/user_page');
  }

  return (
    <div className='cover'>
      <h1 className='login'>Login</h1>
            <input type="email" value={email} placeholder="Enter your email.." onChange={handleEmailChange} />
            <input type="password" value={password} placeholder="Enter your password.." onChange={handlePasswordChange} />

            <div className="login-btn" onClick={login}>Login</div>

            {error && <div className='popup'>
                <p>Username or password incorrect</p>
            </div>}
    </div>
  )
}

export default Login