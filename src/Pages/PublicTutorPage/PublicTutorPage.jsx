import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios"; 
import { AuthContext } from "../../Context/AuthContextProvider";
import Swal from "sweetalert2";
import { motion } from "motion/react";

const PublicTutorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData, user } = useContext(AuthContext); 
  
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchTutor = async () => {
      try {
         
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/public-tutors/${id}`);
        setTutor(response.data);
      } catch (error) {
        console.error("Error fetching tutor:", error);
        Swal.fire({
            icon: "error",
            title: "Unavailable",
            text: "This tutor profile could not be found."
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  // 2. Handle Connection Logic
  const handleConnect = () => {
    // A. Check if user is logged in
    if (!userData) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "You need to login to connect with a tutor.",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
            
            navigate("/login", { state: { from: `/tutor/${id}` } });
        }
      });
      return;
    }

    // B. Check if they are trying to connect with themselves
    if (userData?.email === tutor.email) {
         Swal.fire({
            icon: "info",
            title: "That's You!",
            text: "You cannot connect with your own profile.",
        });
        return;
    }

    // C. Success (Here you would typically open a modal or API call)
    Swal.fire({
        icon: "success",
        title: "Request Initiated",
        text: `We have notified ${tutor.name} about your interest!`,
        confirmButtonColor: "#10b981",
    });
  };

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (!tutor) return (
     <div className="min-h-screen flex flex-col justify-center items-center bg-base-200 gap-4">
        <h2 className="text-2xl font-bold text-error">Tutor Not Found</h2>
        <button onClick={() => navigate(-1)} className="btn btn-outline">Go Back</button>
     </div>
  );

  // Destructure Data
  const { name, image, tutorData } = tutor;

  return (
    <div className="min-h-[calc(100h-230px)] bg-base-200 py-20 mb-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto bg-base-100 rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Banner */}
        <div className="h-48 bg-gradient-to-r from-primary to-accent relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="px-8 pb-10">
          {/* Header Section */}
          <div className="relative -top-16 flex flex-col max-md:justify-center md:flex-row items-end gap-6 mb-[-2rem] md:mb-6">
            <img 
              src={image || "https://placehold.co/150x150"} 
              alt={name}
              className="w-40 mx-auto h-40 rounded-3xl border-4 border-base-100 shadow-2xl object-cover bg-white"
            />
            
            <div className="flex-1 text-center md:text-left mb-4 md:mb-2 w-full">
              <h1 className="text-4xl font-bold text-base-content">{name}</h1>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-2 text-gray-500">
                <span className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                    {tutorData?.address || "Location Hidden"}
                </span>
                <span className="hidden md:inline">•</span>
                <span className="text-primary font-semibold">
                    {tutorData?.hourlyRate ? `${tutorData.hourlyRate} USD/hr` : "Negotiable"}
                </span>
              </div>
            </div>

            {/* THE CONNECT BUTTON */}
            <div className="mb-4 md:mb-2 w-full md:w-auto">
                <button 
                    onClick={handleConnect}
                    className="btn btn-primary btn-lg w-full md:w-auto rounded-full shadow-lg hover:shadow-primary/50 transition-all hover:scale-105"
                >
                    Connect Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </button>
            </div>
          </div>

          <div className="divider mt-16"></div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Sidebar */}
            <div className="space-y-6">
                <div className="card bg-base-200 p-6 rounded-2xl">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Qualifications</h3>
                    <p className="font-semibold text-lg">{tutorData?.qualifications || "N/A"}</p>
                    <p className="text-gray-500">{tutorData?.university}</p>
                </div>

                <div className="card bg-base-200 p-6 rounded-2xl">
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Experience</h3>
                    <p className="font-semibold text-lg">{tutorData?.experience || 0} Years</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        About Me
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        {tutorData?.bio || "This tutor hasn't added a bio yet."}
                    </p>
                </section>

                <section>
                    <h2 className="text-2xl font-bold mb-4">Areas of Expertise</h2>
                    <div className="flex flex-wrap gap-2">
                        {tutorData?.subjects?.length > 0 ? (
                            tutorData.subjects.map((sub, i) => (
                                <span key={i} className="badge badge-lg badge-primary badge-outline px-4 py-3">
                                    {sub}
                                </span>
                            ))
                        ) : (
                            <span className="italic text-gray-400">No subjects listed</span>
                        )}
                    </div>
                </section>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PublicTutorPage;