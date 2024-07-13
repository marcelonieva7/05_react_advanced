const AppRoutes = {
  ROOT: '/',
  HOME: '/',
  BOOKINGS: '/bookings',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  TRIP: '/trip'
} as const satisfies Record<Uppercase<string>, `/${string}`>

export { AppRoutes }