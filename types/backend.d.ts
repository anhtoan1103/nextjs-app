export { };

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: unknown };
    queryParams?: unknown;
    useCredentials?: boolean;
    headers?: unknown;
    nextOptions?: unknown;
  }

  interface IBackendRes<T> {
    error?: string | string[];
    message?: string;
    statusCode: number | string;
    data?: T;
  }


}