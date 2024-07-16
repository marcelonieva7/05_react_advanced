import { type FC } from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/hooks/useAppSelector"
import { AppRoutes } from "@/libs/router/appRoutes"

const ProtectedRoute: FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAppSelector(({ auth }) => auth)

  return user ? children : <Navigate to={AppRoutes.SIGN_IN} replace />
}

export { ProtectedRoute }