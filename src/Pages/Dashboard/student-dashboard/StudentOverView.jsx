import React, { useContext } from "react";
import { CgDanger } from "react-icons/cg";
import { 
  FaUserGraduate, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaEdit 
} from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContextProvider";
import { Link } from "react-router";

const StudentOverView = () => {
  const { userData, loader } = useContext(AuthContext);

  
  if (loader) {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  
  const { displayName, photoURL, email, role, studentData } = userData || {};
  
 
  const isProfileIncomplete = !studentData?.institute || !studentData?.grade;

  return (
    <div className="min-h-screen bg-base-100 p-6 md:p-10">
      
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-base-content">
          Welcome back, <span className="text-primary">{displayName?.split(" ")[0]}!</span> 👋
        </h1>
        <p className="text-base-content/70 mt-1">Here is your academic overview.</p>
      </div>

    
      {isProfileIncomplete && (
        <div className="alert alert-warning shadow-md mb-10 flex-col md:flex-row items-start md:items-center gap-4">
          <CgDanger className="text-3xl shrink-0" />
          <div className="flex-1">
            <h3 className="font-bold text-lg">Your profile is incomplete!</h3>
            <div className="text-sm">
              Please update your academic details (Grade, Institute) to get better tutor recommendations.
            </div>
          </div>
          <Link to="/student-dashboard/profile" 
           className="btn btn-sm btn-outline border-black text-black hover:bg-black hover:text-white shrink-0">
            Complete Profile
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1 max-lg:h-[500px] ">
          <div className="card bg-base-200 shadow-xl border border-base-300">
            <div className="card-body items-center text-center">
              
              <div className="avatar mb-4">
                <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img referrerPolicy="no-referrer" src={photoURL || "https://via.placeholder.com/150"} alt="Profile" />
                </div>
              </div>
              
              <h2 className="card-title text-2xl">{displayName}</h2>
              <div className="badge badge-secondary badge-outline mt-1 capitalize">{role || "Student"}</div>
              
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
                        <p className="text-sm font-semibold">{studentData?.phone || "N/A"}</p>
                    </div>
                </div>
              </div>

              <div className="card-actions w-full mt-6">
                <Link to="/student-dashboard/profile" className="btn btn-primary w-full gap-2">
                    <FaEdit /> Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col justify-between gap-8 lg:h-[500px]  pb-5">
          
          <div className="card bg-base-100 shadow-lg border border-base-200">
            <div className="card-body">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="card-title flex items-center gap-2">
                        <FaUserGraduate className="text-primary"/> Academic Information
                    </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 bg-base-200 rounded-xl">
                        <p className="text-sm text-base-content/60 mb-1">Institution</p>
                        <p className="font-bold text-lg">{studentData?.institute || "Not Set"}</p>
                    </div>
                    <div className="p-4 bg-base-200 rounded-xl">
                        <p className="text-sm text-base-content/60 mb-1">Class / Grade</p>
                        <p className="font-bold text-lg">{studentData?.grade || "Not Set"}</p>
                    </div>
                    <div className="p-4 bg-base-200 rounded-xl md:col-span-2">
                        <p className="text-sm text-base-content/60 mb-1">Address</p>
                        <p className="font-bold text-lg flex items-center gap-2">
                            <FaMapMarkerAlt className="text-error" /> 
                            {studentData?.address || "No address provided"}
                        </p>
                    </div>
                </div>
            </div>
          </div>

          <div className="stats shadow w-full bg-base-100 border border-base-200 stats-vertical lg:stats-horizontal ">
            
            <div className="stat">
                <div className="stat-figure text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="stat-title">Bookings</div>
                <div className="stat-value text-primary">0</div>
                <div className="stat-desc">Pending sessions</div>
            </div>
            
            <div className="stat">
                <div className="stat-figure text-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                </div>
                <div className="stat-title">Status</div>
                <div className="stat-value text-secondary">Active</div>
                <div className="stat-desc">Account verified</div>
            </div>
            
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentOverView;

