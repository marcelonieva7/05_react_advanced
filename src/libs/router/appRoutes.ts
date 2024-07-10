const AppRoutes = {
  ROOT: '/',
  HOME: '/home',
  TODOS: '/todos'
} as const satisfies Record<Uppercase<string>, `/${string}`>

export { AppRoutes }