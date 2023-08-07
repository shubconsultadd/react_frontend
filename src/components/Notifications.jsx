import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserContext } from './AppContext';
import { useState } from 'react';
import ApiService from '../service/ApiService';
import Notify from './Notify';
import '../css/Notifications.css';
const Notifications = () => {
    const { user } = useUserContext();
    const [count, setCount] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getNotifications();
    },[]);

    const getNotifications = async () => {
        const apiResponse = await ApiService.GetUnreadNotification(`/${user.id}/unseen`);
        console.log(apiResponse.data);
        setNotifications(apiResponse.data);
    }

    useEffect(() => {
        getCount();
    },[]);

    const handleMarkAllasRead = async () => {
        const apiResponse = await ApiService.MarkAllNotificationsAsRead(`/mark_all_seen/${user.id}`);
        console.log(apiResponse.data);
        
        if(user.role==='admin')
        navigate('/admin_page');

        else
        navigate('/user_page');
    }

    const getCount = async () => {
        const apiResponse = await ApiService.GetUnreadNotificationCount(`/get_unread_count/${user.id}`);
        console.log(apiResponse.data);
        setCount(apiResponse.data);
    }
  return (
    <>
        <div className='notify'>
        <h1 className='notify__heading'>Unread Notifications: {count}</h1>
        {notifications && notifications.length > 0 && <button className='markAllRead' onClick={handleMarkAllasRead}>Mark All as Read</button>}
        </div>
        {notifications && notifications.length > 0 ? <Notify values={notifications} /> : <h1 className='notify__heading'>No Unread Notifications Found!</h1>}
    </>
  )
}

export default Notifications;