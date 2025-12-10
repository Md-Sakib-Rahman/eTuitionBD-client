import React, { useContext, useEffect, useState } from "react";
import { CgDanger } from "react-icons/cg";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaEdit,
  FaChalkboardTeacher,
  FaStar,
  FaMoneyBillWave,
  FaClock,
  FaBookOpen,
  FaWallet,
  FaCheckCircle
} from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { Link } from "react-router"; 
import useAxiosSecure from "../../../AxiosInstance/AxiosSecureInstance";

const TutorOverView = () => {
  const { userData, loader } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  
  const [stats, setStats] = useState({
    pendingBalance: 0,
    totalEarnings: 0,
    activeJobCount: 0,
    completedJobCount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (userData?.role === 'tutor') {
        try {
          const res = await axiosSecure.get('/tutor/stats');
          setStats(res.data);
        } catch (error) {
          console.error("Failed to load stats", error);
        }
      }
    };
    fetchStats();
  }, [userData, axiosSecure]);

  if (loader) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  
  const { displayName, photoURL, email, role, tutorData } = userData || {};

  const isProfileIncomplete = 
    !tutorData?.subjects || 
    tutorData?.subjects.length === 0 || 
    !tutorData?.hourlyRate;

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-10">

      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
            <h1 className="text-3xl font-bold text-base-content">
            Hello, <span className="text-primary">{displayName?.split(" ")[0]}!</span> 👋
            </h1>
            <p className="text-base-content/70 mt-1">Here is your professional dashboard.</p>
        </div>
        <div className="flex gap-2">
            <div className="badge badge-lg badge-primary gap-2">
                <FaWallet /> Earned: ${stats.totalEarnings}
            </div>
            <div className="badge badge-lg badge-outline gap-2">
                <FaClock /> Pending: ${stats.pendingBalance}
            </div>
        </div>
      </div>

      
      {isProfileIncomplete && (
        <div className="alert alert-warning shadow-md mb-10 flex-col md:flex-row items-start md:items-center gap-4">
          <CgDanger className="text-3xl shrink-0" />
          <div className="flex-1">
            <h3 className="font-bold text-lg">Your Tutor Profile is Incomplete!</h3>
            <div className="text-sm">
              You are currently hidden from students. Please add your <strong>Subjects</strong> and <strong>Hourly Rate</strong>.
            </div>
          </div>
          <Link to="/tutor-dashboard/profile"
            className="btn btn-sm btn-outline border-black text-black hover:bg-black hover:text-white shrink-0">
            Complete Profile
          </Link>
        </div>
      )}

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        
        <div className="lg:col-span-1">
          <div className="card bg-base-200 shadow-xl border border-base-300">
            <div className="card-body items-center text-center">

              
              <div className="avatar mb-4">
                <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img referrerPolicy="no-referrer" src={photoURL || "https://via.placeholder.com/150"} alt="Profile" />
                </div>
              </div>

              <h2 className="card-title text-2xl">{displayName}</h2>
              <div className="badge badge-secondary badge-outline mt-1 capitalize">{role || "Tutor"}</div>

             
              <div className="flex items-center gap-2 mt-3 bg-base-100 px-3 py-1 rounded-full border border-base-300">
                <FaStar className="text-yellow-500" />
                <span className="font-bold">{tutorData?.averageRating || 0}</span>
                <span className="text-xs text-base-content/60">/ 5.0</span>
              </div>

              <div className="w-full border-t border-base-content/10 my-6"></div>

             
              <div className="w-full flex flex-col gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <FaEnvelope />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-base-content/60">Email</p>
                    <p className="text-sm font-semibold truncate" title={email}>{email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <FaPhone />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60">Phone</p>
                    <p className="text-sm font-semibold">{tutorData?.phone || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="card-actions w-full mt-6">
                <Link to="/tutor-dashboard/profile" className="btn btn-primary w-full gap-2">
                  <FaEdit /> Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        
        <div className="lg:col-span-2 flex flex-col gap-8">

         
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             <div className="stats shadow bg-base-100 border border-base-200">
                <div className="stat p-4">
                    <div className="stat-figure text-primary">
                        <FaChalkboardTeacher className="text-2xl" />
                    </div>
                    <div className="stat-title text-xs">Active Jobs</div>
                    <div className="stat-value text-primary text-2xl">{stats.activeJobCount}</div>
                </div>
             </div>
             
             <div className="stats shadow bg-base-100 border border-base-200">
                <div className="stat p-4">
                    <div className="stat-figure text-success">
                        <FaCheckCircle className="text-2xl" />
                    </div>
                    <div className="stat-title text-xs">Completed</div>
                    <div className="stat-value text-success text-2xl">{stats.completedJobCount}</div>
                </div>
             </div>

             <div className="stats shadow bg-base-100 border border-base-200">
                <div className="stat p-4">
                    <div className="stat-figure text-secondary">
                        <FaWallet className="text-2xl" />
                    </div>
                    <div className="stat-title text-xs">Earnings</div>
                    <div className="stat-value text-secondary text-xl">${stats.totalEarnings}</div>
                </div>
             </div>

             <div className="stats shadow bg-base-100 border border-base-200">
                <div className="stat p-4">
                    <div className="stat-figure text-warning">
                        <FaClock className="text-2xl" />
                    </div>
                    <div className="stat-title text-xs">Pending</div>
                    <div className="stat-value text-warning text-xl">${stats.pendingBalance}</div>
                </div>
             </div>
          </div>

          
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h3 className="card-title flex items-center gap-2">
                   Professional Info
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
               
                <div className="p-4 bg-base-200 rounded-xl">
                  <p className="text-sm text-base-content/60 mb-1">Qualification</p>
                  <p className="font-bold text-lg">{tutorData?.qualifications || "Not Set"}</p>
                </div>

               
                <div className="p-4 bg-base-200 rounded-xl">
                  <p className="text-sm text-base-content/60 mb-1 flex items-center gap-1">
                     <FaClock className="text-xs"/> Experience
                  </p>
                  <p className="font-bold text-lg">{tutorData?.experience ? `${tutorData.experience} Years` : "Not Set"}</p>
                </div>

               
                <div className="p-4 bg-base-200 rounded-xl border border-primary/20">
                  <p className="text-sm text-base-content/60 mb-1 flex items-center gap-1">
                    <FaMoneyBillWave className="text-success"/> Hourly Rate
                  </p>
                  <p className="font-bold text-xl text-primary">
                    {tutorData?.hourlyRate ? `৳ ${tutorData.hourlyRate} / hr` : "Not Set"}
                  </p>
                </div>

               
                <div className="p-4 bg-base-200 rounded-xl">
                    <p className="text-sm text-base-content/60 mb-1">Preferred Location</p>
                    <p className="font-bold text-lg flex items-center gap-2">
                        <FaMapMarkerAlt className="text-error" /> 
                        {tutorData?.address || "No address provided"}
                    </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-lg border border-base-200">
             <div className="card-body">
                <h3 className="card-title flex items-center gap-2 mb-2">
                    <FaBookOpen className="text-secondary"/> Expertise & Bio
                </h3>
                
               
                <div className="mb-4">
                    <h4 className="font-semibold text-sm text-base-content/70 mb-1">About Me</h4>
                    <p className="text-base-content/80 text-sm leading-relaxed">
                        {tutorData?.bio || "No bio added yet. Tell students about your teaching style!"}
                    </p>
                </div>

               
                <div>
                    <h4 className="font-semibold text-sm text-base-content/70 mb-2">Subjects I Teach</h4>
                    <div className="flex flex-wrap gap-2">
                        {tutorData?.subjects && tutorData.subjects.length > 0 ? (
                            tutorData.subjects.map((sub, index) => (
                                <span key={index} className="badge badge-primary badge-outline p-3">
                                    {sub}
                                </span>
                            ))
                        ) : (
                            <span className="badge badge-ghost">No subjects listed</span>
                        )}
                    </div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TutorOverView;
