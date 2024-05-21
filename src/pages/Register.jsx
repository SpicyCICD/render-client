import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [reCaptchaToken, setReCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('https://render-backend-yqw8.onrender.com/users/', {
        email,
        password,
        username,
        reCaptchaToken
      });
      console.log(`User Added with ${email}`)

      if (response.status === 200) {
        navigate('/login');
      } else {
        console.log("Error while creating user")
      }
    } catch (error) {
      if (error.response) {
        // Displaying toast on error response
        toast.error(error.response.data.message || 'An unexpected error occurred', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Network error, please try again');
      }
    }
  };

  const onLoad = () => {
    captchaRef.current.execute();
  };

  useEffect(() => {
    if (reCaptchaToken)
      setReCaptchaToken(reCaptchaToken);
  }, [reCaptchaToken])

  useEffect(() => {
    const timer = setTimeout(() =>{
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      {loading ? (
        <div className='loadingContainer'>
        <ReactLoading 
          type={"bars"} 
          color={"green"} 
          height={'50px'} 
          width={'50px'} 
        />
        </div>
      ) : (
        <>
        <ToastContainer />
          <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
              </div>
    
              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 float-left mb-2">Email</label>
                    <div className="mt-2">
                      <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
    
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 float-left mb-2">Username</label>
                    <div className="mt-2">
                      <input id="username" name="username" type="text" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
    
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                      <input id="password" name="password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                  <HCaptcha
                    sitekey="e5a2eb5c-b9d5-4fce-8353-955ef6aec457"
                    onLoad={onLoad}
                    onVerify={setReCaptchaToken}
                    ref={captchaRef}
                  />
                  <div>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
                  </div>
                </form>
    
                <p className="mt-10 text-center text-sm text-gray-500">
                  Sign In Instead?
                  <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    

    
  )
}

export default Register;
