import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import * as Icons from 'lucide-react'
import { useAuth } from '../Store/Auth'

const Services = () => {
  const {API} = useAuth()
  const [services, setServices] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(`${API}/api/services/data`)
        setServices(res.data.responce)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.error("❌ Error fetching services:", error)
      }
    }

    fetchServices()
  }, [])

  const Loader = () => (
    <motion.div
      className="flex items-center justify-center min-h-[50vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 border-[6px] rounded-full border-t-pink-500 border-b-purple-600 border-l-white/20 border-r-white/20"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </motion.div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-pink-800 text-white px-6 py-24">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-pink-400 mb-6"
        >
          My Services
        </motion.h1>
        <p className="text-white/80 max-w-2xl mx-auto mb-16 text-base">
          I build complete modern web applications — from code to deployment.
        </p>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((service, index) => {
              const toPascalCase = (str) =>
                str
                  .split('-')
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                  .join('')

              const IconName = toPascalCase(service.icon)
              const Icon = Icons[IconName] || Icons.Circle

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-lg hover:shadow-pink-500/30 transition text-left"
                >
                  <div className="mb-4">
                    <Icon size={40} className="text-pink-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-pink-300 mb-2">{service.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Services
