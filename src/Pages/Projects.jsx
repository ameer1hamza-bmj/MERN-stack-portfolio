import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useAuth } from '../Store/Auth'




const Projects = () => {
  const { API } = useAuth()

  const fetchProjects = async () => {
    const res = await axios.get(`${API}/api/admin/project`)
    return res.data
  }

  const { data: projects = [], isLoading, isError, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  })

  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 3

  const totalPages = Math.ceil(projects.length / projectsPerPage)

  const paginatedProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  )

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-pink-800 text-white px-6 py-24">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-pink-400 mb-12"
        >
          My Projects
        </motion.h1>

        {/* 🔄 Loader */}
        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
                borderColor: [
                  '#ec4899', // pink-500
                  '#8b5cf6', // purple-500
                  '#ec4899',
                ],
              }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: 'easeInOut',
              }}
              className="w-16 h-16 rounded-full border-4 border-pink-500 border-t-transparent"
            />
          </div>
        )}

        {/* ❌ Error */}
        {isError && (
          <div className="text-red-400 font-medium">
            Failed to load projects: {error.message}
          </div>
        )}

        {/* ✅ Projects */}
        {!isLoading && !isError && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {paginatedProjects.map((project, index) => (
                <motion.div
                  key={project._id || index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-md hover:shadow-pink-500/20 transition"
                >
                  <img
                    src={`${API}/uploads/${project.image}`}
                    alt={project.heading}
                    className="w-full h-48 object-cover rounded-lg mb-4 border border-white/10"
                  />
                  <h2 className="text-xl font-semibold text-pink-300">{project.heading}</h2>
                  <p className="text-white/70 mt-2 text-sm">{project.paragraph}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 bg-pink-600 hover:bg-pink-700 transition text-white px-4 py-2 rounded-full text-sm font-semibold"
                  >
                    View Project
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="mt-10 flex justify-center items-center gap-4">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-white/10 rounded-full text-white font-semibold transition"
              >
                Prev
              </button>
              <span className="text-white/70 text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-pink-600 hover:bg-pink-700 disabled:bg-white/10 rounded-full text-white font-semibold transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Projects
