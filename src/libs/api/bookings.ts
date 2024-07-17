import { httpApi, type Http } from "../http/http";
import { ContentType, HTTPMethod } from '@/constants/http'
import { API_BASE_URL, ApiPath } from "@/constants/api";
import {
  type BookingAddResponseDto,
  type BookingsGetResponseDto
} from '@/@types/api'

type Constructor = {
  apiPath: string;
  httpApi: Http;
};
  
class BookingsApi {
  #apiPath: string;

  #httpApi: Http;

  public constructor({ apiPath, httpApi }: Constructor) {
    this.#apiPath = apiPath;
    this.#httpApi = httpApi;
  }

  public getAll(): Promise<BookingsGetResponseDto[]> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.BOOKINGS}`,
      {
        contentType: ContentType.JSON,
        hasAuth: true,
        method: HTTPMethod.GET
      }
    );
  }

  public addBooking(payload: BookingAddResponseDto): Promise<BookingsGetResponseDto> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.BOOKINGS}`,
      {
        contentType: ContentType.JSON,
        hasAuth: true,
        method: HTTPMethod.POST,
        payload: JSON.stringify(payload)
      }
    )
  }

  public deleteBooking(bookingId: string): Promise<string> {
    return this.#httpApi.load(
      `${this.#apiPath}${ApiPath.BOOKINGS}/${bookingId}`,
      {
        contentType: ContentType.JSON,
        hasAuth: true,
        method: HTTPMethod.DELETE
      }
    )
  }
}

const bookingsApi = new BookingsApi({
  apiPath: API_BASE_URL,
  httpApi
});

export { type BookingsApi, bookingsApi };