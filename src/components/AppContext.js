import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getUser } from './Get';
import ApiService from '../service/ApiService';

export const UserContext = createContext({isLoggedIn: false, setIsLoggedIn: () => {}, user: null, setUser: () => {}, role: "", setRole: () => {}, plans: [], setPlans: () => {}});
export const useUserContext = () => React.useContext(UserContext);


const AppContext = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');
    const [plans, setPlans] = useState([]);
    const [planID, setPlanID] = useState(-1);
    const [receivedToken, setReceivedToken] = useState('');
    const [notificationCount, setNotificationCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      if(!!user)
      return;

      if(!Cookies.get('jwt')){
        navigate('/login');
        return;
      }
      const newToken = Cookies.get('jwt');
      console.log({newToken})
      setReceivedToken(newToken);
      setIsLoggedIn(true);
      fetchUser(newToken);
    }, []);

    const fetchUser = async (receivedToken) => {
      const user = await getUser({ token: receivedToken });
      console.log({user})
      if(user!=null){
        setRole(user.role);
        setUser(user);
        // fetchNotificationCount();
      }
    }

    const fetchNotificationCount = async () => {
        const response = await ApiService.GetUnreadNotificationCount(`/get_unread_count/${user.id}`);
        setNotificationCount(response);
        console.log(notificationCount);
    }

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, role, setRole, plans, setPlans, planID, setPlanID }} >
        { children }
    </UserContext.Provider>
  )
}

export default AppContext