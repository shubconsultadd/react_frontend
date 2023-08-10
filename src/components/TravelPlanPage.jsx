import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import ApiService from '../service/ApiService';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUserContext } from './AppContext';
import '../css/TravelPlanPage.css';

const TravelPlanPage = () => {
    const { user, isLoggedIn, role, setRole, plans, planID, setPlanID } = useUserContext();

    const navigate = useNavigate();

    const [plan, setPlan] = useState(null);

    const [users, setUsers] = useState([]);
    const [showUsers, setShowUsers] = useState(false);
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState(false);

    const { plan_id } = useParams();

    const fetchPlan = React.useCallback(async () => {
        try{
            const apiResponse = await ApiService.getPlan(`/get_plan/${plan_id}`);
            console.log(apiResponse.data);
            setPlan(apiResponse.data);
        }
        catch(err){
            console.log(err);
        }
    })

    const checkRegistrationWithPlan = React.useCallback(async () => {
        try{
            const apiResponse = await ApiService.isUserRegisteredWithThePlan(`/check_user_with_plan/${user.id}/${plan_id}`);
            console.log(apiResponse);

            if(apiResponse.data==="true")
            setRegistered(true);

            else
            setRegistered(false);
        }
        catch(err){
            console.log(err);
        }
    })

    useEffect(() => {
        if(!Cookies.get('jwt')) 
        navigate('/login');
    }, [user]);


    useEffect(() => {
        fetchPlan()
        console.log('plan',plan);
        // if(plan===null)
        // navigate('/not_found');
    }, []);

    useEffect(() => {
        checkRegistrationWithPlan();
    }, []);

    const handleDelete = async(name) => {
        try{
            if(plan.registered_admin_id==user.id){
                console.log(user.id);
                const apiResponse = await ApiService.deletePlan(`/delete_plan/${plan_id}/${user.id}`);
                console.log(apiResponse.data); 

                const notificationName = name;
                const planID = plan_id;
                const userID = user.id;

                const description = "Plan "+notificationName+" was deleted by admin "+userID;


                const javaResponse = await ApiService.AddNotification('/save',{
                    'description' : description,
                    'planID' : planID
                });


                navigate('/admin_page');
            }
            else{
                setError(true);
            }
            
        }catch(err){
            console.log(err);
            setError(true);
        }
        
    }

    const handleViewUsers = async () => {
        try{
            const apiResponse = await ApiService.showPlansWithRegisteredUsers(`/plan_with_users/${plan_id}`);
            console.log(apiResponse);
            setUsers(apiResponse.data);
            setShowUsers(true);
        }
        catch(err){
            console.log(err);
        }
        
    }

    const handleRegister = async () => {
        try{
            const apiResponse = await ApiService.registerPlan('/register_plan', {"userID" : user.id, "planID" : plan_id});
            console.log(apiResponse);
            navigate('/user_page');
        }
        catch(err){
            console.log(err);
        }
    }

    const handleModifyDates = async () => {
        setPlanID(plan_id);
        if(plan.registered_admin_id==user.id)
        navigate(`/modify_dates/${plan_id}`);

        else{
            setError(true);
        }
    }

    const handleDeRegister = async () => {
        try{
            const apiResponse = await ApiService.deRegisterPlan(`/deregister/${user.id}/${plan_id}`);
            console.log(apiResponse);
            navigate('/user_page');
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <>
      <div className='cover'>{plan && (
        <div className='div_1'>
        <p className='name'>{plan.name}</p>
        <p className='description'>{plan.description}</p>
        <p className='price'>{plan.price}</p>
        <p className='admin'>{`Created by Admin ${plan.registered_admin_id}`}</p>
        <img src={plan.image} className='image' />
        <p className='start_date'>Start Date : {plan.start_date}</p>
        <p className='start_date'>End Date : {plan.end_date}</p>
        </div>
        )}

        {plan && user && Cookies.get('jwt') && (role==='admin') && (
            <div className='div_2'>
            <button onClick={() => handleDelete(plan.name)} className='btn_1'>Delete</button>
            <button onClick={handleModifyDates} className='btn_2'>Modify Date</button>
            <button onClick={handleViewUsers} className='btn_3'>View Users</button>
            </div>
        )}

        {plan && user && Cookies.get('jwt') && (role==='user') && (registered===true) && (
            <div className='div_3'>
            <button onClick={handleDeRegister} className='btn_4'>Deregister</button>
            </div>
        )}

        {plan && user && Cookies.get('jwt') && (role=='user') && (registered===false) && (
            <div className='div_4'>
            <button onClick={handleRegister} className='btn_5'>Register</button>
            </div>
        )}

        {plan && Cookies.get('jwt') && showUsers && (
            <div className='div_5'>
                <p className='registered'>Registered Users</p>
                {users && users.length > 0 ? (
                <ul className='users'>
                    {users.map((user) => (
                    <li key={user.user_id} className='user'>{user.username}</li>
                    ))}
                </ul>) : (
                      <p className='not_registered'>No users registered with the Plan!</p>
                ) }
            </div>
        )}

        {error && (
            <div className='users'>
                <p className='user'>You are not allowed to modify/delete this plan!</p>
            </div>
        )}
        
      </div>  
    </>
  )
}

export default TravelPlanPage;