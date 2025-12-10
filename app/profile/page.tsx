"use client";
import React from "react";
import { motion } from "framer-motion";
import "../../styles/Profile.css";

const Profile: React.FC = () => {
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
      className="profile-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={itemVariants}>My Profile</motion.h2>
      <motion.div variants={itemVariants} className="profile-header">
        {/* <img src="https://via.placeholder.com/150" alt="Profile Avatar" className="profile-avatar" /> */}
        <div className="profile-info">
          <h3>DAN HOANG</h3>
          <p>Software Engineer | Web Developer</p>
          <p>
            Passionate about creating engaging and responsive web experiences.
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="card profile-section">
        <h3>Bio</h3>
        <p>
          I'm a developer with more than 4 years of experience in ReactJS,
          NextJS and additional knowledge of NodeJS, Database management. Having
          gone through many projects, I have a lot of experience in Website
          development. I hope I can improve my skills through more challenging
          projects and use this knowledge and expertise to contribute to company
          development
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="card profile-section">
        <h3>Skills</h3>
        <ul className="skills-list">
          <li>ReactJS</li>
          <li>NextJS</li>
          <li>TypeScript</li>
          <li>Framer Motion</li>
          <li>Responsive Design</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>MongoDB</li>
          <li>SQLServer</li>
        </ul>
      </motion.div>

      <motion.div variants={itemVariants} className="card profile-section">
        <h3>Experience</h3>
        <p>
          <strong>IT Employee</strong> at DinhVuPort Inc. (2025 - Present)
        </p>
        <ul>

        <li>Managing and developing port operation software systems</li>
        </ul>
        <p>
          <strong>Middle Devloper</strong> at Fetch Inc. (2024 - 2025)
        </p>
        <ul>

        <li>Assisted in developing and maintaining large modules</li>
        </ul>
        <p>
          <strong>Developer</strong> at Web Innovations (2021 - 2024)
        </p>
        <ul>

        <li>Developing and maintaining applications across multiple domains</li>
        <li>
          Contributing to diverse domain projects (e.g., education, e-commerce,
          internal tools), ensuring code quality and system reliability
        </li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Profile;
