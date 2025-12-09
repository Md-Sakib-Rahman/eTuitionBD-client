import React from "react";
import { FaMoneyBillWave, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router"; 

const TuitionCard = ({ post }) => {
  return (
    <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300">
      <div className="card-body">
        
        {/* Top Row: Medium & Date */}
        <div className="flex justify-between items-start">
          <div className="badge badge-primary badge-outline text-xs mb-2">
            {post.medium}
          </div>
          <span className="text-xs text-base-content/50">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Title & Grade */}
        <h2 className="card-title text-2xl text-primary">{post.subject}</h2>
        <p className="font-semibold text-lg">{post.classGrade}</p>

        <div className="divider my-2"></div>

        <div className="space-y-2 text-sm text-base-content/80">
          
          {/* LOCATION (Required for Challenge #4) */}
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-error" />
            <span className="capitalize">{post.area}, {post.district}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaMoneyBillWave className="text-success" />
            <span className="font-bold">{post.budget} USD</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaClock className="text-info" />
            <span>{post.duration} Hours</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="card-actions justify-end mt-4">
          <Link
            // Updated to the shared route we discussed
            to={`/post-details/${post._id}`}
            className="btn btn-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TuitionCard;