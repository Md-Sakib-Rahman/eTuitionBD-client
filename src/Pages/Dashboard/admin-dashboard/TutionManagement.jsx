import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router"; 
import { FaFilter, FaEye, FaChalkboardTeacher } from "react-icons/fa";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";

const TutionManagement = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("all"); 

  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosSecure.get("/admin/tuitions");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch tuitions", err);
        toast.error("Failed to load tuition data");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [axiosSecure]);

 
  const filteredPosts = posts.filter((post) => {
    if (filterStatus === "all") return true;
    return post.status === filterStatus;
  });

  const handleViewDetails = (id) => {
    navigate(`/admin-dashboard/admin-tuition-overview/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      
      
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FaChalkboardTeacher className="text-primary" /> Tuition Management
          </h1>
          <p className="text-base-content/60 mt-1">
            Review and manage student job postings.
          </p>
        </div>

        
        <div className="join shadow-sm">
          <input 
            className="join-item btn btn-sm" 
            type="radio" 
            name="options" 
            aria-label="All" 
            checked={filterStatus === 'all'}
            onChange={() => setFilterStatus('all')}
          />
          <input 
            className="join-item btn btn-sm btn-warning" 
            type="radio" 
            name="options" 
            aria-label="Pending" 
            checked={filterStatus === 'pending'}
            onChange={() => setFilterStatus('pending')}
          />
          <input 
            className="join-item btn btn-sm btn-success text-white" 
            type="radio" 
            name="options" 
            aria-label="Approved" 
            checked={filterStatus === 'approved'}
            onChange={() => setFilterStatus('approved')}
          />
          <input 
            className="join-item btn btn-sm btn-error text-white" 
            type="radio" 
            name="options" 
            aria-label="Rejected" 
            checked={filterStatus === 'rejected'}
            onChange={() => setFilterStatus('rejected')}
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-2xl border border-base-200">
        <table className="table">
       
          <thead className="bg-base-200 text-base-content/70">
            <tr>
              <th>#</th>
              <th>Job Info</th>
              <th>Student</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Posted Date</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-base-content/50">
                  No tuitions found for this filter.
                </td>
              </tr>
            ) : (
              filteredPosts.map((post, index) => (
                <tr 
                  key={post._id} 
                  className="hover:bg-base-200/50 cursor-pointer transition-colors"
                  onClick={() => handleViewDetails(post._id)}
                >
                  <th>{index + 1}</th>
                  
                  <td>
                    <div className="font-bold">{post.subject}</div>
                    <div className="text-xs opacity-50">{post.classGrade} ({post.medium})</div>
                  </td>

                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-8 h-8">
                          <img 
                            src={post.studentId?.image || "https://via.placeholder.com/40"} 
                            alt="Student" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div className="text-sm">
                        {post.studentId?.name || "Unknown"}
                      </div>
                    </div>
                  </td>

                  <td className="font-mono font-semibold">
                    ${post.budget}
                  </td>

                  <td>
                    <span className={`badge badge-sm font-semibold capitalize ${
                        post.status === 'approved' ? 'badge-success text-white' :
                        post.status === 'rejected' ? 'badge-error text-white' :
                        post.status === 'pending' ? 'badge-warning' :
                        'badge-ghost'
                    }`}>
                        {post.status}
                    </span>
                  </td>

                  <td className="text-sm text-base-content/60">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>

                  <td className="text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); 
                        handleViewDetails(post._id);
                      }}
                      className="btn btn-ghost btn-xs text-primary"
                    >
                      <FaEye /> Review
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TutionManagement;