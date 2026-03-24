import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUserCheck, FaWallet, FaChartPie, FaGlobe, FaUsers, FaArrowRight } from "react-icons/fa";

const features = [
  {
    title: "Verified Tutors",
    desc: "Strict ID & qualification checks to ensure the highest educational standards.",
    icon: <FaUserCheck />,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Escrow Security",
    desc: "Payments are held in secure escrow and only released upon successful session completion.",
    icon: <FaWallet />,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    title: "Active Monitoring",
    desc: "24/7 admin oversight to resolve disputes and maintain community integrity.",
    icon: <FaShieldAlt />,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    title: "Data Analytics",
    desc: "Track progress, earnings, and schedules through a centralized intelligence hub.",
    icon: <FaChartPie />,
    color: "text-info",
    bgColor: "bg-info/10",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 px-6 bg-base-100 relative ">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        
        {/* Left Side: Copy & Features */}
        <div className="flex-1 text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Our Ecosystem
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black text-base-content leading-tight mb-6"
          >
            Empowering <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Expert Mentorship.</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-base-content/60 max-w-xl mb-12 font-medium"
          >
            eTuitionBD is a professional-grade infrastructure bridging the gap between talent and ambition with secure, monitored, and smart tools.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                viewport={{ once: true }}
                className="group flex flex-col items-start"
              >
                <div className={`p-3 rounded-lg ${feature.bgColor} ${feature.color} text-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h4 className="font-bold text-base-content text-lg mb-2 tracking-tight">{feature.title}</h4>
                <p className="text-sm text-base-content/50 leading-relaxed font-medium">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Tech Dashboard Visual */}
        <div className="flex-1 w-full relative">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative p-1 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/5 backdrop-blur-3xl"
          >
            <div className="bg-base-200/80 rounded-[1.4rem] p-8 grid grid-cols-2 gap-6 overflow-hidden relative">
              
              {/* Stats Item 1 */}
              <div className="col-span-1 p-6 rounded-2xl bg-base-100 border border-white/5 flex flex-col items-center justify-center">
                <FaUsers className="text-primary text-2xl mb-2" />
                <span className="text-3xl font-black text-base-content tracking-tighter">1.2k+</span>
                <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-widest">Active Users</span>
              </div>

              {/* Stats Item 2 */}
              <div className="col-span-1 p-6 rounded-2xl bg-base-100 border border-white/5 flex flex-col items-center justify-center">
                <FaGlobe className="text-accent text-2xl mb-2" />
                <span className="text-3xl font-black text-base-content tracking-tighter">64+</span>
                <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-widest">Regions</span>
              </div>

              {/* Large Stats Item */}
              <div className="col-span-2 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 flex items-center justify-between">
                <div>
                  <span className="text-4xl font-black text-base-content tracking-tighter block">98.4%</span>
                  <span className="text-[10px] uppercase font-bold text-base-content/40 tracking-widest">Client Satisfaction</span>
                </div>
                <div className="h-12 w-24 flex items-end gap-1">
                  {[40, 70, 45, 90, 65, 100].map((h, i) => (
                    <motion.div 
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      transition={{ delay: 0.5 + (i * 0.1), duration: 0.5 }}
                      className="flex-1 bg-primary/40 rounded-t-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Animated Floating Elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 p-2 bg-success/20 rounded-lg text-success text-xs font-bold border border-success/30"
              >
                +24 New Tutors Today
              </motion.div>
            </div>
          </motion.div>

          {/* Background Blurs */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -z-10" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] -z-10" />
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;