export class HttpApiResponse<T> {
    isSuccess?: boolean;
    message?: string;
    data?: T;
    errorMessage?: string;
  }