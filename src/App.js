import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddTravelPlan from './components/AddTravelPlan';
import AdminPage from './components/AdminPage';
import UserPage from './components/UserPage';
import TravelPlanPage from './components/TravelPlanPage';
import RegisteredPlans from './components/RegisteredPlans';
import ModifyPlan from './components/ModifyPlan';
import AppContext from './components/AppContext';
import Notifications from './components/Notifications';
import ErrorPage from './components/ErrorPage';
import React from 'react';

const UserContext = createContext();

function App() {
  return (
    <>
    <Router>
      <AppContext>
       <NavBar />
       <Routes>
        <Route path='/' element={ <Home />} />
        <Route path='/login' element={ <Login />} />
        <Route path='/register' element={ <Register />} />
        <Route path='/add' element={ <AddTravelPlan />} />
        <Route path='/admin_page' element={ <AdminPage />} />
        <Route path='/user_page' element={ <UserPage /> } />
        <Route path='/view/:plan_id' element={ <TravelPlanPage /> } />
        <Route path='/registered_plans' element={ <RegisteredPlans /> } />
        <Route path='/modify_dates/:plan_id' element={ <ModifyPlan /> } />
        <Route path='/notifications' element={ <Notifications />} />
        <Route path='/not_found' element={ <ErrorPage />} />
        <Route path="*" element={ <h1>Error : 404 Not Found</h1>} />
       </Routes>
       </AppContext>
    </Router>
    </>
  );
}

export default App;
export { UserContext };