'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import '../../styles/Projects.css';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
//   image: string;
  tags: string[];
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce application with user authentication and payment integration.',
    longDescription: 'Developed a robust e-commerce platform using React for the frontend, Node.js/Express for the backend, and MongoDB for the database. Implemented features such as user authentication, product catalog, shopping cart, and secure payment processing with Stripe. The application is fully responsive and optimized for various devices.',
    // image: 'https://via.placeholder.com/300x200/2e89ff/ffffff?text=E-commerce',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
  },
  {
    id: 2,
    title: 'Social Media Dashboard',
    description: 'An interactive dashboard for managing social media accounts and analytics.',
    longDescription: 'Built a social media management dashboard that allows users to connect their social media accounts (Facebook, Twitter, Instagram) and view real-time analytics. Features include post scheduling, engagement tracking, and performance reporting. Utilized D3.js for data visualization and WebSockets for live updates.',
    // image: 'https://via.placeholder.com/300x200/2e89ff/ffffff?text=Social+Media',
    tags: ['React', 'D3.js', 'WebSockets', 'Analytics'],
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'A simple and intuitive task management application with drag-and-drop functionality.',
    longDescription: 'Created a task management application to help users organize their daily tasks. Key features include task creation, categorization, due dates, and drag-and-drop reordering. The application uses local storage for persistence and is designed with a clean, minimalist UI.',
    // image: 'https://via.placeholder.com/300x200/2e89ff/ffffff?text=Task+App',
    tags: ['React', 'TypeScript', 'Drag-and-Drop', 'Local Storage'],
  },
];

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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

  const detailVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="projects-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={itemVariants}>My Projects</motion.h2>
      <motion.p variants={itemVariants}>
        Here are some of the projects I've worked on. Click on a project to see more details.
      </motion.p>

      <div className="projects-grid">
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            className="project-card"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedProject(project)}
          >
            {/* <img src={project.image} alt={project.title} className="project-image" /> */}
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="project-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-detail-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-detail-modal"
              variants={detailVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()} /* Prevent closing when clicking inside modal */
            >
              <button className="close-button" onClick={() => setSelectedProject(null)}>X</button>
              <h2>{selectedProject.title}</h2>
              {/* <img src={selectedProject.image} alt={selectedProject.title} className="detail-image" /> */}
              <p>{selectedProject.longDescription}</p>
              <div className="project-tags">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;
