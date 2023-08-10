import React from 'react';
import '../css/Notify.css';
import ApiService from '../service/ApiService';
import { useUserContext } from './AppContext';
import { useNavigate } from 'react-router-dom';

const Notify = ({values}) => {
    console.log('=======>',values);
    const { user } = useUserContext();
    const navigate = useNavigate();

    const handleMarkAsRead = async (id) => {
        try{
            console.log(id);
            const apiResponse = await ApiService.MarkNotificationAsRead(`/mark_seen/${user.id}/${id}`);
            console.log(apiResponse);

        if(user.role==='admin')
        navigate('/admin_page');

        else
        navigate('/user_page');
        }
        catch(err){
            console.error(err);
        }
    }

    const handleVisitPlan = async (planID, id) => {
        console.log(planID, id);
        try{
            console.log(id);
            const apiResponse = await ApiService.MarkNotificationAsRead(`/mark_seen/${user.id}/${id}`);
            console.log(apiResponse);
            navigate(`/view/${planID}`);
        }
        catch(err){
            console.error(err);
        }
    }
  return (
    <>
    {
    values && values.map((value) => {
        console.log(value.notificationID);
        return (
            <React.Fragment key={value.notificationID}>
                <div className='container'>
                    <div className='description'>
                        <p className='para'>{value.description}</p>
                    </div>
                    <div className='buttons'>
                        <button className='btn_mark_as_read' onClick={() => handleMarkAsRead(value.notificationID)}>Mark as Read</button>
                        {!value.description.includes("deleted") && <button className='btn_mark_as_read' onClick={() => handleVisitPlan(value.planID, value.notificationID)}>Visit Plan</button>}
                    </div>
                </div>
            </React.Fragment>
        )
    })
    }
    </>
  )
}

export default Notify