import { httpApi, type Http } from "../http/http";
import { ContentType, HTTPMethod } from '@/constants/http'
import { API_BASE_URL, ApiPath, AuthApiPath } from "@/constants/api";
import {
  type UserAuthenticateResponseDto,
  type UserSignInRequestDto,
  type UserSignInResponseDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto
} from '@/@types/api'

type Constructor = {
  apiPath: string;
  httpApi: Http;
};
  
class AuthApi {
  #apiPath: string;

  #httpApi: Http;

  public constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public signUp(payload: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.AUTH}${AuthApiPath.SIGN_UP}`,
      {
        contentType: ContentType.JSON,
        hasAuth: false,
        method: HTTPMethod.POST,
        payload: JSON.stringify(payload)
      }
    );
  }

  public signIn(payload: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.AUTH}${AuthApiPath.SIGN_IN}`,
      {
        contentType: ContentType.JSON,
        hasAuth: false,
        method: HTTPMethod.POST,
        payload: JSON.stringify(payload)
      }
    );
  }

  public getAuthenticatedUser(): Promise<UserAuthenticateResponseDto> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.AUTH}${AuthApiPath.AUTHENTICATED_USER}`,
      {
        contentType: ContentType.JSON,
        hasAuth: true,
        method: HTTPMethod.GET
      }
    );
  }
}

const authApi = new AuthApi({
  apiPath: API_BASE_URL,
  httpApi
});

export { type AuthApi, authApi };