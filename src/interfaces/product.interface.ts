export interface ProductQueryParams {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sort?: string;
  category?: string;
}

export interface IProduct {
  _id: string;
  productName: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stockQuantity: number;
  productImage: string;

  createdAt: string;
  updatedAt: string;
}

export interface IMeta {
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
  meta: IMeta;
}
