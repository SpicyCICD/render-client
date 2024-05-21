import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">Oops! The page you are looking for has disappeared.</p>
      <Link to="/" className="mt-6 text-indigo-600 hover:text-indigo-500">Go Home</Link>
    </div>
  );
};

export default PageNotFound;