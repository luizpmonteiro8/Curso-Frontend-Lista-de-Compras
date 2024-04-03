export interface PaginationParams {
  page?: number;
  size?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
}

export interface Pagination {
  page: number;
  length: number;
  size: number;
  lastPage: number;
}
