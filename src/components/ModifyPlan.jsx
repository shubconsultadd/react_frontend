import React, { useEffect, useState } from 'react';
import { useUserContext } from './AppContext';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import ApiService from '../service/ApiService';

const ModifyPlan = () => {
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');

    const { plan_id } = useParams();

    const { user } = useUserContext();

    const navigate = useNavigate();

    useEffect(() => {
        if(!user) return;
        if(!Cookies.get('jwt') || (user && user.role!='admin')) navigate('/login');
    }, [user])

    

    // const navigateToadminPage = () => {
    //     console.log('admin_page')
    //     navigate('/admin_page');
    // }

    useEffect(() => {
        fetchPlan();
    }, []);

    const fetchPlan = React.useCallback(async () => {
        try{
            const apiResponse = await ApiService.getPlan(`/get_plan/${plan_id}`);
            console.log(apiResponse.data);
            setStartDate(apiResponse.data.start_date);
            setEndDate(apiResponse.data.end_date);
        }
        catch(err){
            console.log(err);
        }
    })


    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const formdata = new FormData();
            formdata.append('start_date', start_date);
            formdata.append('end_date', end_date);

            const apiResponse = await ApiService.modifyTravelPlan(`/modify_plan/${plan_id}`, formdata);
            console.log({apiResponse});
            navigate('/admin_page');
        }
        catch(err){
            console.log(err);
        }
    }


  return (
    <>
    <form className='cover' onSubmit={handleSubmit}>
        <p className='title'>Modify Dates of a Plan : </p>
        <div className='start_date'>
        <p className='check_label'>Start Date: </p>
        <input type='date' value = {start_date} onChange={handleStartDate} />
        </div>

        <div className='end_date'>
        <p className='check_label'>End Date: </p>
        <input type='date'  value={end_date} onChange={handleEndDate} />
        </div>

        <button type="submit">Modify Date</button>
    </form>
    </>
  )
}

export default ModifyPlan;