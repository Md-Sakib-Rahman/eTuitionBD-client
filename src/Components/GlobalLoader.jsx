import React from "react";
import { motion } from "motion/react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-100 z-50">
      <div className="relative flex justify-center items-center">
        
        <motion.span
          className="block w-20 h-20 border-4 border-base-300 border-t-primary rounded-full box-border"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
         
        <motion.div
          className="absolute w-4 h-4 bg-primary rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
     
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="mt-6 text-lg font-medium text-primary tracking-widest uppercase"
      >
        Loading
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;