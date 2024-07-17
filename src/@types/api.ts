import { type Booking, type Trip, type User } from "./index"

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

type TripResponseDto = Trip

type BookingsGetResponseDto = Booking

type BookingAddRequestDto = Pick<Booking, ("tripId" | "guests" | "date")>

export {
  type BookingAddRequestDto,
  type BookingsGetResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserAuthenticateResponseDto,
  type TripResponseDto
}
