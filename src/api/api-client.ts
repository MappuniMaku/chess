import { ISendRequestOptions } from "./types";
import {
  fetchLoginOptions,
  fetchUsersOptions,
  IFetchLoginBodyRequest,
  IFetchLoginResponse,
  IFetchUsersResponse,
} from "./methods";
import {
  fetchProfileOptions,
  IFetchProfileResponse,
} from "./methods/fetch-profile";

class ApiClient {
  async sendRequest<ResponseType>(
    options: ISendRequestOptions,
    body?: unknown
  ): Promise<ResponseType> {
    const { method, path, shouldRedirectOnUnauthorized = true } = options;

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://chess-backend-nest.herokuapp.com";

    const response = await fetch(`${baseUrl}${path}`, {
      method,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers: {
        Authorization: `Bearer ${
          document.cookie
            .split("; ")
            .find((row) => row.startsWith("token="))
            ?.split("=")[1]
        }`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const { status } = response;
      if (shouldRedirectOnUnauthorized && status === 401) {
        window.location.href = "/login";
      }
      throw response;
    }

    return response.json();
  }

  async fetchUsers() {
    return this.sendRequest<IFetchUsersResponse>(fetchUsersOptions);
  }

  async fetchProfile() {
    return this.sendRequest<IFetchProfileResponse>(fetchProfileOptions);
  }

  async fetchLogin(body: IFetchLoginBodyRequest) {
    const result = await this.sendRequest<IFetchLoginResponse>(
      fetchLoginOptions,
      body
    );
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure";
    document.cookie = `token=${result.access_token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; Secure`;
  }
}

export const api = new ApiClient();
