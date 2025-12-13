import React from 'react';
import { Link, useRouteError } from 'react-router';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const ErrorPage = () => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 text-center p-6">
            
          
            <div className="mb-6 animate-bounce">
                <FaExclamationTriangle className="text-9xl text-warning opacity-80" />
            </div>
 
            <h1 className="text-9xl font-extrabold text-primary mb-2 drop-shadow-lg">
                404
            </h1>

            
            <h2 className="text-3xl font-bold text-base-content mb-4">
                Oops! Page Not Found
            </h2>
            <p className="text-lg text-base-content/70 max-w-md mb-8">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
 
            <Link to="/" className="btn btn-primary btn-wide text-lg shadow-lg hover:shadow-xl transition-all">
                <FaHome className="mr-2" /> Back to Home
            </Link>
 
            <div className="mt-12 p-4 bg-base-100 rounded-lg shadow-inner opacity-50 text-sm">
                <p><i>{error?.statusText || error?.message}</i></p>
            </div>

        </div>
    );
};

export default ErrorPage;