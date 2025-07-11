import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-black via-purple-950 to-pink-900 text-white">

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 animate-text-glow"
        >
          Welcome to My Portfolio
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-6 text-white/80 max-w-2xl text-lg md:text-xl leading-relaxed"
        >
          I'm a Full Stack JavaScript Developer focused on building elegant, performant, and visually captivating web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <Link
            to="/contact"
            className="bg-pink-600 hover:bg-pink-700 transition-all px-8 py-3 rounded-full text-white font-semibold shadow-lg shadow-pink-500/30 inline-flex items-center gap-2 hover:scale-105"
          >
            Let’s Connect <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      {/* Skills / Technologies Section */}
      <section className="px-6 md:px-20 py-20 text-center bg-gradient-to-br from-black via-purple-950 to-black backdrop-blur-lg border-t border-white/10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-pink-400 drop-shadow"
        >
          Technologies I Work With
        </motion.h2>
        <p className="mt-3 text-white/70 text-base max-w-xl mx-auto">
          From frontend finesse to backend logic — these are my core weapons in web development.
        </p>

        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            { name: 'React.js', color: 'text-cyan-400' },
            { name: 'Node.js', color: 'text-green-400' },
            { name: 'MongoDB', color: 'text-green-300' },
            { name: 'Express.js', color: 'text-gray-300' },
            { name: 'Tailwind CSS', color: 'text-sky-400' },
            { name: 'JavaScript', color: 'text-yellow-300' },
            { name: 'Git / GitHub', color: 'text-orange-300' },
            { name: 'REST APIs', color: 'text-pink-300' }
          ].map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className={`bg-white/10 hover:bg-white/20 p-4 rounded-xl text-sm font-semibold ${tech.color} shadow-md hover:shadow-pink-500/30 transition duration-300 border border-white/5 backdrop-blur-sm`}
            >
              {tech.name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-gradient-to-r from-pink-700 via-purple-800 to-black py-20 px-6 text-center border-t border-white/10">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-white"
        >
          Have an Idea? Let’s Make it Real.
        </motion.h2>
        <p className="mt-4 text-white/80 text-base max-w-xl mx-auto">
          Whether it’s a brand, startup, or portfolio — I’ll help you bring it to life with clean code and modern design.
        </p>
        <Link
          to="/contact"
          className="inline-block mt-6 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition shadow-md hover:scale-105"
        >
          Contact Me
        </Link>
      </section>
    </div>
  )
}

export default Home
