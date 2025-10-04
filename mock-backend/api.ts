/* Mock api implementation */

import type {
  EndpointConfig,
  ErrorConfig,
  MockError,
  MockRequestConfig,
  MockResponse,
} from "./types";

class MockApi {
  private endpoints: Map<string, Map<string, EndpointConfig>> = new Map();
  private delay: number = 100; // Simulate network latency

  registerEndpoint(method: string, url: string, config: EndpointConfig): void {
    const normalizedMethod = method.toUpperCase();
    if (!this.endpoints.has(normalizedMethod)) {
      this.endpoints.set(normalizedMethod, new Map());
    }
    this.endpoints.get(normalizedMethod)!.set(url, config);
  }

  setDelay(ms: number): void {
    this.delay = ms;
  }

  private findHandler(method: string, url: string): EndpointConfig | null {
    const methodMap = this.endpoints.get(method.toUpperCase());
    if (!methodMap) return null;

    const urlPath = url.split("?")[0];

    if (methodMap.has(urlPath)) {
      return methodMap.get(urlPath)!;
    }

    for (const [pattern, config] of methodMap.entries()) {
      if (this.matchPattern(pattern, urlPath)) {
        return config;
      }
    }

    return null;
  }

  private matchPattern(pattern: string, url: string): boolean {
    const patternParts = pattern.split("/");
    const urlParts = url.split("/");

    if (patternParts.length !== urlParts.length) return false;

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(":")) continue;
      if (patternParts[i] !== urlParts[i]) return false;
    }

    return true;
  }

  private extractPathParams(
    pattern: string,
    url: string
  ): Record<string, string> {
    const params: Record<string, string> = {};
    const patternParts = pattern.split("/");
    const urlParts = url.split("/");

    for (let i = 0; i < patternParts.length; i++) {
      if (patternParts[i].startsWith(":")) {
        const paramName = patternParts[i].substring(1);
        params[paramName] = urlParts[i];
      }
    }

    return params;
  }

  private extractQueryParams(url: string): Record<string, any> {
    const params: Record<string, any> = {};
    const queryString = url.split("?")[1];

    if (!queryString) return params;

    const searchParams = new URLSearchParams(queryString);
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    return params;
  }

  private shouldThrowError(errors?: ErrorConfig[]): ErrorConfig | null {
    if (!errors || errors.length === 0) return null;

    const random = Math.random();
    let cumulative = 0;

    for (const error of errors) {
      cumulative += error.probability;
      if (random < cumulative) {
        return error;
      }
    }

    return null;
  }

  createError(
    status: number,
    message: string,
    config: MockRequestConfig
  ): MockError {
    return {
      message,
      code: `ERR_${status}`,
      response: {
        data: { error: message },
        status,
        statusText: this.getStatusText(status),
        headers: {},
      },
      config,
      isError: true,
    };
  }

  createResponse<T = any>(
    data: T,
    config: MockRequestConfig,
    status: number = 200,
    headers: Record<string, string> = { "content-type": "application/json" }
  ): MockResponse<T> {
    return {
      data,
      status,
      statusText: this.getStatusText(status),
      headers,
      config,
    };
  }

  private getStatusText(status: number): string {
    const statusTexts: Record<number, string> = {
      200: "OK",
      201: "Created",
      204: "No Content",
      400: "Bad Request",
      401: "Unauthorized",
      403: "Forbidden",
      404: "Not Found",
      500: "Internal Server Error",
      503: "Service Unavailable",
    };
    return statusTexts[status] || "Unknown";
  }

  private async request<T = any>(
    config: MockRequestConfig
  ): Promise<MockResponse<T>> {
    await new Promise((resolve) => setTimeout(resolve, this.delay));

    const { method, url, params = {} } = config;
    const urlPath = url.split("?")[0];
    const endpoint = this.findHandler(method, url);

    if (!endpoint) {
      throw this.createError(
        404,
        `Endpoint not found: ${method} ${url}`,
        config
      );
    }

    const errorConfig = this.shouldThrowError(endpoint.errors);
    if (errorConfig) {
      throw this.createError(errorConfig.status, errorConfig.message, config);
    }

    const queryParams = this.extractQueryParams(url);

    let pathParams: Record<string, string> = {};
    for (const [pattern] of this.endpoints.get(method.toUpperCase())!) {
      if (this.matchPattern(pattern, urlPath)) {
        pathParams = this.extractPathParams(pattern, urlPath);
        break;
      }
    }

    config.params = { ...queryParams, ...pathParams, ...params };

    const response = await endpoint.handler(config);

    return response;
  }

  async get<T = any>(
    url: string,
    config?: Omit<MockRequestConfig, "url" | "method">
  ): Promise<MockResponse<T>> {
    return this.request<T>({ ...config, method: "GET", url });
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: Omit<MockRequestConfig, "url" | "method" | "data">
  ): Promise<MockResponse<T>> {
    return this.request<T>({ ...config, method: "POST", url, data });
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: Omit<MockRequestConfig, "url" | "method" | "data">
  ): Promise<MockResponse<T>> {
    return this.request<T>({ ...config, method: "PUT", url, data });
  }

  async patch<T = any>(
    url: string,
    data?: any,
    config?: Omit<MockRequestConfig, "url" | "method" | "data">
  ): Promise<MockResponse<T>> {
    return this.request<T>({ ...config, method: "PATCH", url, data });
  }

  async delete<T = any>(
    url: string,
    config?: Omit<MockRequestConfig, "url" | "method">
  ): Promise<MockResponse<T>> {
    return this.request<T>({ ...config, method: "DELETE", url });
  }
}

export const api = new MockApi();
