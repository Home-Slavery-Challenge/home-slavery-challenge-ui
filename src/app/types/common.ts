export interface Identifiable{
  id:number;
}

export type ApiResponse<T> = {
  data: T;
  message: string;
  changedFields: string[];
};
