'use client'
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Home.css';
const Home: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="home-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={itemVariants}>Welcome to My Portfolio!</motion.h2>
      <motion.p variants={itemVariants}>
        Hello, and thank you for visiting my portfolio. You can use the built-in chatbot to explore my portfolio quickly and get answers instantly.
      </motion.p>
      <motion.div variants={itemVariants} className="card">
        <h3>About Me</h3>
        <p>
          I am a passionate software engineer with expertise in React, TypeScript, and building responsive web applications.
        </p>
      </motion.div>
      <motion.div variants={itemVariants} className="card">
        <h3>Latest Projects</h3>
        <p>Check out my recent work in the projects section.</p>
      </motion.div>
    </motion.div>
  );
};

export default Home;
