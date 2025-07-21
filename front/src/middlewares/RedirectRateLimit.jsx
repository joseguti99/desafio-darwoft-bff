import { HttpStatusCode } from "axios";
import { routesPaths } from "../routes";

export const RedirectRateLimit = (api) => {
  api.interceptors.response.use(
    response => response,
    error => {
      const route = window.location.pathname;
      if (route === routesPaths.rateLimit) return;
      if (error.response?.status === HttpStatusCode.TooManyRequests) {
        window.location.href = routesPaths.rateLimit;
      }
      return Promise.reject(error);
    }
  );
};
