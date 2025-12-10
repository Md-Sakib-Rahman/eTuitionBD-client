import React, { useEffect, useState } from "react";
import { FaUserGraduate, FaEnvelope, FaPhone, FaMoneyBillWave, FaClock, FaCheckCircle, FaLock } from "react-icons/fa";
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";

const TutorSessions = () => {
  const axiosSecure = useAxiosSecure();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await axiosSecure.get("/tutor/my-sessions");
        setSessions(res.data.filter((session) => session.status ==="ongoing"));
      } catch (error) {
        console.error("Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">My Active Tuitions</h1>

      {sessions.length === 0 ? (
        <div className="text-center py-20 bg-base-200 rounded-xl">
          <FaUserGraduate className="mx-auto text-6xl text-base-content/20 mb-4" />
          <h2 className="text-2xl font-bold text-base-content/40">No Jobs Yet</h2>
          <p className="text-base-content/60 mt-2">Apply to more posts to get hired!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <div 
              key={session._id} 
              className={`card bg-base-100 shadow-xl border ${
                session.status === 'completed' ? 'border-success' : 'border-primary/20'
              }`}
            >
              <div className="card-body">
                
                 
                <div className="flex justify-between items-start mb-4">
                  <div className={`badge ${
                    session.status === 'completed' ? 'badge-success text-white' : 'badge-warning'
                  } p-3 font-bold uppercase text-xs gap-2`}>
                    {session.status === 'ongoing' ? <FaClock/> : <FaCheckCircle/>}
                    {session.status === 'ongoing' ? 'In Progress' : 'Completed'}
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-base-content/50 uppercase font-bold">Earnings</p>
                    <p className="font-bold text-xl text-primary">${session.amount}</p>
                  </div>
                </div>

               
                <div className="flex flex-col md:flex-row gap-6">
                  
                  
                  <div className="flex-1">
                    <h3 className="text-xs font-bold uppercase text-base-content/50 mb-3">Student Details</h3>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="avatar">
                        <div className="w-10 rounded-full">
                          <img src={session.studentId?.image || "https://via.placeholder.com/50"} alt="Student" />
                        </div>
                      </div>
                      <div>
                        <p className="font-bold">{session.studentId?.name}</p>
                        <p className="text-xs text-base-content/60">ID: {session.studentId?._id.slice(-4)}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-base-content/70">
                        <FaEnvelope className="text-xs" /> {session.studentId?.email}
                        </div>
                        {session.studentId?.phone && (
                            <div className="flex items-center gap-2 text-sm text-base-content/70">
                            <FaPhone className="text-xs" /> {session.studentId.phone}
                            </div>
                        )}
                    </div>
                  </div>

                   
                  <div className="flex-1 border-l pl-0 md:pl-6 border-base-200">
                    <h3 className="text-xs font-bold uppercase text-base-content/50 mb-3">Class Details</h3>
                    <h2 className="text-lg font-bold">{session.postId?.subject}</h2>
                    <p className="text-sm">{session.postId?.classGrade}</p>
                    <p className="text-sm text-base-content/60 mt-1">
                        Duration: {session.postId?.duration} hours
                    </p>
                  </div>
                </div>
 
                <div className="mt-6 pt-4 border-t border-base-200 bg-base-200/30 -mx-8 -mb-8 p-4 rounded-b-xl flex items-center justify-between">
                    {session.status === 'ongoing' ? (
                        <div className="flex items-center gap-2 text-warning text-sm font-semibold">
                            <FaLock /> Funds held in Escrow
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-success text-sm font-semibold">
                            <FaMoneyBillWave /> Funds Released to Wallet
                        </div>
                    )}
                    
                    {session.status === 'ongoing' && (
                        <span className="text-xs text-base-content/50 italic">
                            Waiting for student to mark complete
                        </span>
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

export default TutorSessions;