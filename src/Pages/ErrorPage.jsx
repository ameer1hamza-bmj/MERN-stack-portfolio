import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-800 via-pink-600 to-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-white max-w-md text-center"
      >
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-pink-400 w-16 h-16" />
        </div>
        <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
        <p className="text-white/80 mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-pink-500 hover:bg-pink-600 transition-all rounded-full text-white font-semibold"
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  )
}

export default ErrorPage
