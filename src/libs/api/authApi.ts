import { httpApi, type Http } from "../http/http";
import { ContentType, HTTPMethod } from '@/constants/http'
import { API_BASE_URL, ApiPath, AuthApiPath } from "@/constants/api";
import { type UserSignUpRequestDto, type UserSignUpResponseDto } from '@/@types/api'

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
}

const authApi = new AuthApi({
  apiPath: API_BASE_URL,
  httpApi
});

export { type AuthApi, authApi };