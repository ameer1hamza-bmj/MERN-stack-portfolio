import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Github, Download } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-pink-700 text-white px-6 py-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 bg-white/10 p-10 rounded-3xl shadow-2xl backdrop-blur-md"
      >

        <div className="space-y-6 text-sm sm:text-base">
          <h2 className="text-2xl font-bold text-pink-300 mb-6">Contact Info</h2>

          <div className="flex items-center gap-3 text-white/80">
            <Mail size={18} className="text-pink-400" />
            <span>ameerhamza.saati@gmail.com</span>
          </div>

          <div className="flex items-center gap-3 text-white/80">
            <Phone size={18} className="text-pink-400" />
            <span>+92 326 0784463</span>
          </div>

          <div className="flex items-center gap-3 text-white/80">
            <Linkedin size={18} className="text-pink-400" />
            <a
              href="https://www.linkedin.com/in/ameer-hamza-556717332"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/ameerhamza
            </a>
          </div>

          <div className="flex items-center gap-3 text-white/80">
            <Github size={18} className="text-pink-400" />
            <a
              href="https://github.com/Ameer-Hamza-11"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/ameerhamza
            </a>
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4 text-pink-300">About Me</h1>

          <h2 className="text-2xl font-semibold text-white mb-4">
            Hi! I’m <span className="text-pink-400 font-bold">Ameer Hamza</span>
          </h2>

          <p className="text-white/80 mb-4 leading-relaxed">
            I’m a passionate MERN Stack Developer focused on crafting modern, fast, and visually appealing web apps.
            I enjoy building clean UIs and robust backends using technologies like React, Node, MongoDB, and Express.
          </p>

          <p className="text-white/70 mb-6 text-sm leading-relaxed">
            With a strong eye for design and detail, I love translating ideas into smooth digital experiences.
            Let's connect and build something amazing.
          </p>

          <motion.a
            href="https://drive.google.com/file/d/1EEzdoyz05E9e6x2XHt-0LS0_TV2OmDhc/view" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-700 transition text-white px-6 py-3 rounded-full font-semibold shadow-lg"
          >
            <Download size={18} />
            View Resume
          </motion.a>
        </div>
      </motion.div>
    </div>
  )
}

export default About
