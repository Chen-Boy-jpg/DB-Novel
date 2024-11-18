/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";

interface Payload extends AxiosRequestConfig {
  customHeaders?: AxiosRequestHeaders;
}

const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api", // 設定為固定的 baseURL
  responseType: "json",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    try {
      if (config.headers) {
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    } catch {
      return Promise.reject("error");
    }
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (
      response.status === 201 ||
      response.status === 204 ||
      response.status === 200
    ) {
      return response.data;
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const requestWithTimeout =
  (timeout: number, removeApiSuffix: boolean = false) =>
  async (endpoint: string, config: AxiosRequestConfig) => {
    const source = axios.CancelToken.source();
    const timer = setTimeout(() => {
      source.cancel("Timeout");
    }, timeout);

    const finalBaseURL =
      removeApiSuffix && api.defaults.baseURL?.endsWith("/api")
        ? api.defaults.baseURL.slice(0, -4)
        : api.defaults.baseURL;

    try {
      const response: any = await api(`${finalBaseURL}${endpoint}`, {
        ...config,
        cancelToken: source.token,
        headers: {
          ...config.headers,
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.response && error.response.data) {
          return Promise.reject(error.response);
        } else {
          return Promise.reject(error);
        }
      } else {
        return Promise.reject({
          data: {
            message: "Unexpected error occurred",
            type: "UNKNOWN_ERROR",
          },
        });
      }
    } finally {
      clearTimeout(timer);
    }
  };

export const request = requestWithTimeout(500000, false);
export const requestWithApiSuffix = requestWithTimeout(500000, true);

export const put = <T>(
  endpoint: string,
  payload: T,
  removeApiSuffix: boolean = false
) =>
  requestWithTimeout(50000, removeApiSuffix).bind(null, endpoint, {
    method: "PUT",
    data: payload,
  });

export const post = <T>(
  endpoint: string,
  payload: T,
  removeApiSuffix: boolean = false
) =>
  requestWithTimeout(50000, removeApiSuffix).bind(null, endpoint, {
    method: "POST",
    data: payload,
  });

export const postWithResponse = async <T>(
  endpoint: string,
  payload: T,
  removeApiSuffix: boolean = false
): Promise<any> => {
  try {
    const response = await requestWithTimeout(50000, removeApiSuffix).bind(
      null,
      endpoint,
      {
        method: "POST",
        data: payload,
      }
    )();
    return response;
  } catch (error) {
    throw error;
  }
};

export const del = <T>(endpoint: string, removeApiSuffix: boolean = false) =>
  requestWithTimeout(50000, removeApiSuffix).bind(null, endpoint, {
    method: "DELETE",
  });

export const delWithResponse = async <T>(
  endpoint: string,
  removeApiSuffix: boolean = false
): Promise<any> => {
  try {
    const response = await requestWithTimeout(50000, removeApiSuffix).bind(
      null,
      endpoint,
      {
        method: "DELETE",
      }
    )();
    return response;
  } catch (error) {
    throw error;
  }
};

export const postNoData = (removeApiSuffix: boolean = false) =>
  requestWithTimeout(50000, removeApiSuffix).bind(null, "", {
    method: "POST",
  });
