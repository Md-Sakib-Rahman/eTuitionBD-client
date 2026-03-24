import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { Link } from "react-router"; 
import useAxiosSecure from "../../AxiosInstance/AxiosSecureInstance";
import { FaGraduationCap, FaMapMarkerAlt, FaStar, FaChevronLeft, FaChevronRight, FaSearch, FaUserTie } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-base-100">
        <span className="loading loading-ring loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-24 px-6 lg:px-12 relative overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-16 text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4"
          >
            Elite Faculty
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl md:text-6xl font-black text-base-content tracking-tighter mb-4"
          >
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Expert Mentor.</span>
          </motion.h1>
          <p className="text-base-content/50 max-w-2xl font-medium">
            Connect with verified educators selected through a rigorous screening process to ensure your academic success.
          </p>
        </header>

        {/* Tutors Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="wait">
            {tutors.length > 0 ? (
              tutors.map((tutor) => (
                <TutorCard key={tutor._id} tutor={tutor} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-base-200/50 rounded-3xl border border-dashed border-white/10">
                 <FaUserTie className="text-4xl text-gray-500 mx-auto mb-4" />
                 <h3 className="text-xl font-bold">No Educators Found</h3>
                 <p className="text-sm text-base-content/40">Check back later for new updates.</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Professional Pagination */}
        {tutors.length > 0 && (
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <p className="text-[10px] uppercase font-black text-base-content/30 tracking-[0.3em]">
              Viewing Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentPage(p => p - 1)} 
                disabled={currentPage === 1}
                className="btn btn-square btn-outline border-white/10 hover:bg-primary hover:border-primary disabled:opacity-20"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              
              <div className="px-6 py-2 bg-base-200 border border-white/5 rounded-xl font-black text-sm text-primary">
                {currentPage}
              </div>

              <button 
                onClick={() => setCurrentPage(p => p + 1)} 
                disabled={currentPage === totalPages}
                className="btn btn-square btn-outline border-white/10 hover:bg-primary hover:border-primary disabled:opacity-20"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* --- Refined Tutor Card Component --- */
const TutorCard = ({ tutor }) => {
  const { _id, name, image, tutorData } = tutor;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative h-full flex flex-col"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-b from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 blur-sm rounded-[--radius-box]"></div>
      
      <div className="relative card bg-base-200 border border-white/5 rounded-[--radius-box] shadow-xl overflow-hidden flex flex-col h-full transition-all duration-300">
        
        {/* Profile Image with Overlay */}
        <figure className="relative h-56 w-full overflow-hidden bg-base-300">
          <img
            src={image || "https://i.pravatar.cc/400"}
            alt={name}
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-transparent to-transparent opacity-60"></div>
          
          <div className="absolute top-3 right-3">
            <div className="badge badge-primary font-black text-[10px] py-3 px-3 shadow-lg">
               ${tutorData?.hourlyRate || "20"}/hr
            </div>
          </div>
        </figure>

        <div className="card-body p-6 flex flex-col flex-grow">
          {/* Identity */}
          <div className="mb-4">
            <h2 className="text-xl font-black text-base-content tracking-tighter group-hover:text-primary transition-colors leading-tight">
              {name}
            </h2>
            <div className="flex items-center gap-2 mt-1 text-base-content/50">
              <FaMapMarkerAlt className="text-error text-[10px]" />
              <span className="text-xs font-bold uppercase tracking-wider">{tutorData?.address || "Global"}</span>
            </div>
          </div>

          <div className="space-y-4 flex-grow">
            {/* Qualification Box */}
            <div className="p-3 rounded-xl bg-base-100/50 border border-white/5">
              <div className="flex items-center gap-2 mb-1">
                <FaGraduationCap className="text-primary text-xs" />
                <span className="text-[10px] uppercase font-black text-gray-500 tracking-widest">Expertise</span>
              </div>
              <p className="text-xs font-bold text-base-content/80 line-clamp-1">
                {tutorData?.qualifications || "Professional Educator"}
              </p>
            </div>

            {/* Subjects Chips */}
            <div className="flex flex-wrap gap-1.5">
              {tutorData?.subjects?.slice(0, 3).map((sub, i) => (
                <span key={i} className="text-[9px] font-black uppercase tracking-tighter px-2 py-1 rounded bg-secondary/10 text-secondary border border-secondary/20">
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-6 mt-4 border-t border-white/5">
            <Link 
              to={`/tutor/${_id}`} 
              className="btn btn-primary btn-sm w-full rounded-[--radius-field] font-black uppercase tracking-widest text-[10px] h-10 group/btn"
            >
              Consult Mentor
              <FaChevronRight className="ml-1 text-[8px] group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorsPage;