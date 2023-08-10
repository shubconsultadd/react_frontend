import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  { useUserContext } from './AppContext';
import '../css/Plans.css';

const Plans = () => {
    const { plans, setPlans } = useUserContext();
    const navigate = useNavigate();

    const handleView = (plan_id) => {
        navigateToTravelPlan(plan_id);
    }

    const navigateToTravelPlan = (plan_id) => {
        navigate(`/view/${plan_id}`);
    }
  return (
    <section className="main-card-container">
        <h1 className='heading'>All Plans: </h1>
            {plans.map((plan) => {
                return (
                    <React.Fragment key={plan.id}>
                        <div className='card-container'>
                            <div className='plan'>
                                <div className='plan-image'>
                                <img className='image' src={plan.image}/>
                                </div>
                                <div className='plan-body'>
                                    <p className='title'>{plan.name}</p>
                                    <p className='description'>{plan.description}</p>
                                    <p className='price'>{plan.price}</p>
                                    <p className='adminID'>{`Created by Admin ${plan.registered_admin_id}`}</p>
                                    <p>{plan.start_date}</p>
                                    <p>{plan.end_date}</p>
                                    <button className='btn_view_more' onClick={() => handleView(plan.id)}>View More</button>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                )
            } )}
        </section>
  )
}

export default Plans









