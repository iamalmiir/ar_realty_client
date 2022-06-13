import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { FormInput, FormButton } from '@components/FormComponents'

const LoginForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const body = {
      email,
      password,
    }
    try {
      const res = await axios.post('/api/auth/login', body)
      if (res.data.success) {
        router.push('/account/dashboard')
        toast.success('Login successful')
      }
    } catch (err) {
      setPassword('')
      toast.error('Login failed - check your email and password')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <FormInput
        name='email'
        type='email'
        label='Email address'
        required
        onChange={handleChange}
        value={email}
      />
      <FormInput
        name='password'
        type='password'
        label='Password'
        required
        onChange={handleChange}
        value={password}
      />
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <input
            id='remember-me'
            name='remember-me'
            type='checkbox'
            className='h-4 w-4 text-primaryLight focus:ring-accentDark border-gray-300 rounded'
          />
          <label
            htmlFor='remember-me'
            className='ml-2 block text-sm text-gray-900'
          >
            Remember me
          </label>
        </div>

        <div className='text-sm'>
          <a
            href='#'
            className='font-medium text-primaryLight hover:text-accentDark'
          >
            Forgot your password?
          </a>
        </div>
      </div>

      <FormButton type={'submit'} label='Log in' />
    </form>
  )
}

export default LoginForm
