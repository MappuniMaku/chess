import { ISendRequestOptions } from "./types";
import {
  fetchLoginOptions,
  fetchProfileOptions,
  fetchUserOptions,
  fetchUsersOptions,
  IFetchLoginBodyRequest,
  IFetchLoginResponse,
  IFetchProfileResponse,
  IFetchUserResponse,
  IFetchUsersResponse,
} from "./methods";

class ApiClient {
  async sendRequest<ResponseType>({
    options,
    body,
    pathParams,
  }: {
    options: ISendRequestOptions;
    body?: unknown;
    pathParams?: Record<string, string>;
  }): Promise<ResponseType> {
    const { method, path, shouldRedirectOnUnauthorized = false } = options;

    const dynamicPathKeys = path.split("/").filter((k) => k.startsWith(":"));
    let mappedPath = path;
    dynamicPathKeys.forEach((k) => {
      mappedPath = mappedPath.replace(k, pathParams?.[k.slice(1)] ?? "");
    });

    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://chess-backend-nest.herokuapp.com";

    const response = await fetch(`${baseUrl}${mappedPath}`, {
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
    return this.sendRequest<IFetchUsersResponse>({
      options: fetchUsersOptions,
    });
  }

  async fetchUser(pathParams: { username: string }) {
    return this.sendRequest<IFetchUserResponse>({
      options: fetchUserOptions,
      pathParams,
    });
  }

  async fetchProfile() {
    return this.sendRequest<IFetchProfileResponse>({
      options: fetchProfileOptions,
    });
  }

  async fetchLogin(body: IFetchLoginBodyRequest) {
    const result = await this.sendRequest<IFetchLoginResponse>({
      options: fetchLoginOptions,
      body,
    });
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Secure";
    document.cookie = `token=${result.access_token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; Secure`;
  }
}

export const api = new ApiClient();
