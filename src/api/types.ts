export interface ISendRequestOptions {
  method: "GET" | "POST";
  path: string;
  shouldRedirectOnUnauthorized?: boolean;
}
