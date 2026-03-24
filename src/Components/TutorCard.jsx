import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaStar, FaAward, FaArrowRight } from "react-icons/fa";

const TutorCard = ({ tutor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative w-full max-w-[320px] mx-auto my-4"
    >
      {/* Dynamic Glow Background */}
      <div className="absolute -inset-1 bg-gradient-to-b from-primary/40 to-secondary/10 opacity-0 group-hover:opacity-100 transition duration-500 blur-xl rounded-[--radius-box]"></div>

      <div className="relative card bg-base-200 border border-white/5 group-hover:border-primary/30 rounded-[--radius-box] shadow-2xl overflow-hidden h-full">
        
        {/* Top Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-accent opacity-70"></div>

        <div className="card-body p-6 flex flex-col items-center text-center">
          
          {/* Avatar Section */}
          <div className="relative mb-4">
            <div className="avatar">
              <div className="w-20 h-20 rounded-2xl ring ring-primary/20 ring-offset-base-100 ring-offset-4 group-hover:ring-primary transition-all duration-300">
                <img 
                  className="object-cover" 
                  src={tutor.image} 
                  alt={tutor.name} 
                />
              </div>
            </div>
            {/* Verified Badge */}
            <div className="absolute -bottom-2 -right-2 bg-success text-success-content p-1.5 rounded-full shadow-lg border-2 border-base-200">
              <FaAward className="text-[10px]" />
            </div>
          </div>

          {/* Identity Header */}
          <div className="mb-4">
            <h2 className="text-xl font-black text-base tracking-tight group-hover:text-primary transition-colors">
              {tutor.name}
            </h2>
            <div className="flex items-center justify-center gap-1.5 text-accent mt-1">
              <FaStar className="text-xs" />
              <span className="text-sm font-bold tracking-tighter">
                {tutor.tutorData?.averageRating || "5.0"} (48 Reviews)
              </span>
            </div>
          </div>

          {/* Qualification Block */}
          <div className="w-full py-3 px-4 rounded bg-base-300/50 border border-white/5 mb-4">
            <div className="flex items-center justify-center gap-2 text-primary mb-1">
              <FaGraduationCap className="text-sm" />
              <span className="text-[10px] uppercase font-black tracking-widest text-gray-400">Education</span>
            </div>
            <p className="text-xs text-base font-medium line-clamp-1">
              {tutor.tutorData?.qualifications || "Verified Tutor"}
            </p>
          </div>

          {/* Secondary Stats */}
          <div className="flex justify-between w-full mb-6">
            <div className="text-left">
              <p className="text-[10px] uppercase text-gray-500 font-bold tracking-tighter">Experience</p>
              <p className="text-sm font-bold text-base">{tutor.tutorData?.experience || "3+"} Years</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase text-gray-500 font-bold tracking-tighter">Rate</p>
              <p className="text-sm font-bold text-primary">${tutor.tutorData?.hourlyRate || "15"}/hr</p>
            </div>
          </div>

          {/* Action Button */}
          <button className="btn btn-outline btn-secondary btn-sm w-full group/btn hover:bg-primary hover:border-primary rounded-[--radius-field] font-black uppercase tracking-widest text-[10px] h-10">
            Profile Details
            <FaArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorCard;