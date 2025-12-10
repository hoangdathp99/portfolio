'use client'
import React from 'react';
import { motion, type Variants } from 'framer-motion';
import './Sidebar.css';
import Link from 'next/link';

const sidebarVariants: Variants = {
  hidden: { x: -200, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 12, delay: 0.2 } },
};

const Sidebar: React.FC = () => {
  return (
    <motion.div
      className="sidebar"
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
    >
      <ul className="sidebar-menu">
        <motion.li whileHover={{ x: 10 }}>
          <Link href="/">
             Home
          </Link>
        </motion.li>
        <motion.li whileHover={{ x: 10 }}>
          <Link href="/profile">
             Profile
          </Link>
        </motion.li>
        <motion.li whileHover={{ x: 10 }}>
          <Link href="/projects">
             Projects
          </Link>
        </motion.li>
        <motion.li whileHover={{ x: 10 }}>
          <Link href="/contact">
             Contact
          </Link>
        </motion.li>
      </ul>
    </motion.div>
  );
};

export default Sidebar;
