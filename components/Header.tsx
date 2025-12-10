'use client';
import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <motion.header
      className="header"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 14 }}
    >
      <div className="header-left">
        <motion.div
          className="logo"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
         
        </motion.div>
      </div>
      <nav className="header-nav">
        <ul>
          <motion.li whileHover={{ scale: 1.05 }}>
            <Link href="/">Home</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <Link href="/profile">Profile</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <Link href="/projects">Projects</Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <Link href="/contact">Contact</Link>
          </motion.li>
        </ul>
      </nav>
      <div className="header-right">
      </div>
    </motion.header>
  );
};

export default Header;
