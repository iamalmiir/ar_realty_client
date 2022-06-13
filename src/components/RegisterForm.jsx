import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { FormInput, FormButton } from '@components/FormComponents'

const RegisterForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [full_name, setFullName] = useState('')
  const [user_name, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== passwordConfirmation) {
      alert('Passwords do not match')
      return
    }
    const body = {
      email,
      full_name,
      user_name,
      password,
    }

    try {
      const res = await axios.post('/api/auth/register', body)
      console.log(res)
      if (res.data.success) {
        toast.success('Nice! You are now registered.')
        router.push('/account/dashboard')
      }
    } catch (err) {
      toast.error(
        'Registration failed - make sure you filled out all fields correctly'
      )
    }
  }

  const handleChange = (e) => {
    switch (e.target.name) {
      case 'full_name':
        setFullName(e.target.value)
        break
      case 'email':
        setEmail(e.target.value)
        break
      case 'user_name':
        setUserName(e.target.value)
        break
      case 'password':
        setPassword(e.target.value)
        break
      case 'passwordConfirmation':
        setPasswordConfirmation(e.target.value)
        break
      default:
        break
    }
  }

  const handlePasswordMatch = () => {
    if (password === passwordConfirmation) {
      setPasswordMatch(true)
    } else {
      setPasswordMatch(false)
    }
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <FormInput
        name='full_name'
        type='text'
        label='Full name'
        required
        value={full_name}
        onChange={handleChange}
      />
      <FormInput
        name='email'
        type='email'
        label='Email address'
        required
        value={email}
        onChange={handleChange}
      />
      <FormInput
        name='user_name'
        type='text'
        label='User name'
        required
        value={user_name}
        onChange={handleChange}
      />

      <FormInput
        name='password'
        type='password'
        label='Password'
        required
        value={password}
        onChange={handleChange}
      />

      <FormInput
        name='passwordConfirmation'
        type='password'
        label='Confirm password'
        required
        value={passwordConfirmation}
        onChange={handleChange}
        passwordMatch={passwordMatch}
        {...{ passwordMatch, handlePasswordMatch }}
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
      <FormButton type={'submit'} label='Register' />
    </form>
  )
}

export default RegisterForm
