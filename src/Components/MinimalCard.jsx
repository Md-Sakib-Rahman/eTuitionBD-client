import React, { useContext } from "react";
import { motion } from "motion/react";
import { AuthContext } from "../Context/AuthContextProvider";
import { Link } from "react-router";
const MinimalCard = ({post}) => {
  const {userData} = useContext(AuthContext)
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
            src={post.studentId.image}
            alt=""
          />
          <h2 className="card-title">{post.studentId.name}</h2>
        </div>
        <p >
          <span className="font-bold">subject:</span> {post.subject}
        </p>
        <p className="font-bold">
         Duration: {post.duration} hours
        </p>
        <div className="card-actions justify-end">
          {
            userData ? <Link to="/tuitions" className="btn btn-accent text-white">View</Link> :  <Link to="/login" className="btn btn-accent text-white">View</Link>
          }
          
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MinimalCard;
