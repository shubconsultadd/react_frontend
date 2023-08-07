import React, { useContext, useEffect } from 'react';
import ApiService from '../service/ApiService';
import { UserContext } from '../App';
import Plans from './Plans';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUserContext } from './AppContext';



const UserPage = () => {

    const { user, plans, setPlans, isLoggedIn, role, setRole } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        // const storedLogin = Cookies.get('user_jwt');
        fetchPlans();
    }, []);

    useEffect(() => {
      console.log({user})
      if (!!user) return
      setRole("user");
    }, [user])

    const fetchPlans = async () => {
        try {
          const apiResponse = await ApiService.getAllPlans('/get_plans');
          console.log(apiResponse.data);
          setPlans(apiResponse.data);
        }
        catch(error){
          console.log(error);
        }
    }

  return (
    <>
        <Plans />
    </>
  )
}

export default UserPage