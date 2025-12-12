import React, { useEffect, useState } from "react";
import { FaTrash, FaClock, FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";
import { Link } from "react-router";

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
      console.log(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to withdraw this application?"))
      return;

    try {
      const res = await axiosSecure.delete(`/my-applications/${id}`);
      if (res.data.success) {
        toast.success("Application withdrawn");

        setApplications((prev) => prev.filter((app) => app._id !== id));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center h-screen items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  const activeApplication = applications.filter(
    (a) => a.status === "pending" 
  );
  const bookedApplication = applications.filter((a) => a.status === "accepted" && a.postId.status !== "completed");
  const completedApplication = applications.filter((a) => a.postId.status === "completed");

  const ApplicationTable = ({data}) => {
    if (data.length == 0) {
      return (
        <div className="p-6 text-center text-base-content/50 italic">
          No posts in this section.
        </div>
      );
    }
    return (
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr className="bg-base-200/50">
              <th>#</th>
              <th>Job Subject</th>
              <th>Grade</th>
              <th>Budget</th>
              <th>Status</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((application) => (
              <tr key={application._id} className="hover:bg-base-100">
                <td className="font-bold">
                  {application.postId?.subject}
                  <Link
                    to={`/tutor-dashboard/post-details/${application?.postId._id}`}
                    className="ml-2 text-xs text-primary btn btn-ghost btn-xs"
                  >
                    <FaEye /> View
                  </Link>
                </td>
                <td>{application.postId?.classGrade}</td>
                <td>${application.postId?.budget}</td>
                <td>
                  <span
                    className={`badge badge-sm ${
                      application.status === "pending"
                        ? "badge-success"
                        : application.status === "rejected"
                        ? "badge-warning"
                        : application.status === "accepted"
                        ? "badge-info"
                        : "badge-ghost"
                    }`}
                  >
                    {application.status === "accepted"
                      ? `Booked`
                      : application.status}
                  </span>
                </td>

                <td>
                  {application.status === "pending" ? (
                    
                    <button
                      onClick={() => handleCancel(application._id)}
                      className="btn btn-sm btn-ghost text-error"
                      title="Withdraw Application"
                    >
                      <FaTrash /> Cancel
                    </button>
                  ) : (
                    <span className="text-xs opacity-50">Locked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  return (
    <div className="w-[95%] mx-auto text-sm p-6 md:p-10">
      
      
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">My Application Posts</h1>
        
      </div>

      <div className="space-y-6">

        
        <div className="collapse collapse-arrow bg-base-100 border border-base-300 shadow-sm">
          <input type="checkbox" defaultChecked /> 
          <div className="collapse-title text-lg font-medium bg-base-200 text-primary">
            Pending Aplications ({activeApplication.length})
          </div>
          <div className="collapse-content p-0">
            <ApplicationTable data={activeApplication} />
          </div>
        </div>

        {/* 2. Booked / Ongoing Posts (Tutor Hired) */}
        <div className="collapse collapse-arrow bg-base-200 border border-base-300 shadow-sm">
          <input type="checkbox" defaultChecked /> 
          <div className="collapse-title text-lg font-medium  text-primary">
             Ongoing / Booked Applications ({bookedApplication.length})
          </div>
          <div className="collapse-content p-0">
            <ApplicationTable data={bookedApplication}  />
          </div>
        </div>

        
        <div className="collapse collapse-arrow  border border-base-300 shadow-sm opacity-80">
          <input type="checkbox" /> 
          <div className="collapse-title text-lg font-medium text-base-content">
             Completed Aplication History ({completedApplication.length})
          </div>
          <div className="collapse-content p-0">
            <ApplicationTable data={completedApplication}  />
          </div>
        </div>

      </div>
    </div>



  );
};

export default MyApplications;
