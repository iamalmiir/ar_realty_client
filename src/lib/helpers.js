import cookie from 'cookie'
import axios from 'axios'

export const fetcher = async (url) => axios.get(url).then((res) => res.data)
export const PER_PAGE = 6
export const response = (res, code, status, message, userData) => {
  return res.status(code).json({
    success: status,
    message: message,
    user: userData ? userData : null,
  })
}

export const parseCookie = (req) => {
  return cookie.parse(req.headers.cookie)
}

export const setCookies = (res, access, refresh) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('access', access ? access : '', {
      httpOnly: true,
      maxAge: 120 * 60 * 1000, // 120 minutes
      path: '/api/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    }),
    cookie.serialize('refresh', refresh ? refresh : '', {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/api/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })
  )
}

export const removeCookies = (res) => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('access', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/api/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    }),
    cookie.serialize('refresh', '', {
      httpOnly: true,
      expires: new Date(0),
      path: '/api/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    })
  )
}