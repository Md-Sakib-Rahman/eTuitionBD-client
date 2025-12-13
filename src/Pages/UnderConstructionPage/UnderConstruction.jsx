import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";

const UnderConstruction = ({message }) => {
  return (
    <div className="min-h-[calc(100vh-230px)] mb-12  bg-base-200 flex flex-col items-center justify-center p-4 text-center">
      
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        
        <motion.svg
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 w-32 text-primary opacity-20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </motion.svg>
        
     
        <div className="absolute inset-0 flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        </div>
      </motion.div>

    
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-base-content mb-4">
          Work in Progress
        </h1>
        <p className="text-lg text-base-content/70 max-w-md mx-auto mb-8">
          im currently building this feature.
          
        </p>
        <h2 className="text-xl text-primary font-bold">Feature desription</h2>
        <p className="font-bold mb-2 ">{message} </p>

        
        <div className="flex gap-4 justify-center">
            <Link to="/" className="btn btn-primary px-8">
            Go Back Home
            </Link>
            <button className="btn btn-ghost" onClick={() => window.history.back()}>
                Go Back
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;