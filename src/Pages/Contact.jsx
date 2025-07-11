import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../Store/Auth'

const Contact = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    message: ''
  })
  const { authorization, user,API } = useAuth()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.username || !formData.email || !formData.message) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      const response = await axios.post(`${API}/api/form/contact'`, formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorization,
        }
      })
      toast.success(response.data.message)



    } catch (error) {
      toast.error(error.response?.data?.message || 'Message sending failed')
      console.error('❌ Contact Form Error:', error)
    }
  }
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        username: user.username || '',
        email: user.email || '',
      }))
    }
  }, [user])

  return (
    <div className="min-h-screen bg-black text-white px-6 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-pink-400 mb-4"
        >
          Contact Me
        </motion.h1>
        <p className="text-white/70 mb-12">
          Have a question, idea, or project in mind? Let's connect and build something awesome.
        </p>
      </div>

      <form
        className="max-w-3xl mx-auto bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/10 space-y-6"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full">
            <label className="block mb-2 text-sm text-white/80">Your Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your name"
              className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div className="w-full">
            <label className="block mb-2 text-sm text-white/80">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 text-sm text-white/80">Message</label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Write your message..."
            className="w-full px-4 py-2 rounded-lg bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-pink-600 hover:bg-pink-700 transition px-8 py-3 rounded-full text-white font-semibold"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  )
}

export default Contact
