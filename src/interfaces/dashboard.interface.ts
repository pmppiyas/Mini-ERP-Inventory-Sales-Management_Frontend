export interface IDashboardSummary {
  totalProducts: number;
  totalCategories: number;
  totalEmployees: number;
  totalSales: number;
  totalRevenue: number;
  todaySales: number;
  todayRevenue: number;
  lowStockProductsCount: number;
  outOfStockProductsCount: number;
}

export interface IDashboardSalesAnalytics {
  todayRevenue: number;
  thisWeekRevenue: number;
  thisMonthRevenue: number;
  thisYearRevenue: number;
}

export interface ISalesChartPoint {
  date: string;
  totalSales: number;
  totalRevenue: number;
}

export interface IRecentSale {
  productName: string;
  sellerName: string;
  quantity: number;
  sellingPrice: number;
  totalAmount: number;
  createdAt: string;
}

export interface ILowStockProduct {
  _id: string;
  name: string;
  stockQuantity: number;
  sku?: string;
}

export interface ITopSellingProduct {
  productName: string;
  totalQuantitySold: number;
  totalRevenue: number;
}

export interface IEmployeePerformance {
  employeeName: string;
  numberOfSales: number;
  revenueGenerated: number;
}

export interface IDashboardData {
  summary: IDashboardSummary;
  salesAnalytics: IDashboardSalesAnalytics;
  salesChart: ISalesChartPoint[];
  recentSales: IRecentSale[];
  lowStockProducts: ILowStockProduct[];
  topSellingProducts: ITopSellingProduct[];
  employeePerformance: IEmployeePerformance[];
}

export interface IDashboardResponse {
  success: boolean;
  message: string;
  data: IDashboardData;
}
