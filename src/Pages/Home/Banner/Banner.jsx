import React, { useContext } from "react";
import userBanner from "../../../assets/Banner/userBanner.png";
import darkUserBanner from "../../../assets/Banner/darkUserBanner.png";
import { ThemeContext } from "../../../Context/ThemeContextProvide";
import { motion } from "framer-motion";
import { FaArrowRight, FaPlay } from "react-icons/fa";

const Banner = () => {
  const { theme } = useContext(ThemeContext);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center py-12 px-6 overflow-hidden bg-base-100">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-start text-left space-y-8"
        >
          {/* Top Badge */}
          <motion.div 
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em]"
          >
            The Future of Learning
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl xl:text-8xl font-black leading-[0.9] tracking-tighter text-base-content"
          >
            Bridge the Gap <br />
            Between <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Expertise</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="max-w-[520px] text-lg md:text-xl text-base-content/60 font-medium leading-relaxed"
          >
            A high-performance ecosystem designed to connect elite mentors with ambitious students through secure, monitored, and frictionless tools.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-4">
            <button className="btn btn-primary px-8 rounded-[--radius-field] font-black uppercase tracking-widest text-xs group">
              Get Started 
              <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn btn-outline border-base-300 hover:bg-base-200 text-base-content px-8 rounded-[--radius-field] font-black uppercase tracking-widest text-xs">
              <FaPlay className="mr-2 text-[10px]" />
              How it works
            </button>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="flex gap-8 pt-8 border-t border-base-content/5 w-full">
            <div>
              <p className="text-2xl font-black text-base-content">50k+</p>
              <p className="text-[10px] uppercase font-bold text-base-content/40 tracking-widest">Active Hours</p>
            </div>
            <div>
              <p className="text-2xl font-black text-base-content">4.9/5</p>
              <p className="text-[10px] uppercase font-bold text-base-content/40 tracking-widest">Tutor Rating</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 50 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="relative flex justify-center lg:justify-end"
        >
          {/* Main Image with Floating Animation */}
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <img
              className="w-full max-w-[400px] xl:max-w-[550px] drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
              src={theme === "black-purple" ? userBanner : darkUserBanner}
              alt="Platform Showcase"
            />
          </motion.div>

          {/* Decorative Tech Ring behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-primary/10 rounded-full -z-0" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] border border-secondary/5 rounded-full -z-0" />
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;