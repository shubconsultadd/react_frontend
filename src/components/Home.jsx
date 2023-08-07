import React, { useEffect } from 'react';
import '../css/Home.css'
import ApiService from '../service/ApiService';
import axios from 'axios';

const Home = () => {

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const fetchDataFromAPI = async () => {
    try {
      const apiResponse = await ApiService.getAllPlans('/get_plans');
      console.log(apiResponse.data);
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <>
    <div className='home-page'>
      <p className='pt-5'>WELCOME</p>
      <h1 className='pt-6'>BOOK YOUR VACATIONS WITH US!</h1>
    </div>
    </>
  )
}

export default Home