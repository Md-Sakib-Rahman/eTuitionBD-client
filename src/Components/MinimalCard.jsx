import React from "react";
import { motion } from "motion/react";
const MinimalCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1, 
        ease: "easeInOut" 
      }}
      viewport={{ once: true, amount: 0.5 }}
      className="card bg-primary text-primary-content w-[90%] hover:w-full transition-[width] duration-300   mx-auto my-10"
    >
      <motion.div 
        initial={{ opacity: 0, y: 56 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 1, 
        ease: "easeInOut" 
      }}
      viewport={{ once: true }}
      className="card-body">
        <div className="flex justify-start items-center gap-2">
          <img
            className="w-10 border-2 border-white rounded-full"
            src="https://i.ibb.co/4nxSjfdH/Screenshot-from-2025-11-19-00-07-16.png"
            alt=""
          />
          <h2 className="card-title">Md Sakib Rahman</h2>
        </div>
        <p>
          A card component has a figure, a body part, and inside body there are
          title and actions parts
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-accent text-white">Apply</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MinimalCard;
