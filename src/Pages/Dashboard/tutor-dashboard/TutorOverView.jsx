import React, { useContext } from "react";
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
  FaBookOpen
} from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { Link } from "react-router";

const TutorOverView = () => {
  const { userData, loader } = useContext(AuthContext);

 
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

      {/* --- HEADER --- */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">
          Hello, <span className="text-primary">{displayName?.split(" ")[0]}!</span> 👋
        </h1>
        <p className="text-base-content/70 mt-1">Here is your professional dashboard.</p>
      </div>

      {/* --- ALERT BANNER  --- */}
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

      {/*MAIN GRID  */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/*  Profile Card */}
        <div className="lg:col-span-1">
          <div className="card bg-base-200 shadow-xl border border-base-300">
            <div className="card-body items-center text-center">

              {/* Avatar */}
              <div className="avatar mb-4">
                <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img referrerPolicy="no-referrer" src={photoURL || "https://via.placeholder.com/150"} alt="Profile" />
                </div>
              </div>

              <h2 className="card-title text-2xl">{displayName}</h2>
              <div className="badge badge-secondary badge-outline mt-1 capitalize">{role || "Tutor"}</div>

              {/* Rating Display  */}
              <div className="flex items-center gap-2 mt-3 bg-base-100 px-3 py-1 rounded-full border border-base-300">
                <FaStar className="text-yellow-500" />
                <span className="font-bold">{tutorData?.averageRating || 0}</span>
                <span className="text-xs text-base-content/60">/ 5.0</span>
              </div>

              <div className="w-full border-t border-base-content/10 my-6"></div>

              {/* Contact Info */}
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

        {/*  Details & Stats */}
        <div className="lg:col-span-2 flex flex-col gap-8">

          {/*  Professional Info */}
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h3 className="card-title flex items-center gap-2">
                  <FaChalkboardTeacher className="text-primary" /> Professional Info
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Qualification */}
                <div className="p-4 bg-base-200 rounded-xl">
                  <p className="text-sm text-base-content/60 mb-1">Qualification</p>
                  <p className="font-bold text-lg">{tutorData?.qualifications || "Not Set"}</p>
                </div>

                {/* Experience */}
                <div className="p-4 bg-base-200 rounded-xl">
                  <p className="text-sm text-base-content/60 mb-1 flex items-center gap-1">
                     <FaClock className="text-xs"/> Experience
                  </p>
                  <p className="font-bold text-lg">{tutorData?.experience ? `${tutorData.experience} Years` : "Not Set"}</p>
                </div>

                {/* Hourly Rate */}
                <div className="p-4 bg-base-200 rounded-xl border border-primary/20">
                  <p className="text-sm text-base-content/60 mb-1 flex items-center gap-1">
                    <FaMoneyBillWave className="text-success"/> Hourly Rate
                  </p>
                  <p className="font-bold text-xl text-primary">
                    {tutorData?.hourlyRate ? `৳ ${tutorData.hourlyRate} / hr` : "Not Set"}
                  </p>
                </div>

                {/* Location */}
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

          {/* Bio & Subjects */}
          <div className="card bg-base-100 shadow-lg border border-base-200">
             <div className="card-body">
                <h3 className="card-title flex items-center gap-2 mb-2">
                    <FaBookOpen className="text-secondary"/> Expertise & Bio
                </h3>
                
                {/* Bio Section */}
                <div className="mb-4">
                    <h4 className="font-semibold text-sm text-base-content/70 mb-1">About Me</h4>
                    <p className="text-base-content/80 text-sm leading-relaxed">
                        {tutorData?.bio || "No bio added yet. Tell students about your teaching style!"}
                    </p>
                </div>

                {/* Subjects Tags */}
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

          {/* Stats Row */}
          <div className="stats shadow w-full bg-base-100 border border-base-200 stats-vertical lg:stats-horizontal">

            <div className="stat">
              <div className="stat-figure text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div className="stat-title">Active Students</div>
              <div className="stat-value text-primary">0</div>
              <div className="stat-desc">Current bookings</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
              </div>
              <div className="stat-title">Profile Status</div>
              <div className="stat-value text-secondary text-2xl capitalize">{userData?.status || "Active"}</div>
              <div className="stat-desc">Visible to students</div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default TutorOverView;