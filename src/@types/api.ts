import { type User } from "./index"

type UserSignUpRequestDto = {
  password: string
} & Omit<User, 'id' | 'createdAt'>

type UserSignUpResponseDto = {
  user: User,
  token: string
}

export {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
}
