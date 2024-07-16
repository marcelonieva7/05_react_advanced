import { type User } from "./index"

type UserSignUpRequestDto = {
  password: string
} & Omit<User, 'id' | 'createdAt'>

type UserSignUpResponseDto = {
  user: User,
  token: string
}

type UserSignInRequestDto = {
  email: string
  password: string
}

type UserSignInResponseDto = {
  user: User
  token: string
}

type UserAuthenticateResponseDto = User

export {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserAuthenticateResponseDto
}
