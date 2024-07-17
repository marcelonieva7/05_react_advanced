import { httpApi, type Http } from "../http/http";
import { ContentType, HTTPMethod } from '@/constants/http'
import { API_BASE_URL, ApiPath } from "@/constants/api";
import {
  type TripResponseDto,
} from '@/@types/api'

type Constructor = {
  apiPath: string;
  httpApi: Http;
};
  
class TripsApi {
  #apiPath: string;

  #httpApi: Http;

  public constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public getAll(): Promise<TripResponseDto[]> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.TRIPS}`,
      {
        contentType: ContentType.JSON,
        hasAuth: true,
        method: HTTPMethod.GET
      }
    );
  }

  public getById(tripId: string): Promise<TripResponseDto> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.TRIPS}/${tripId}`,
      {
        contentType: ContentType.JSON,
        hasAuth: true,
        method: HTTPMethod.GET
      }
    );
  }
}

const tripsApi = new TripsApi({
  apiPath: API_BASE_URL,
  httpApi
});

export { type TripsApi, tripsApi };