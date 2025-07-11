import React from 'react'
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black text-white border-t border-white/10 backdrop-blur-md px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-pink-400">MyPortfolio</h2>
          <p className="text-white/60 mt-2">
            Crafting elegant web experiences with MERN & modern UI.
          </p>
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white/80">Navigation</h3>
          <ul className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-pink-400 transition">Home</Link>
            <Link to="/about" className="hover:text-pink-400 transition">About</Link>
            <Link to="/services" className="hover:text-pink-400 transition">Services</Link>
            <Link to="/contact" className="hover:text-pink-400 transition">Contact</Link>
          </ul>
        </div>

        {/* Social */}
        <div className="space-y-2">
          <h3 className="font-semibold text-white/80">Connect</h3>
          <div className="flex justify-center md:justify-start gap-4 text-pink-400 mt-2">
            <a href="https://github.com/Ameer-Hamza-11" target="_blank" rel="noreferrer" className="hover:text-white transition">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/ameer-hamza-556717332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " target="_blank" rel="noreferrer" className="hover:text-white transition">
              <Linkedin size={20} />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ameerhamza.saati@gmail.com" target='_blank' className="hover:text-white transition">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-10 text-center text-xs text-white/50 border-t border-white/10 pt-4">
        © {new Date().getFullYear()} MyPortfolio. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
