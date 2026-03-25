import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContextProvider";
import { Link } from "react-router";
import { FaClock, FaBookOpen, FaChevronRight, FaMapMarkerAlt } from "react-icons/fa";

const MinimalCard = ({ post }) => {
  const { userData } = useContext(AuthContext);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group relative w-full max-w-md mx-auto my-6"
    >
      {/* Background Glow Effect on Hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-30 transition duration-500 blur-sm rounded-[--radius-box]"></div>

      <div className="relative card bg-base-200 border border-white/10 rounded-[--radius-box] shadow overflow-hidden">
        <div className="card-body p-6">
          
          {/* Header: User Info & Budget Badge */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="w-10 rounded-full ring-2 ring-primary ring-offset-base-100 ring-offset-2">
                  <img src={post.studentId?.image} alt={post.studentId?.name} />
                </div>
              </div>
              <div>
                <h3 className="text-base font-bold text-sm tracking-tight">
                  {post.studentId?.name}
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
                  Student Post
                </span>
              </div>
            </div>
            <div className="badge badge-primary badge-outline font-black text-xs py-3 px-3">
              ${post.budget}/mo
            </div>
          </div>

          {/* Body: Subject & Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-primary/10 text-primary">
                <FaBookOpen className="text-sm" />
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold leading-none mb-1">Subject</p>
                <p className="text-base font-medium text-sm leading-none">{post.subject}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-accent/10 text-accent">
                <FaClock className="text-sm" />
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold leading-none mb-1">Duration</p>
                <p className="text-base font-medium text-sm leading-none">{post.duration} hours</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-secondary/10 text-secondary">
                <FaMapMarkerAlt className="text-sm" />
              </div>
              <div>
                <p className="text-[10px] uppercase text-gray-500 font-bold leading-none mb-1">Location</p>
                <p className="text-base font-medium text-sm leading-none">{post.area || "Remote"}</p>
              </div>
            </div>
          </div>

          {/* Footer: Action */}
          <div className="card-actions mt-6">
            <Link 
              to={userData ? "/tuitions" : "/login"}
              className="group/btn btn btn-primary btn-sm w-full rounded-[--radius-field] flex items-center justify-center gap-2 font-bold uppercase tracking-tighter"
            >
              Details
              <FaChevronRight className="text-[10px] group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default MinimalCard;