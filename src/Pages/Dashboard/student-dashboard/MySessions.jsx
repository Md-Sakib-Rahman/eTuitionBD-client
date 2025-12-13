import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaChalkboardTeacher, FaEnvelope, FaClock } from "react-icons/fa";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MySessions = () => {
  const axiosSecure = useAxiosSecure();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axiosSecure.get("/my-sessions");
        setSessions(res.data.filter((session) => session.status ==="ongoing"));
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [axiosSecure]);

  
  const handleCompleteSession = async (sessionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Complete !",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
      const res = await axiosSecure.patch(`/sessions/${sessionId}/complete`);
      
      if (res.data.success) {
        toast.success("Session completed! Funds released.");
        
        
        setSessions((prevSessions) =>
          prevSessions.map((session) =>
            session._id === sessionId
              ? { ...session, status: "completed", isMoneyReleased: true }
              : session
          )
        );
      }
    } catch (error) {
      console.error("Completion Error:", error);
      toast.error(error.response?.data?.message || "Failed to complete session");
    }
        
      }
    });

    

    // try {
    //   const res = await axiosSecure.patch(`/sessions/${sessionId}/complete`);
      
    //   if (res.data.success) {
    //     toast.success("Session completed! Funds released.");
        
        
    //     setSessions((prevSessions) =>
    //       prevSessions.map((session) =>
    //         session._id === sessionId
    //           ? { ...session, status: "completed", isMoneyReleased: true }
    //           : session
    //       )
    //     );
    //   }
    // } catch (error) {
    //   console.error("Completion Error:", error);
    //   toast.error(error.response?.data?.message || "Failed to complete session");
    // }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">My Tuition Sessions</h1>

      {sessions.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-xl">
          <FaChalkboardTeacher className="mx-auto text-6xl text-base-content/20 mb-4" />
          <h2 className="text-2xl font-bold text-base-content/40">No Active Sessions</h2>
          <p className="text-base-content/60 mt-2">You haven't hired any tutors yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <div 
              key={session._id} 
              className={`card bg-base-100 shadow-xl border ${
                session.status === 'completed' ? 'border-success' : 'border-base-300'
              }`}
            >
              <div className="card-body">
                
                <div className="flex justify-between items-start">
                  <div className={`badge ${
                    session.status === 'completed' ? 'badge-success text-white' : 'badge-primary'
                  } p-3 font-bold uppercase text-xs mb-4`}>
                    {session.status === 'ongoing' ? 'In Progress' : 'Completed'}
                  </div>
                  <span className="text-xs text-base-content/50 font-mono">
                    ID: {session._id.slice(-6)}
                  </span>
                </div>

               
                <div className="flex flex-col md:flex-row gap-6">
                  
                 
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase text-base-content/50 mb-2">Tutor Details</h3>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img src={session.tutorId?.image} alt="Tutor" />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold text-lg">{session.tutorId?.name}</p>
                        <div className="flex items-center gap-1 text-sm text-base-content/60">
                          <FaEnvelope className="text-xs" /> {session.tutorId?.email}
                        </div>
                      </div>
                    </div>
                  </div>

                 
                  <div className="flex-1 border-l pl-0 md:pl-6 border-base-200">
                    <h3 className="text-xs font-bold uppercase text-base-content/50 mb-2">Subject Details</h3>
                    <h2 className="text-xl font-bold text-primary">{session.postId?.subject}</h2>
                    <p className="font-medium">{session.postId?.classGrade}</p>
                    <p className="mt-2 font-bold text-2xl">${session.amount}</p>
                  </div>
                </div>

                
                <div className="card-actions justify-end mt-6 pt-6 border-t border-base-200">
                  {session.status === 'ongoing' ? (
                    <button 
                      onClick={() => handleCompleteSession(session._id)}
                      className="btn btn-success text-white w-full md:w-auto"
                    >
                      <FaCheckCircle /> Mark as Complete & Release Funds
                    </button>
                  ) : (
                    <button className="btn btn-disabled w-full md:w-auto gap-2">
                      <FaCheckCircle className="text-success" /> Funds Released
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MySessions;