const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string

const ApiPath = {
  AUTH: '/auth',
  BOOKINGS: '/bookings',
  TRIPS: '/trips',
} as const

const AuthApiPath = {
  SIGN_UP: '/sign-up',
  SIGN_IN: '/sign-in',
  AUTHENTICATED_USER: '/authenticated-user'
} as const

export { API_BASE_URL, ApiPath, AuthApiPath }