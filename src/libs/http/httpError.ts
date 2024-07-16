import { type ValueOf } from "@/@types/utils";
import { HTTPCode, ExceptionName } from "@/constants/http";

type Constructor = {
  message?: string;
  status: ValueOf<typeof HTTPCode>;
};

const DEFAULT_MESSAGE = 'Network Error';

class HTTPError extends Error {
  public status: ValueOf<typeof HTTPCode>;

  public constructor({
    message = DEFAULT_MESSAGE,
    status
  }: Constructor) {
    super(message);
    this.status = status;
    this.name = ExceptionName.HTTP_ERROR;
  }
}

export { HTTPError }
