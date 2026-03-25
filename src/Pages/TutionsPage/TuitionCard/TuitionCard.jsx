import React from "react";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaClock, FaMapMarkerAlt, FaLayerGroup, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router"; 

const TuitionCard = ({ post }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative w-full"
    >
      {/* Subtle Glow Background on Hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 transition duration-500 blur-sm rounded-[--radius-box]"></div>

      <div className="relative card bg-base-200 border border-white/5 group-hover:border-primary/40 rounded-[--radius-box] shadow-xl overflow-hidden transition-all duration-300">
        
        <div className="card-body p-6">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-4">
            <div className="badge badge-primary badge-outline text-[10px] font-black uppercase tracking-widest px-3 py-3 border-opacity-30">
              {post.medium}
            </div>
            <div className="flex flex-col items-end">
               <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-tighter">Posted On</span>
               <span className="text-xs font-bold text-base-content/70">
                {new Date(post.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
              </span>
            </div>
          </div>

          {/* Title & Subject */}
          <div className="mb-6">
            <h2 className="text-2xl font-black text-base tracking-tighter group-hover:text-primary transition-colors leading-tight">
              {post.subject}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-base-content/60">
              <FaLayerGroup className="text-xs text-secondary" />
              <span className="text-sm font-semibold">{post.classGrade}</span>
            </div>
          </div>

          {/* Professional Info Grid */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/5">
            {/* Budget */}
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Budget</p>
              <div className="flex items-center gap-2">
                <FaMoneyBillWave className="text-success text-xs" />
                <span className="text-sm font-bold text-base">${post.budget}</span>
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-1 text-right">
              <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Duration</p>
              <div className="flex items-center gap-2 justify-end">
                <span className="text-sm font-bold text-base">{post.duration} hour</span>
                <FaClock className="text-info text-xs" />
              </div>
            </div>

            {/* Location - Spans 2 columns */}
            <div className="col-span-2 pt-2">
              <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-1">Location</p>
              <div className="flex items-center gap-2 text-base-content/80">
                <FaMapMarkerAlt className="text-error text-xs" />
                <span className="text-sm font-medium truncate">
                  {post.area}, {post.district}
                </span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="card-actions mt-6">
            <Link
              to={`/post-details/${post._id}`}
              className="btn btn-primary btn-sm w-full group/btn rounded-[--radius-field] font-black uppercase tracking-widest text-[10px] h-10"
            >
              Examine Post
              <FaChevronRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TuitionCard;