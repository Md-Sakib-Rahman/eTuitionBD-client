import React, { useEffect, useState } from "react";
import { FaTrash, FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchApplications();
  }, [axiosSecure]);

  const fetchApplications = async () => {
    try {
      const res = await axiosSecure.get("/my-applications");
      setApplications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

 
  const handleCancel = async (id) => {
    if(!window.confirm("Are you sure you want to withdraw this application?")) return;

    try {
        const res = await axiosSecure.delete(`/my-applications/${id}`);
        if(res.data.success) {
            toast.success("Application withdrawn");
            
            setApplications(prev => prev.filter(app => app._id !== id));
        }
    } catch (err) {
        toast.error(err.response?.data?.message || "Failed to cancel");
    }
  };

  if (loading) return <div className="flex justify-center h-screen items-center"><span className="loading loading-spinner loading-lg"></span></div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>
      
      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-xl">
        <table className="table">
           
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Job Subject</th>
              <th>Grade</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.length === 0 ? (
                <tr><td colSpan="6" className="text-center py-6">You haven't applied to any jobs yet.</td></tr>
            ) : (
                applications.map((app, index) => (
                <tr key={app._id}>
                    <th>{index + 1}</th>
                    <td className="font-bold">
                        {app.postId?.subject || "Post Deleted"}
                    </td>
                    <td>{app.postId?.classGrade}</td>
                    <td>{app.postId?.budget} USD</td>
                    
                     
                    <td>
                        {app.status === 'pending' && <span className="badge badge-warning gap-1"><FaClock/> Pending</span>}
                        {app.status === 'accepted' && <span className="badge badge-success gap-1 text-white"><FaCheckCircle/> Hired</span>}
                        {app.status === 'rejected' && <span className="badge badge-error gap-1 text-white"><FaTimesCircle/> Rejected</span>}
                    </td>

                    
                    <td>
                        {app.status === 'pending' ? (
                             <button 
                                onClick={() => handleCancel(app._id)}
                                className="btn btn-sm btn-ghost text-error"
                                title="Withdraw Application"
                             >
                                <FaTrash /> Cancel
                             </button>
                        ) : (
                            <span className="text-xs opacity-50">No actions</span>
                        )}
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

export default MyApplications;