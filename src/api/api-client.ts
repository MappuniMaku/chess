import { ISendRequestOptions } from './types';
import {
  fetchLoginOptions,
  fetchProfileOptions,
  fetchSignupOptions,
  fetchUserOptions,
  fetchUsersOptions,
  IFetchLoginBodyRequest,
  IFetchLoginResponse,
  IFetchProfileResponse,
  IFetchSignupBodyRequest,
  IFetchSignupResponse,
  IFetchUserResponse,
  IFetchUsersResponse,
} from './methods';
import { IUsersFilters } from '@/types';
import { LOCAL_BACKEND_ADDRESS, PRODUCTION_BACKEND_ADDRESS } from '@/consts';
import { clearCookie } from '@/helpers';

class ApiClient {
  async sendRequest<ResponseType>({
    options,
    body,
    pathParams,
    params,
  }: {
    options: ISendRequestOptions;
    body?: unknown;
    pathParams?: Record<string, string>;
    params?: Record<string, string | number>;
  }): Promise<ResponseType> {
    const { method, path, shouldRedirectOnUnauthorized = false } = options;

    const dynamicPathKeys = path.split('/').filter((k) => k.startsWith(':'));
    let mappedPath = path;
    dynamicPathKeys.forEach((k) => {
      mappedPath = mappedPath.replace(k, pathParams?.[k.slice(1)] ?? '');
    });

    const baseUrl =
      process.env.NODE_ENV === 'development' ? LOCAL_BACKEND_ADDRESS : PRODUCTION_BACKEND_ADDRESS;

    const stringifiedParams: Record<string, string> = Object.keys(params ?? {}).reduce(
      (acc, k) => ({
        ...acc,
        [k]: String(params?.[k]),
      }),
      {},
    );
    const queryParamsString = new URLSearchParams(stringifiedParams).toString();
    const queryParams = queryParamsString !== '' ? `?${queryParamsString}` : '';

    const response = await fetch(`${baseUrl}${mappedPath}${queryParams}`, {
      method,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      headers: {
        Authorization: `Bearer ${
          document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1]
        }`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const { status } = response;
      if (shouldRedirectOnUnauthorized && status === 401) {
        window.location.href = '/login';
      }
      throw await response.json();
    }

    return response.json();
  }

  async fetchUsers({ params }: { params?: IUsersFilters }) {
    return this.sendRequest<IFetchUsersResponse>({
      options: fetchUsersOptions,
      params,
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
    clearCookie('token');
    document.cookie = `token=${result.access_token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; Secure`;
  }

  async fetchSignup(body: IFetchSignupBodyRequest) {
    return this.sendRequest<IFetchSignupResponse>({
      options: fetchSignupOptions,
      body,
    });
  }
}

export const api = new ApiClient();
