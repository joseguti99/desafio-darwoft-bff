import { HttpStatusCode } from "axios";
import { routesPaths } from "../routes";

export const RedirectRateLimit = (api) => {
  api.interceptors.response.use(
    response => response,
    error => {
      if (error.response?.status === HttpStatusCode.TooManyRequests) {
        window.location.href = routesPaths.rateLimit;
      }
      return Promise.reject(error);
    }
  );
};
