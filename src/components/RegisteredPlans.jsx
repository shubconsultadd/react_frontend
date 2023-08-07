import React, { useEffect, useState } from 'react';
import { useUserContext } from './AppContext';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ApiService from '../service/ApiService';

const RegisteredPlans = () => {
    const { user } = useUserContext();

    const navigate = useNavigate();

    if(!Cookies.get('jwt') || (user!=null && user.role!='user'))
    navigate('/login');

    const [plans, setPlans] = useState([]);

    useEffect(() => {
        if (!user.id) return;
        fetchRegisteredPlans(user.id);
    }, [user]);

    const fetchRegisteredPlans = async (id) => {
        try{
            const apiResponse = await ApiService.plansRegisteredByUser(`/user_plans/${id}`);
            console.log(apiResponse.data);
            setPlans(apiResponse.data);
        }
        catch(err){
            console.log(err);
        }
    }

    const handleView = (plan_id) => {
        navigateToTravelPlan(plan_id);
    }

    const navigateToTravelPlan = (plan_id) => {
        navigate(`/view/${plan_id}`);
    }

  return (
    <>
    <section className="main-card-container">
            {plans && plans.length>0 ? (plans.map((plan) => <ul key={plan.id}>
                    <li key={plan.id}>
                        <div className='card-container'>
                            <div className='plan'>
                                <div className='plan-body'>
                                    <h2 className='title'>{plan.name}</h2>
                                    <h3 className='description'>{plan.description}</h3>
                                    <h4 className='price'>{plan.price}</h4>
                                    <h4 className='start_date'>{plan.start_date}</h4>
                                    <h4 className='end_date'>{plan.end_date}</h4>
                                    <img className='image' src={plan.image}/>
                                    <button className='btn_view_more' onClick={() => handleView(plan.id)}>View More</button>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
             ) ) : (
                <h2>No Plans Registered Yet!</h2>
            )}
        </section>
    </>
  )
}

export default RegisteredPlans