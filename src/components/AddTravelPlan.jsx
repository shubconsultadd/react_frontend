import React, { useContext, useEffect, useState } from 'react';
import ApiService from '../service/ApiService';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import Cookies from 'js-cookie';
import { useUserContext } from './AppContext';
import '../css/AddTravelPlan.css';

const AddTravelPlan = () => {
    
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [image, setImage] = useState(null);

    const { user } = useUserContext();
    
    useEffect(() => {
        if(!user)return;

        if(!Cookies.get('jwt') || user.role!='admin') navigate('/login');
    }, [user]);

    const navigate = useNavigate();

    

    const navigateToadminPage = () => {
        navigate('/admin_page');
    }

    const handleName = (e) => {
        setName(e.target.value);
    }

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleStartDate = (e) => {
        setStartDate(e.target.value);
    }

    const handleEndDate = (e) => {
        setEndDate(e.target.value);
    }

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    }

    const handleSubmit = async () => {
        try{
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('start_date', start_date);
            formData.append('end_date', end_date);
            formData.append('image', image, image.name);
            formData.append('registered_admin_id', user.id);

            const apiResponse = await ApiService.addTravelPlan('/add_plan', formData);

            console.log(apiResponse);

            const planID = apiResponse.data.id;
            const notificationname = apiResponse.data.name;
            const adminId = apiResponse.data.registered_admin_id;

            const notificationDescription = "Plan "+notificationname+" was added by admin "+adminId;

            const apiResponse1 = await ApiService.AddNotification('/save', {
                'description' : notificationDescription,
                'planID' : planID
            })

            console.log(apiResponse1);
            navigateToadminPage();
        }
        catch(err){
            console.log(err);
        }
    }

  return (
    <>
    <form className='cover'>
        <h1 className='h1'>Add Travel Plan</h1>
        <input type='text' value={name} placeholder='Enter Destination name..' onChange={handleName} />
        <input type='text' value={description} placeholder='Enter Description..' onChange={handleDescription} />
        <input type='number' value={price} placeholder='Enter Price..' onChange={handlePrice} />
        <div className='start_date'>
            <p className='check_label'>Start Date: </p>
        <input type='date' onChange={handleStartDate} />
        </div>
        <div className='end_date'>
            <p className='check_label'>End Date: </p>
        <input type='date' onChange={handleEndDate} />
        </div>
        <div className='image'>
            <p className='check_label'>Image: </p>
        <input type='file' onChange={handleImage} />
        </div>

        <div className="login-btn" onClick={handleSubmit}>Submit</div>
    </form>
    </>
  );
}

export default AddTravelPlan;