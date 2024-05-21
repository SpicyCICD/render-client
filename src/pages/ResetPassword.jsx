import axios from 'axios'; // Ensure you're importing axios correctly
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    // Use useParams hook to access the resetToken from the URL
    const { resetToken } = useParams();

    // Clear the error message when user starts typing in the input fields
    const handleInputChange = (setterFunction) => (e) => {
        if (error) setError('');
        setterFunction(e.target.value);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords don't match.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:8082/users/resetPassword', {
                resetToken,
                password,
            });

            if (response.status === 200) {
                // Redirect user to login page on successful password reset
                window.location.href = '/login';
            } else {
                console.log("Error resetting password");
            }
        } catch (error) {
            const errorMsg = error.response && error.response.data ? error.response.data.message : 'An unexpected error occurred';
            setError(errorMsg);
            console.error("error", errorMsg);
        }
    };

    return (
        <>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
                <form onSubmit={handleResetPassword} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <div className="mt-1">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={handleInputChange(setPassword)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                        <div className="mt-1">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                required
                                value={confirmPassword}
                                onChange={handleInputChange(setConfirmPassword)}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    {error && <p className="mt-2 text-sm text-red-600" id="email-error">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Reset Password
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ResetPassword;
