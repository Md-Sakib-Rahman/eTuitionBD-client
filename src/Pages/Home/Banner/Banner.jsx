import React, { useContext, useEffect } from "react";
import userBanner from "../../../assets/Banner/userBanner.png";
import darkUserBanner from "../../../assets/Banner/darkUserBanner.png";
import { ThemeContext } from "../../../Context/ThemeContextProvide";
import { motion } from "motion/react";
const Banner = () => {
  const typewriterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.3, 
      },
    },
  };
  const letterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0 },
    },
  };
  const Typewriter = ({ text }) => {
    return text.split("").map((char, index) => (
      <motion.span key={index} variants={letterVariants}>
        {char}
      </motion.span>
    ));
  };

  const { theme } = useContext(ThemeContext);
  return (
    <div className=" overflow-hidden flex justify-center min-h-[600px]  max-md:flex-col-reverse gap-20 max-md:gap-4 items-center my-5">
      <div className="flex flex-col items-start gap-4 max-md:w-full">
        <motion.h2
        key={theme}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }} 
          variants={typewriterVariants}
          className="text-6xl xl:text-7xl max-md:text-4xl font-bold text-accent"
        >
          
          <Typewriter text="Connecting " />

          <br className="xl:hidden" />

          <Typewriter text="Students with " />

          <br />

          <Typewriter text="tutors" />
        </motion.h2>

        
        <p className="max-w-[500px]">
          eTutionBD is a platform where student and tutors connect with least
          amount of barrier
        </p>
        <button className="btn btn-primary">Join Now</button>
      </div>
      <div className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: "easeInOut",
          }}
          viewport={{ once: true }}
        >
          <img
            className="w-[400px] xl:w-[500px] max-md:w-[30px]"
            src={theme == "black-purple" ? userBanner : darkUserBanner}
            alt=""
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
