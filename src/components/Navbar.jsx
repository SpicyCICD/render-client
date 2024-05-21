import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png'
import { Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'


const Navbar = () => {

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    setLoggedIn(!!authToken);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('https://render-backend-yqw8.onrender.com/users/logout');
      sessionStorage.removeItem('authToken');
      navigate("/login");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div className='shadow-md w-full bg-black fixed top-0 left-0'>
        <div className='md:px-10 py-4 px-7 md:flex justify-between items-center'>
          <div className='text-white flex text-2xl cursor-pointer items-center gap-1'>
            <Link to="/" href="#"><img src={logo} alt="" className='logo'/></Link>
            <Link to="/" href="#"><span className='font-bold '>Logo</span></Link>
            
          </div>

          <div onClick={() => setIsOpen(!isOpen)} className='text-white w-7 h-7 absolute right-8 top-6 cursor-pointer md:hidden'>
            {isOpen ? <XMarkIcon/> : <Bars3BottomRightIcon/>}
          </div>

          <ul className={`text-white md:flex pl-9 md:pl-0 md:items-center md:pb-0 pb-12 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto translate-all bg-black duration-500 ease-in ${isOpen ? 'top-12 h-screen' : 'top-[-490px]'}`}>
            {!loggedIn ? (
              <>
              <li className='font-semibold my-7 md:my-0 md:ml-8 text-white'>
                <Link to="/login">Login</Link></li>
              <li className='font-semibold my-7 md:my-0 md:ml-8 text-white'>
                <Link to="/register">Register</Link></li>
              <button className='btn bg-blue-600 text-white py-1 px-3 md:ml-8 rounded md:static'>Get Started</button>
              </>
            ) : (
              <li><Link to="/" onClick={handleLogout} className="text-white">Logout</Link></li>
            ) }
            
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
