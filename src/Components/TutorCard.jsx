import React from "react";
import { motion } from "motion/react";
const TutorCard = ({tutor}) => {
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
          className="w-16 h-16 rounded-full mx-auto object-cover"
          src={tutor.image}
          alt="Shoes"
        />
        <h2 className="font-bold text-xl text-white">{tutor.name}</h2>
        <h2 className=" text-sm text-gray-400">{tutor.tutorData.qualifications}</h2>

      
    </motion.div>
  );
};

export default TutorCard;
