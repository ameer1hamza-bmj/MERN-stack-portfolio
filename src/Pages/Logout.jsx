import  { useEffect, useRef } from 'react'
import { useAuth } from '../Store/Auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Logout = () => {
  const { setToken } = useAuth()
  const navigate = useNavigate()
  const hasLoggedOut = useRef(false) 

  useEffect(() => {
    if (!hasLoggedOut.current) {
      setToken(null)
      localStorage.removeItem('token')
      toast.success('Logged out successfully!')
      navigate('/login')
      hasLoggedOut.current = true
    }
  }, [setToken, navigate])

  return null
}

export default Logout
