import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from 'react-loading';

const Login = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [displayToast, setDisplayToast] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true); // Set submitting state to true
    try {
      const payload = { password };

      if (identifier.includes('@')) {
        payload.email = identifier.trim();
      } else {
        payload.username = identifier.trim();
      }

      const response = await axios.post('http://localhost:8082/users/login', payload);

      if (response.status === 200) {
        const { token, role } = response.data.data;
        sessionStorage.setItem('authToken', token);
        
        // Role-based redirection
        if (role === 1) {
          navigate('/admin');
        } else if (role === 43) {
          navigate('/home');
        }
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'An unexpected error occurred', {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          onClose: () => {
            setDisplayToast(false);
            setSubmitting(false);
          }
        });
        setDisplayToast(true); // Set displayToast to true
      } else {
        toast.error('Network error, please try again');
      }
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer);
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
          <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div>
                  <label htmlFor="identifier" className="block text-sm font-medium leading-6 text-gray-900 float-left mb-2">Email or Username</label>
                  <div className="mt-1">
                    <input id="identifier" name="identifier" type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 float-left mb-2">Password</label>
                  <div className="mt-1">
                    <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
                <div className="text-sm mb-2">
                  <Link to="/forgotpassword" className="font-semibold text-indigo-600 hover:text-indigo-500 float-left mb-2">Forgot password?</Link>
                </div>

                <div>
                  <button type="submit" disabled={submitting} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    {submitting ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>

                <div className='float-left'>
                  Create One? <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register</Link>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
