export interface MockResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: MockRequestConfig;
}

export interface MockError {
  message: string;
  code?: string;
  response?: {
    data: any;
    status: number;
    statusText: string;
    headers: Record<string, string>;
  };
  config?: MockRequestConfig;
  isError: true;
}

export interface MockRequestConfig {
  url: string;
  method: string;
  headers?: Record<string, any>;
  params?: any;
  data?: any;
}

export type EndpointHandler = (
  config: MockRequestConfig
) => Promise<MockResponse>;

export interface ErrorConfig {
  status: number;
  message: string;
  probability: number; // 0-1, where 1 = 100% chance
}

export interface EndpointConfig {
  handler: EndpointHandler;
  errors?: ErrorConfig[];
}
