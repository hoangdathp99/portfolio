"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import "../../styles/Projects.css";

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
    title: "LMS - OPS",
    description: "Team size: 24, Customer: Sapp",
    longDescription:
      "Make UI for the webs, fix bugs, maintain. Make function: Create dynamic tests with variable tests; Make rich text editor with tiny-editor; Make full do test, save and submit list answer; Make draggable tree courses.",
    tags: [
      "ReactJs",
      "NextJs",
      "axios",
      "redux",
      "tiny-editor",
      "tailwind-css",
      "bootstrap",
    ],
  },
  {
    id: 2,
    title: "Clarity Chiro",
    description: "Team size: 8, Customer: Dan",
    longDescription:
      "Make UI for the app, fix bugs, maintain. Make BE function: Calculate Score, Make dynamic tests.",
    tags: ["ReactJs", "MUI", "Docker", "Sequelize", "NodeJS", "MySQL"],
  },
  {
    id: 3,
    title: "Hrm-website",
    description: "Team size: 12, Customer: AHT (Internal company project)",
    longDescription:
      "Make UI for the app, fix bugs, maintain. Make BE function: manage employee, manager, department; manage review-period; function send mail; sync with jira, GitLab, Microsoft office.",
    tags: [
      "ReactJs",
      "redux",
      "NestJS",
      "Office graph api",
      "Gitlab api",
      "Jira api",
      "Docker",
      "MongoDB",
    ],
  },
  {
    id: 4,
    title: "IONAH PWA",
    description: "Team size: 24, Customer: IONAH",
    longDescription:
      "Make UI for pages, make flow function from add Item to Cart to payment success. Dedicate on IONAH company to guild fix bug and finish project.",
    tags: ["ReactJs", "PWA Magento", "GraphQL"],
  },
  {
    id: 5,
    title: "DG External E-commerce",
    description: "Team size: 16, Customer: Japan Flow",
    longDescription:
      "Make UI for the web, fix bugs, and maintain. Reviewing code, making function flow from add to Cart to Checkout payment. Help team FE doing tasks.",
    tags: ["ReactJs", "PWA Magento", "GraphQL", "Venia-UI"],
  },
  {
    id: 6,
    title: "DigsApp Mobile",
    description: "Team size: 4, Customer: Micheal",
    longDescription: "Make UI for the app, fix bugs, maintain.",
    tags: ["ReactNative", "Expo"],
  },
  {
    id: 7,
    title: "Tinwin Mobile App",
    description: "Team size: 32, Customer: Comartek",
    longDescription:
      "Make UI for the app, fix bugs, maintain, dedicate on Comartek for maintenance.",
    tags: ["React Native", "Redux-Toolkit", "RestApi"],
  },
  {
    id: 8,
    title: "DIYBA website",
    description: "Team size: 24, Customer: DIYBA",
    longDescription: "Make UI for the web, fix bugs, maintain.",
    tags: ["ReactJs", "axios", "redux", "ant-design"],
  },
  {
    id: 9,
    title: "ODDLE MARKETING",
    description: "Team size: 16, Customer: ODDLE",
    longDescription: "Make UI, fix bugs and maintain function.",
    tags: ["NextJS", "RtkQuery", "Framer motion", "tailwind-Css", "mono-repo"],
  },
  {
    id: 10,
    title: "DVP CRM",
    description: "Team size: 1, Customer: Dinh Vu Port",
    longDescription:
      "Research, design UX, UI, Database. Build Website. Deploy, maintain website. Create Documents (manual, Database). Optimize Queries.",
    tags: [
      "Vite",
      "ReactJs",
      "axios",
      "redux",
      "radix-ui",
      "tanstack-table",
      "NodeJs",
      "SQL server",
    ],
  },
  {
    id: 11,
    title: "DVP ShipBerth",
    description: "Team size: 1, Customer: Dinh Vu Port",
    longDescription:
      "Research, design UX,UI. Build Server, web socket based project.",
    tags: ["web socket"],
  },
  {
    id: 12,
    title: "DVP Occupational Safety Report",
    description: "Team Size: 1, Customer: Dinh Vu Port",
    longDescription:
      "Research business process. Design database. Design UX,UI. Build, deploy project.",
    tags: [
      "NextJS",
      "tanstack query",
      "axios",
      "NextAuth",
      "Kotlin",
      "Webview",
      "PWA",
      "antd",
      "SQL server",
      "prisma",
      "nodemailer",
    ],
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
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
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
        Here are some of the projects I've worked on. Click on a project to see
        more details.
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
                <span key={tag} className="tag">
                  {tag}
                </span>
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
              onClick={(e) =>
                e.stopPropagation()
              } /* Prevent closing when clicking inside modal */
            >
              <button
                className="close-button"
                onClick={() => setSelectedProject(null)}
              >
                X
              </button>
              <h2>{selectedProject.title}</h2>
              {/* <img src={selectedProject.image} alt={selectedProject.title} className="detail-image" /> */}
              <p>{selectedProject.longDescription}</p>
              <div className="project-tags">
                {selectedProject.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
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
