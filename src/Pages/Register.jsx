import React, { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../Store/Auth'

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  })
  const { storeTokenInLS, API } = useAuth();


  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${API}/api/auth/registration`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log('Registration Successfull', res.data);
      storeTokenInLS(res.data.token)

      toast.success('Registration successful!')
      navigate('/')
    } catch (error) {
      const errorMessage = error.response?.data?.errors?.[0]?.message || 'Login failed!'
      toast.error(errorMessage)
      console.error('❌ Registration Error:', errorMessage)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900 to-pink-800 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center text-pink-400 mb-6">Create Account</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm text-white/80">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              className="w-full px-4 py-2 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-white/80">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="w-full px-4 py-2 pr-10 bg-black/50 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-white"
              />
              <div
                className="absolute right-3 top-2.5 cursor-pointer text-white/70"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 transition text-white py-2 rounded-full font-semibold mt-4"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-white/60 mt-6">
          Already have an account? <NavLink to="/login" className="text-pink-400 underline">Login</NavLink>
        </p>
      </motion.div>
    </div>
  )
}

export default Register
