const AppRoutes = {
  ROOT: '/',
  HOME: '/',
  BOOKINGS: '/bookings',
  SIGN_IN: '/sign-in'
} as const satisfies Record<Uppercase<string>, `/${string}`>

export { AppRoutes }