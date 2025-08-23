import type { AxiosRequestHeaders, ResponseType } from 'axios';

export interface IAxios<P, B> {
  url: string;
  params?: P;
  body?: B;
  data?: B;
  headers?: AxiosRequestHeaders;
  responseType?: ResponseType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUploadProgress?: (progressEvent: any) => void;
}
