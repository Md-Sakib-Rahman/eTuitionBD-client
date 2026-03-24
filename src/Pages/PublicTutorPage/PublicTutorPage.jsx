import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContextProvider";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaGraduationCap, FaMapMarkerAlt, FaStar, FaChevronLeft, 
  FaBolt, FaAward, FaUniversity, FaQuoteLeft, FaIdBadge 
} from "react-icons/fa";

const PublicTutorPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);

  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/public-tutors/${id}`);
        setTutor(response.data);
      } catch (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Profile Unavailable",
          text: "We couldn't find this educator's profile.",
          background: "var(--color-base-200)",
          color: "var(--color-base-content)",
          confirmButtonColor: "var(--color-primary)",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchTutor();
  }, [id]);

  const handleConnect = () => {
    if (!userData) {
      Swal.fire({
        title: "Authentication Required",
        text: "Log in to connect with our elite tutors.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Go to Login",
        background: "var(--color-base-200)",
        color: "var(--color-base-content)",
        confirmButtonColor: "var(--color-primary)",
      }).then((result) => {
        if (result.isConfirmed) navigate("/login", { state: { from: `/tutor/${id}` } });
      });
      return;
    }

    if (userData?.email === tutor.email) {
      Swal.fire({ icon: "info", title: "Identity Conflict", text: "You cannot hire yourself.", background: "var(--color-base-200)", color: "var(--color-base-content)" });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Request Sent!",
      text: `${tutor.name} has been notified of your interest.`,
      confirmButtonColor: "var(--color-success)",
      background: "var(--color-base-200)",
      color: "var(--color-base-content)",
    });
  };

  if (loading) return (
    <div className="min-h-screen flex justify-center items-center bg-base-100">
      <span className="loading loading-ring loading-lg text-primary"></span>
    </div>
  );

  const { name, image, tutorData } = tutor;

  return (
    <div className="min-h-screen bg-base-100 pb-20   ">
      {/* 1. HERO HEADER SECTION */}
      <div className="relative h-[20vh] w-full bg-base-300   ">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-base-100  "></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]   from-primary/10 via-transparent to-transparent"></div>
        
        <div className="max-w-7xl mx-auto h-full px-6 flex items-end pb-12  ">
          <motion.button 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="absolute   top-28 left-6 lg:left-12 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-base-content/50 hover:text-primary transition-colors"
          >
            <FaChevronLeft /> Back to directory
          </motion.button>
        </div>
      </div>

      {/* 2. MAIN CONTENT CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 mt-[-10vh] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: IDENTITY (Col-span 4) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-base-200/80 backdrop-blur-xl border border-white/5 p-8 rounded-[2rem] text-center shadow-2xl">
              <div className="avatar mb-6">
                <div className="w-44 h-44 rounded-3xl ring ring-primary ring-offset-base-100 ring-offset-4 shadow-2xl">
                  <img src={image || "https://i.pravatar.cc/400"} alt={name} className="object-cover" />
                </div>
              </div>

              <h1 className="text-3xl font-black text-base-content tracking-tighter mb-2">{name}</h1>
              <p className="text-primary font-bold uppercase tracking-widest text-[10px] mb-6">Verified Elite Educator</p>
              
              <div className="flex flex-col gap-3 mb-8">
                <div className="flex items-center justify-between p-3   bg-base-100 border border-white/5">
                  <span className="text-[10px] uppercase font-black text-gray-500">Hourly Rate</span>
                  <span className="text-xl font-black text-base-content">${tutorData?.hourlyRate || "25"}</span>
                </div>
                <div className="flex items-center justify-between p-3   bg-base-100 border border-white/5">
                  <span className="text-[10px] uppercase font-black text-gray-500">Rating</span>
                  <span className="flex items-center gap-1 text-accent font-bold">
                    <FaStar className="text-xs" /> 4.9
                  </span>
                </div>
              </div>

              <button 
                onClick={handleConnect}
                className="group btn btn-primary w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs"
              >
                Hire this Mentor
                <FaBolt className="ml-2 group-hover:scale-125 transition-transform" />
              </button>
            </div>

            <div className="p-6 bg-base-200/50 rounded-2xl border border-white/5 space-y-4">
              <h4 className="text-[10px] uppercase font-black text-gray-500 tracking-widest mb-4">Credentials</h4>
              <div className="flex items-center gap-3 text-sm font-bold text-base-content/80">
                <FaAward className="text-success" /> Identity Verified
              </div>
              <div className="flex items-center gap-3 text-sm font-bold text-base-content/80">
                <FaAward className="text-success" /> Degrees Authenticated
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: DETAILS (Col-span 8) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-8 space-y-8"
          >
            {/* Bento Box 1: About Me */}
            <section className="bg-base-200/40 p-10 rounded-[2rem] border border-white/5 relative overflow-hidden">
              <FaQuoteLeft className="absolute top-8 right-8 text-6xl text-primary/5" />
              <h2 className="text-2xl font-black text-base-content mb-6 tracking-tighter flex items-center gap-3">
                <FaIdBadge className="text-primary text-xl" /> The Educator Profile
              </h2>
              <p className="text-lg text-base-content/70 leading-relaxed font-medium">
                {tutorData?.bio || "This expert mentor has verified credentials but hasn't updated their personal statement yet."}
              </p>
            </section>

            {/* Bento Box 2: Education & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 bg-base-200/40 rounded-[2rem] border border-white/5">
                <h3 className="text-[10px] uppercase font-black text-primary tracking-widest mb-6">Academic Background</h3>
                <div className="flex gap-4">
                  <FaUniversity className="text-2xl text-base-content/20" />
                  <div>
                    <p className="text-lg font-black text-base-content">{tutorData?.qualifications || "N/A"}</p>
                    <p className="text-sm font-bold text-gray-500">{tutorData?.university || "Verified Institution"}</p>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-base-200/40 rounded-[2rem] border border-white/5">
                <h3 className="text-[10px] uppercase font-black text-secondary tracking-widest mb-6">Professional Tenure</h3>
                <div className="flex gap-4">
                  <FaBolt className="text-2xl text-secondary/40" />
                  <div>
                    <p className="text-3xl font-black text-base-content">{tutorData?.experience || 0}+</p>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Years Active Experience</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bento Box 3: Expertise Chips */}
            <section className="p-10 bg-base-200/40 rounded-[2rem] border border-white/5">
              <h2 className="text-[10px] uppercase font-black text-accent tracking-widest mb-8">Specialized Knowledge Domains</h2>
              <div className="flex flex-wrap gap-3">
                {tutorData?.subjects?.map((sub, i) => (
                  <span 
                    key={i} 
                    className="px-5 py-2   bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-tighter"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </section>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default PublicTutorPage;