import { storageApi } from "../storage/storage";
import { StorageKey } from "@/constants/storage";
import { HTTPCode, HttpHeader, HTTPMethod } from "@/constants/http";
import { HTTPError } from "./httpError";
import { type StorageApi } from "@/@types/storage";
import { type ValueOf } from "@/@types/utils";
import { type HttpOptions, type ErrorResponse } from "@/@types/http";

type Constructor = {
  storageApi: StorageApi;
};

class Http {
  #handleError = async (response: Response): Promise<never> => {
    const exception = (await response.json()) as ErrorResponse;

    throw new HTTPError({
      message: exception.message,
      status: response.status as ValueOf<typeof HTTPCode>
    });
  };

  #parseJSON = <T>(response: Response): Promise<T> => {
    return response.json() as Promise<T>;
  };

  #storageApi: StorageApi;

  public constructor({ storageApi }: Constructor) {
    this.#storageApi = storageApi;
  }

  async #checkResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      await this.#handleError(response);
    }

    return await this.#parseJSON(response);
  }

  #getHeaders({
    contentType,
    hasAuth
  }: Partial<Pick<HttpOptions, 'contentType' | 'hasAuth'>>): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = this.#storageApi.get(StorageKey.TOKEN);
      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  public async load<T>(
    url: string,
    options: Partial<HttpOptions> = {}
  ): Promise<T> | never {
    const {
      contentType,
      hasAuth = true,
      method = HTTPMethod.GET,
      payload = null,
    } = options;

    const headers = this.#getHeaders({
      contentType,
      hasAuth
    });

    const response = await fetch(url, {
      body: payload,
      headers,
      method
    });

    return (await this.#checkResponse(response)) as T;
  }
}

const httpApi = new Http({
  storageApi
});

export { httpApi, type Http };