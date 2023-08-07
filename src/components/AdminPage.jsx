import React, { useContext, useEffect } from 'react';
import ApiService from '../service/ApiService';
import { UserContext } from '../App';
import Plans from './Plans';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUserContext } from './AppContext';



const AdminPage = () => {
  const navigate = useNavigate()
    const { plans, setPlans, role, setRole } = useUserContext();

    useEffect(() => {
        const storedLogin = Cookies.get('jwt');
        setRole('admin');
        fetchPlans();
    }, []);

    const fetchPlans = async () => {
        try {
          const apiResponse = await ApiService.getAllPlans('/get_plans');
          console.log(apiResponse.data);
          setPlans(apiResponse.data);
        }
        catch(error){
          console.log(error);
          navigate("/login")
        }
      }

      useEffect(() => {
        if (!role) return
        if (role === "admin") return

        navigate("/login")
      }, [role])

  return (
    <>
        <Plans  />
    </>
  )
}

export default AdminPage