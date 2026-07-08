export interface ICategory {
  _id: string;
  name: string;
  slug: string;
}

export interface ICategoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICategory[];
}
