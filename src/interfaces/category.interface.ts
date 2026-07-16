export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  parentId?: string;
  children?: ICategory[];
}

export interface ICategoryResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ICategory[];
}

export interface ICategoryPayload {
  categoryId: string;
  name?: string;
  parentId?: string;
  MODE: 'EDIT' | 'MOVE';
}
