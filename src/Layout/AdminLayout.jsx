import React, { useState } from 'react'
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, Users, Mail, FolderKanban, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from '../Store/Auth'

const AdminLayout = () => {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { user, isLoading } = useAuth()
  console.log('Admin Layout', user);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-pink-800 text-white">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-l-purple-600 border-b-transparent border-r-transparent animate-spin"></div>
          <div className="absolute inset-2 bg-black rounded-full flex items-center justify-center text-xs text-pink-400 font-bold">
            Loading
          </div>
        </div>
      </div>
    )
  }

  if (!user || !user.isAdmin) {
    return <Navigate to="/" />

  }

  const navLinks = [
    { name: 'users', icon: <Users size={18} className="inline mr-2" /> },
    { name: 'Contacts', icon: <Mail size={18} className="inline mr-2" /> },
    { name: 'Projects', icon: <FolderKanban size={18} className="inline mr-2" /> }
  ]

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-black via-purple-900 to-pink-900 text-white overflow-hidden">


      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}


      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white/10 p-6 border-r border-white/10 z-40 transform transition-transform duration-300 ease-in-out ${open ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 md:static`}
      >
        <h2 className="text-2xl font-bold text-pink-400 mb-8">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          {navLinks.map(({ name, icon }) => (
            <NavLink
              key={name}
              to={`/admin/${name}`}
              className={({ isActive }) =>
                `flex items-center transition px-2 py-1 rounded-md ${isActive
                  ? 'text-pink-400 font-semibold bg-white/10'
                  : 'text-white/80 hover:text-pink-400 hover:bg-white/5'
                }`
              }
              onClick={() => setOpen(false)}
            >
              {icon} {name}
            </NavLink>
          ))}
        </nav>
      </aside>


      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">


        <header className="sticky top-0 z-20 flex items-center justify-between px-4 py-4 md:px-8 bg-black/30 border-b border-white/10 backdrop-blur-md">
          <button
            className="md:hidden p-2 bg-white/10 rounded-full"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="text-lg md:text-2xl font-bold text-pink-400">
            Admin Dashboard
          </h1>
        </header>


        {location.pathname === '/admin' && (
          <motion.div
            className="flex-1 flex flex-col items-center justify-center text-center text-white px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="text-pink-400 mb-4"
            >
              <Sparkles size={48} />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-pink-300 mb-4">
              Welcome to the Admin Panel
            </h2>
            <p className="text-white/80 max-w-xl">
              Here you can manage your <span className="text-pink-400 font-semibold">users</span>, handle <span className="text-pink-400 font-semibold">contact messages</span>, and upload your <span className="text-pink-400 font-semibold">projects</span> with full control and ease.
            </p>
          </motion.div>
        )}


        {location.pathname !== '/admin' && (
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Outlet />
          </main>
        )}
      </div>
    </div>
  )
}

export default AdminLayout
