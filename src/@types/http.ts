import { type ValueOf } from "@/@types/utils";
import { ContentType, HTTPMethod } from '@/constants/http';

type ErrorResponse = {
  error : string,
  message : string,
  statusCode: number
}
type HttpOptions = {
  contentType?: ValueOf<typeof ContentType> | undefined;
  hasAuth: boolean;
  headers: Headers;
  method: ValueOf<typeof HTTPMethod>;
  payload: BodyInit | null;
  query: Record<string, unknown>;
};

export { type ErrorResponse, type HttpOptions }
