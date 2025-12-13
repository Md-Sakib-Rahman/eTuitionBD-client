import React from "react";
import { motion } from "motion/react";

 

 
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,  
      delayChildren: 0.1,    
    },
  },
};
 
const fadeInUp = {
  hidden: { y: 30, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],  
    },
  },
};

const About = () => {
  return (
    <div className="min-h-screen bg-base-100 overflow-hidden">
      
      <div className="hero min-h-[80vh] bg-base-200 relative"> 
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] pointer-events-none"></div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"  
          viewport={{ once: true, amount: 0.3 }}  
          className="hero-content flex-col lg:flex-row-reverse gap-12 px-6 lg:px-20 py-20 max-w-7xl mx-auto z-0"
        > 
          <motion.div variants={fadeInUp} className="flex-1 relative">
             <motion.div
                 animate={{ y: [0, -15, 0] }}  
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
             >
                <img
                  src="https://img.freepik.com/free-vector/online-tutorials-concept_52683-37480.jpg?w=996&t=st=1708112312~exp=1708112912~hmac=8c39659600666607808972185572932755265656051266812685721615170521"
                  className="max-w-sm md:max-w-md lg:max-w-lg rounded-3xl shadow-2xl rotate-3 border-4 border-base-100"
                  alt="Learning concept"
                />
             </motion.div>
             
            <div className="absolute -z-10 top-10 right-10 w-full h-full bg-accent/20 rounded-full blur-3xl -rotate-6 scale-110"></div>
          </motion.div>

       
          <div className="flex-1 text-center lg:text-left space-y-6">
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold leading-tight">
              Bridging the Gap Between <span className="text-primary">Ambition</span> & <span className="text-accent">Achievement</span>.
            </motion.h1>
            <motion.p variants={fadeInUp} className="py-4 text-lg text-base-content/80 max-w-xl mx-auto lg:mx-0">
              We believe quality education shouldn't be hard to find. eTuitionBD was born from a simple idea: connect dedicated students with passionate educators in a seamless, secure, and modern environment.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex gap-4 justify-center lg:justify-start">
              <button className="btn btn-primary rounded-full px-8">Our Story</button>
              <button className="btn btn-ghost rounded-full px-8">Meet Team</button>
            </motion.div>
          </div>
        </motion.div>
      </div>

    
      <div className="py-24 px-6 lg:px-20 bg-base-100 relative">
      
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-7xl mx-auto"
        >
        
          <div className="text-center mb-16 space-y-4">
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold">
              Why We Do What We Do
            </motion.h2>
            <motion.div variants={fadeInUp} className="w-20 h-1.5 bg-accent mx-auto rounded-full"></motion.div>
            <motion.p variants={fadeInUp} className="text-base-content/70 max-w-2xl mx-auto">
              Our platform is built on three foundational pillars designed to ensure the best experience for both tutors and students.
            </motion.p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
            <ValueCard
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              }
              title="Verified Trust"
              description="We rigorously vet our tutors to ensure students receive guidance from qualified and trustworthy mentors."
              color="primary"
            />

          
            <ValueCard
              icon={
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              }
              title="Seamless Tech"
              description="From finding a tutor to secure escrow payments, our technology makes the process effortless."
              color="accent"
            />

           
            <ValueCard
              icon={
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              }
              title="Real Impact"
              description="We are driven by seeing students improve their grades and tutors build sustainable careers."
              color="primary"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

 
const ValueCard = ({ icon, title, description, color }) => {
  return (
    <motion.div
      variants={fadeInUp}  
      whileHover={{ y: -10 }}  
      className="card bg-base-200/50 border border-base-300 hover:shadow-xl transition-all duration-300 p-8 rounded-3xl text-center group"
    >
      <div className={`w-20 h-20 mx-auto bg-${color}/10 text-${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-base-content/70">{description}</p>
    </motion.div>
  );
};

export default About;