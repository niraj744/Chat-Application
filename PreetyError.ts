import { AxiosError } from "axios";

export const preetyError = (error: unknown) => {
  if (error instanceof AxiosError) {
    return {
      message: error.response?.data.message || error.message,
      status: error.response?.data.status || error.status,
    };
  }
};
