import React from "react";
import { motion } from "motion/react";

const features = [
  {
    title: "Verified Tutors",
    desc: "Every tutor undergoes a strict verification process to ensure quality and safety for students.",
    color: "bg-primary",
  },
  {
    title: "Secure Payments",
    desc: "Your money is safe with us. We hold payments until the deal is finalized and approved.",
    color: "bg-secondary",
  },
  {
    title: "Admin Monitoring",
    desc: "Our admins actively monitor posts and disputes to maintain a healthy and professional environment.",
    color: "bg-accent",
  },
  {
    title: "Smart Dashboard",
    desc: "Manage your classes, payments, and applications all in one place with our intuitive dashboard.",
    color: "bg-info",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-base-200">
      <div className="flex flex-col lg:flex-row items-center gap-12 max-w-7xl mx-auto">
        
       
        <div className="flex-1 space-y-6">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold leading-tight"
          >
            Why Choose <br /> <span className="text-primary">eTuitionBD?</span>
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.2 }}
             viewport={{ once: true }}
             className="text-lg text-base-content/80"
          >
            We are not just a listing site; we are a complete ecosystem designed to bridge the gap between ambitious students and expert mentors.
          </motion.p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <div className={`w-2 h-full min-h-[50px] ${feature.color} rounded-full`}></div>
                <div>
                  <h4 className="font-bold text-lg">{feature.title}</h4>
                  <p className="text-sm text-base-content/70">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        
        <div className="flex-1 relative">
           
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"
           />
           <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -z-10"
           />
           
           <div className="grid grid-cols-2 gap-4 p-4 border border-base-300 rounded-2xl bg-base-100/50 backdrop-blur-sm">
              <div className="stat place-items-center">
                <div className="stat-value text-primary">500+</div>
                <div className="stat-desc">Active Tutors</div>
              </div>
              <div className="stat place-items-center">
                <div className="stat-value text-secondary">1.2k</div>
                <div className="stat-desc">Students Connected</div>
              </div>
              <div className="stat place-items-center col-span-2">
                <div className="stat-value text-accent">98%</div>
                <div className="stat-desc">Success Rate</div>
              </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;