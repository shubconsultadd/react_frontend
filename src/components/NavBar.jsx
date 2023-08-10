import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/NavBar.css';
import Cookies from 'js-cookie';
import { useUserContext } from './AppContext';
import { FaRegBell } from 'react-icons/fa';

const NavBar = () => {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const { notificationCount, setNotificationCount } = useUserContext();
  const navigate = useNavigate();

//   const { user, setUser, setRole, role } = useContext(AppContext);
  const context = useUserContext()

  console.log({context})

  useEffect(() => {
    const storedLogin = Cookies.get('jwt');

    if(storedLogin)
    context.setRole(true);
  }, []);

  const handleLogout = () => {
    const cookie = Cookies.get('jwt');
    context.setUser(null);
    context.setRole('');

    if(cookie!=null)
    Cookies.remove('jwt', { path : '/'});
  }

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };

  const handleNotification = () => {
    navigate('/notifications');
  }


  return (
    <nav className='nav'>
    <Link to="/" className='nav_brand'>
        <h2>TravelPlan</h2>
    </Link>
    <ul className='nav__menu'>
        <li className='nav__item'>
            <Link to='/' className='nav__link'>
                Home
            </Link>
        </li>

        {(context.role==='admin') && Cookies.get('jwt') && 
        <li>
        <Link to='add' className='nav__link'>
            Add Plan
        </Link>
        </li>
        }

        {(context.role==='admin') && Cookies.get('jwt') && 
        <li>
        <Link to='admin_page' className='nav__link'>
            View All Plans
        </Link>
        </li>
        }

       {(context.role==='user') && Cookies.get('jwt') && 
        <li>
        <Link to='user_page' className='nav__link'>
            View All Plans
        </Link>
        </li>
        }

        {!context.user && 
        <li>
        <Link to='login' className='nav__link'>
            Login
        </Link>
        </li>
        }

        {!context.user && 
        <li>
        <Link to='register' className='nav__link'>
            Register
        </Link>
        </li>
        } 

        <li>
            <div className='nav__user'>
                Hi {context.user ? <h4 className='nav__user'>{context.user.username}!</h4> : <h4 className='nav__user'>Unknown!</h4>}
            </div>
        </li>
        {context.user 
        && 
        <li>
            <Link to='/' className='nav__link' onClick={handleLogout}>
                Logout
            </Link>
        </li>
        }
        {context.user 
        && (context.user.role==='user') &&
        <li>
            <Link to='registered_plans' className='nav__link'>
                Registered Plans
            </Link>
        </li>
        }
        {context.user &&
        <li className="notify">
          <FaRegBell size={25} style={{ margin: '10px' }} onClick={handleNotification}/>
          {notificationCount > 0 && <p className='nav__notifycount'>{notificationCount}</p>}
        </li>
        }
    </ul>

    <div onClick={navToggle} className='nav__toggler'>
        <div className='line1'></div>
        <div className='line2'></div>
        <div className='line3'></div>
    </div>
    </nav>
  )
}

export default NavBar;