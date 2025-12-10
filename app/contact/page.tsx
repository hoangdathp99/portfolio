'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../../styles/Contact.css';

const Contact: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully!' });
      } else {
        setSubmitStatus({ type: 'error', message: result.error || 'Failed to send message' });
      }
    } catch (error) {
      console.log(error);
      
      setSubmitStatus({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      className="contact-page"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 variants={itemVariants}>Contact Me</motion.h2>
      <motion.p variants={itemVariants}>
        Feel free to reach out to me through the form below or connect with me on social media.
      </motion.p>

      <motion.div variants={itemVariants} className="contact-form-container card">
        {submitStatus.type && (
          <div
            className={`status-message ${submitStatus.type === 'success' ? 'success' : 'error'}`}
            style={{
              padding: '10px',
              marginBottom: '20px',
              borderRadius: '5px',
              backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
              color: submitStatus.type === 'success' ? '#155724' : '#721c24',
              border: `1px solid ${submitStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
            }}
          >
            {submitStatus.message}
          </div>
        )}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required disabled={isLoading} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required disabled={isLoading} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required disabled={isLoading}></textarea>
          </div>
          <motion.button
            type="submit"
            className="submit-button"
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            disabled={isLoading}
            style={{
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? 'Sending...' : 'Send Message'}
          </motion.button>
        </form>
      </motion.div>

      {/* <motion.div variants={itemVariants} className="social-links card">
        <h3>Connect with me</h3>
        <div className="social-icons">
          <motion.a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
            <img src="https://via.placeholder.com/40/0077B5/ffffff?text=LI" alt="LinkedIn" />
          </motion.a>
          <motion.a href="https://github.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
            <img src="https://via.placeholder.com/40/333333/ffffff?text=GH" alt="GitHub" />
          </motion.a>
          <motion.a href="https://twitter.com" target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.1 }}>
            <img src="https://via.placeholder.com/40/1DA1F2/ffffff?text=TW" alt="Twitter" />
          </motion.a>
        </div>
      </motion.div> */}
    </motion.div>
  );
};

export default Contact;
