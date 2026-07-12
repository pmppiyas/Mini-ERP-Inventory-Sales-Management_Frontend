import type { ICategory } from '@/interfaces/category.interface';

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  category?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  sku: string;
  category: ICategory;
  purchasePrice: number;
  sellingPrice: number;
  stockQuantity: number;
  photoUrl: string;

  createdAt: string;
  updatedAt: string;
}

export interface IProductMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IProductResponse {
  data: IProductsResult;
}

export interface IProductsResult {
  products: IProduct[];
  meta: IProductMeta;
}
