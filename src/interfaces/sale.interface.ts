export interface CartItem {
  productId: string;
  name: string;
  sku: string;
  photoUrl: string;
  stockQuantity: number;
  sellingPrice: number;
  quantity: number;
}

export interface ISaleItem {
  productId: string;
  quantity: number;
  sellingPrice?: number;
}

export interface ISaleProduct {
  _id: string;
  name: string;
  sellingPrice?: number;
}

export interface ISaleSeller {
  _id: string;
  name: string;
  email: string;
}

export interface ISale {
  _id: string;
  sellerId: ISaleSeller;
  productId: ISaleProduct;
  quantity: number;
  sellingPrice: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ISaleMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ISalesResult {
  sales: ISale[];
  meta: ISaleMeta;
}

export interface ISalesResponse {
  success: boolean;
  message: string;
  data: ISalesResult;
}

export interface ISaleResponse {
  success: boolean;
  message: string;
  data: ISale;
}

export interface ISaleQueryParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  fromDate?: string;
  toDate?: string;
  searchTerm?: string;
}
