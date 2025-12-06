import React from "react";
import { motion } from "motion/react";
const TutorCard = () => {
  return (
    <motion.div 
    
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ 
      duration: 1, 
      ease: "easeInOut" 
    }}
    viewport={{ once: true, amount: 0.5 }}
    
    className="card bg-secondary image-full w-[90%] hover:w-full transition-[width] duration-300 mx-auto my-2 shadow-sm p-4 flex flex-col justify-between items-center gap-2">
      
        <img
          className="w-20 rounded-full mx-auto object-cover"
          src="https://i.ibb.co/4nxSjfdH/Screenshot-from-2025-11-19-00-07-16.png"
          alt="Shoes"
        />
        <h2 className="font-bold text-xl text-white">Md Sakib Rahman</h2>
        <h2 className=" text-sm text-gray-400">Computer Science and Enginieering</h2>

      
    </motion.div>
  );
};

export default TutorCard;
