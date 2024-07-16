import { type ToastOptions, toast } from 'react-toastify';

type Constructor = {
  toast: typeof toast;
};

class Notification {
  #toast;

  public constructor({ toast }: Constructor) {
    this.#toast = toast;
  }

  public error(message: string): void {
    const options: ToastOptions = {
      autoClose: false,
      position: 'top-center',
      theme: 'colored',
      type: 'error'
    };
    this.#toast.error(message, options);
  }

  public info(message: string): void {
    this.#toast.info(message);
  }

  public success(message: string): void {
    this.#toast.success(message);
  }

  public warning(message: string): void {
    this.#toast.warning(message);
  }
}

const notification = new Notification({ toast });

export { notification };
