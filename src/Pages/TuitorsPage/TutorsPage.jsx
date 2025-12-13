import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react"; 
import { Link } from "react-router"; 
import useAxiosSecure from "../../AxiosInstance/AxiosSecureInstance";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, 
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.4, ease: "easeOut" } 
  },
};

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true); 
      try {
        
        const res = await axiosSecure.get(`/all-tutors?page=${currentPage}&limit=8`);
        
        
        setTutors(res.data.tutors);
        setTotalPages(res.data.totalPages);
        
      } catch (err) {
        console.error("Failed to fetch tutors", err);
      } finally {
        setLoading(false);
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    fetchTutors();
  }, [axiosSecure, currentPage]); 

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <div className="min-h-[calc(100vh-230px)] bg-base-200 py-10 px-4 md:px-10">
      
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-12 text-center"
      >
        <h1 className="text-4xl font-bold text-primary mb-4">Find Your Perfect Tutor</h1>
        <p className="text-base-content/70 mb-8 max-w-2xl mx-auto">
          Browse our verified educators and find the right match for your academic goals.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center h-96 items-center">
           <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          >
            <AnimatePresence mode="wait">
              {tutors.length > 0 ? (
                tutors.map((tutor) => (
                  <TutorCard key={tutor._id} tutor={tutor} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full text-center text-lg text-gray-500 py-10"
                >
                  No tutors found available at the moment.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {tutors.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="join grid grid-cols-3 bg-base-100 shadow-md">
                <button 
                  onClick={handlePrev} 
                  disabled={currentPage === 1}
                  className="join-item btn btn-outline btn-primary"
                >
                  Previous
                </button>
                <button className="join-item btn btn-outline btn-primary no-animation cursor-default hover:bg-transparent hover:text-primary">
                  Page {currentPage} of {totalPages}
                </button>
                <button 
                  onClick={handleNext} 
                  disabled={currentPage === totalPages}
                  className="join-item btn btn-outline btn-primary"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const TutorCard = ({ tutor }) => {
  const { name, image, tutorData } = tutor;
  const location = tutorData?.address || "Online"; 

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -10, 
        boxShadow: "0px 15px 30px rgba(0,0,0,0.15)",
        scale: 1.02
      }}
      className="card bg-base-100  shadow-md hover:shadow-xl border border-base-300 overflow-hidden flex flex-col h-full"
    >
      <figure className="relative h-52 w-full bg-gray-100">
        <img
          src={image || "https://placehold.co/400x300?text=No+Image"}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-2 right-2 badge badge-accent text-white shadow-sm font-semibold">
           {tutorData?.hourlyRate ? `${tutorData.hourlyRate} usd/hr` : "Negotiable"}
        </div>
      </figure>

      <div className="card-body p-5 flex flex-col flex-grow">
        <h2 className="card-title text-xl font-bold text-primary leading-tight">
          {name}
        </h2>
        
        <p className="text-sm text-gray-500 flex items-center gap-1">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
           </svg>
          {location}
        </p>

        <div className="divider my-2"></div>

        <div className="text-sm space-y-2 flex-grow">
            {tutorData?.qualifications && (
                <div className="flex items-start gap-2">
                    <span className="font-semibold w-24 shrink-0">Qualification:</span>
                    <span className="text-gray-600 truncate">{tutorData.qualifications}</span>
                </div>
            )}
            
            {tutorData?.experience && (
                <div className="flex items-center gap-2">
                     <span className="font-semibold w-24 shrink-0">Experience:</span>
                     <span className="badge badge-ghost badge-sm">{tutorData.experience} Years</span>
                </div>
            )}

            <div className="flex flex-col gap-1 mt-3">
                <span className="font-semibold text-xs uppercase tracking-wider text-gray-400">Expertise</span>
                <div className="flex flex-wrap gap-1">
                    {tutorData?.subjects?.length > 0 ? (
                        tutorData.subjects.slice(0, 4).map((sub, index) => (
                            <span key={index} className="badge badge-primary badge-outline badge-xs py-2">
                                {sub}
                            </span>
                        ))
                    ) : (
                        <span className="text-xs text-gray-400 italic">No specific subjects listed</span>
                    )}
                </div>
            </div>
        </div>

        <div className="card-actions justify-end mt-6 ">
          <Link to={`/tutor/${tutor._id}`} className="btn btn-primary btn-sm w-full text-white">
            View Full Profile
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorsPage;