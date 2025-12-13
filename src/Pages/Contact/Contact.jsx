import React from "react";
import { motion } from "motion/react";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-20 lg:py-28"
      >
        <div className="text-center mb-16 space-y-4">
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl font-bold">
            Get in <span className="text-primary">Touch</span>
          </motion.h1>
          <motion.div variants={fadeInUp} className="w-20 h-1.5 bg-accent mx-auto rounded-full"></motion.div>
          <motion.p variants={fadeInUp} className="text-lg text-base-content/70 max-w-xl mx-auto">
            Have questions about finding a tutor or becoming one? We are here to help. Send us a message and we will respond within 24 hours.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="card bg-base-200/50 border border-base-300 p-8 rounded-3xl hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Office Location</h3>
                  <p className="text-base-content/70">Level 4, Khan Plaza, Mirpur 10</p>
                  <p className="text-base-content/70">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>

            <div className="card bg-base-200/50 border border-base-300 p-8 rounded-3xl hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Email Us</h3>
                  <p className="text-base-content/70 mb-1">support@etuitionbd.com</p>
                  <p className="text-base-content/70">info@etuitionbd.com</p>
                </div>
              </div>
            </div>

            <div className="card bg-base-200/50 border border-base-300 p-8 rounded-3xl hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Phone</h3>
                  <p className="text-base-content/70 mb-1">+880 1712 345 678</p>
                  <p className="text-base-content/70">Sun - Thu, 10am - 6pm</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} className="card bg-base-100 shadow-2xl border border-base-200 p-8 lg:p-10 rounded-[2.5rem]">
            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Your Name</span>
                  </label>
                  <input type="text" placeholder="John Doe" className="input input-bordered input-primary w-full bg-base-200/30 focus:bg-base-100 transition-colors" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Your Email</span>
                  </label>
                  <input type="email" placeholder="john@example.com" className="input input-bordered input-primary w-full bg-base-200/30 focus:bg-base-100 transition-colors" />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Subject</span>
                </label>
                <select className="select select-bordered select-primary w-full bg-base-200/30 focus:bg-base-100 transition-colors">
                  <option disabled selected>Select a topic</option>
                  <option>Tutor Inquiry</option>
                  <option>Student Support</option>
                  <option>Technical Issue</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Message</span>
                </label>
                <textarea className="textarea textarea-bordered textarea-primary h-32 w-full bg-base-200/30 focus:bg-base-100 transition-colors" placeholder="How can we help you?"></textarea>
              </div>

              <div className="form-control mt-6">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-primary btn-lg w-full rounded-2xl text-white shadow-lg shadow-primary/30"
                >
                  Send Message
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact;