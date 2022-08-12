export interface ISendRequestOptions {
  method: "GET" | "POST";
  path: string;
  shouldRedirectOnUnauthorized?: boolean;
}

export type IPaginationRequest = {
  page?: number;
  pageSize?: number;
};

export interface IPaginatedResponse<ItemType> {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  items: ItemType[];
}
