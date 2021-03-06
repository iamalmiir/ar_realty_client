import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkUserLoggedIn()
  }, [])

  const registerUser = async (e) => {
    e.preventDefault()
    const body = {
      email: e.target.email.value,
      full_name: e.target.full_name.value,
      user_name: e.target.user_name.value,
      password: e.target.password.value,
    }

    try {
      setIsLoading(true)
      const res = await axios.post('/api/auth/register', body)
      if (res.data.success) {
        toast.success('Nice! You are now registered.')
        router.push('/users/login')
      }
    } catch (err) {
      toast.error(
        'Registration failed - make sure you filled out all fields correctly'
      )
    }
    setIsLoading(false)
  }

  const loginUser = async (e) => {
    e.preventDefault()
    const body = {
      user_name: e.target.user_name.value,
      password: e.target.password.value,
    }

    try {
      setIsLoading(true)
      const res = await axios.post('/api/auth/login', body)
      if (res.data.success) {
        setUser(res.data.resData)
        setIsLoggedIn(res.data.success ? true : false)
        toast.success(res.data.message)
        router.push('/account/dashboard')
      }
    } catch (err) {
      toast.error('Login failed - check your credentials')
    }
    setIsLoading(false)
  }

  const logoutUser = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await axios.get('/api/auth/logout')
      setUser(null)
      setIsLoggedIn(false)
      router.pathname === '/account/dashboard' && router.push('/')
      toast.success('Logout successful')
    } catch (err) {
      toast.error('Logout failed')
    }
    setIsLoading(false)
  }

  const checkUserLoggedIn = async () => {
    try {
      setIsLoading(true)
      const res = await axios.get('/api/auth/user')
      setUser(res.data.resData)
      setIsLoggedIn(true)
    } catch (err) {
      toast.error('Your session has expired')
    }
    setIsLoading(false)
  }

  const contextData = {
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
    user: user,
    isLoggedIn: isLoggedIn,
    isLoading: isLoading,
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}
