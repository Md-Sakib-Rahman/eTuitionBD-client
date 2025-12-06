import React from "react";
import { motion } from "motion/react";

const steps = [
  {
    id: 1,
    title: "Post a Requirement",
    desc: "Students describe their needs—subject, class, and budget. It's free and takes seconds.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-primary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Review Applicants",
    desc: "Verified tutors apply to your post. Check their profiles, experience, and ratings.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-secondary">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Hire & Start Learning",
    desc: "Select the best match, secure the deal, and start your journey towards excellence.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-accent">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 10 2s10 4.477 10 10z" />
      </svg>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-base-content/70 max-w-xl mx-auto">
          Finding the perfect tutor is easy. We have simplified the process into three simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
            className="card bg-base-200 shadow-xl border border-base-300 hover:border-primary transition-colors duration-300"
          >
            <div className="card-body items-center text-center">
              <div className="p-4 rounded-full bg-base-100 mb-4 shadow-sm">
                {step.icon}
              </div>
              <h3 className="card-title text-xl mb-2">{step.title}</h3>
              <p className="text-base-content/80">{step.desc}</p>
              
            
              <div className="badge badge-outline mt-4 opacity-50">Step 0{step.id}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;