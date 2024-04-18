export interface BaseRequest {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}
