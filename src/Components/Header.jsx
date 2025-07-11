import React, { useState } from 'react'
import { Menu, X, ShieldAlert, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../Store/Auth'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)

  const { isLoggedIn, user } = useAuth()

  return (
    <header className="bg-black/90 backdrop-blur-md fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-[1.48rem] flex items-center justify-between">
        <h1 className="text-pink-400 text-2xl font-bold">
          Hi! {user ? user.username : 'Guest'}
        </h1>

        <div className="hidden md:flex items-center gap-10 text-white font-medium">
          <div className="flex gap-6">
            <Link to="/" className="hover:text-pink-400 transition">Home</Link>
            <Link to="/about" className="hover:text-pink-400 transition">About</Link>
            <Link to="/services" className="hover:text-pink-400 transition">Services</Link>
            <Link to="/projects" className="hover:text-pink-400 transition">Projects</Link>
            <Link to="/contact" className="hover:text-pink-400 transition">Contact</Link>

            {user?.isAdmin && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/admin"
                  className="flex items-center gap-1 bg-gradient-to-r from-purple-700 to-pink-600 hover:to-pink-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-md transition"
                >
                  <ShieldAlert size={16} />
                  Admin Panel
                </Link>
              </motion.div>
            )}
          </div>

          <div className="flex gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/register"
                  className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-1 rounded-full transition text-sm"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="border border-white hover:bg-white hover:text-black px-4 py-1 rounded-full transition text-sm"
                >
                  Login
                </Link>
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/logout"
                  className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm transition"
                >
                  <LogOut size={16} />
                  Logout
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black text-white px-6 py-4 space-y-4 text-center"
          >
            <Link to="/" onClick={toggleMenu} className="block">Home</Link>
            <Link to="/about" onClick={toggleMenu} className="block">About</Link>
            <Link to="/services" onClick={toggleMenu} className="block">Services</Link>
            <Link to="/projects" onClick={toggleMenu} className="block">Projects</Link>
            <Link to="/contact" onClick={toggleMenu} className="block">Contact</Link>

            {user?.isAdmin && (
              <Link
                to="/admin"
                onClick={toggleMenu}
                className="block bg-gradient-to-r from-purple-700 to-pink-600 hover:to-pink-700 text-white font-semibold px-4 py-2 rounded-full"
              >
                <ShieldAlert size={16} className="inline mr-1" />
                Admin Panel
              </Link>
            )}

            {!isLoggedIn ? (
              <>
                <Link to="/register" onClick={toggleMenu} className="block text-pink-400 font-semibold">Register</Link>
                <Link to="/login" onClick={toggleMenu} className="block border-t border-white/10 pt-2">Login</Link>
              </>
            ) : (
              <Link
                to="/logout"
                onClick={toggleMenu}
                className="block bg-red-600 hover:bg-red-700 w-full py-2 rounded-full text-white mt-2"
              >
                <LogOut size={16} className="inline mr-1" />
                Logout
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
