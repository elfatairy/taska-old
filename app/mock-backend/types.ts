export interface MockAxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: MockAxiosRequestConfig;
}

export interface MockAxiosError {
  message: string;
  code?: string;
  response?: {
    data: any;
    status: number;
    statusText: string;
    headers: Record<string, string>;
  };
  config?: MockAxiosRequestConfig;
  isAxiosError: true;
}

export interface MockAxiosRequestConfig {
  url: string;
  method: string;
  headers?: Record<string, any>;
  params?: any;
  data?: any;
}

export type EndpointHandler = (
  config: MockAxiosRequestConfig
) => Promise<MockAxiosResponse>;

export interface ErrorConfig {
  status: number;
  message: string;
  probability: number; // 0-1, where 1 = 100% chance
}

export interface EndpointConfig {
  handler: EndpointHandler;
  errors?: ErrorConfig[];
}
