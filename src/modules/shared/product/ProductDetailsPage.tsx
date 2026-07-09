import { useGetProductByIdQuery } from '@/redux/features/product/product.api';
import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  Package,
  Tag,
  Layers,
  TrendingDown,
  TrendingUp,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Minus,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: product, isLoading, error } = useGetProductByIdQuery(id!);

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-40 rounded-lg bg-muted" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-80 rounded-xl bg-muted" />
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 rounded-lg bg-muted" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Product Not Found
        </h2>
        <p className="text-sm text-muted-foreground">
          The product you are looking for does not exist or has been removed.
        </p>
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Go Back
        </Button>
      </div>
    );
  }

  const isLowStock = product.stockQuantity < 10;
  const profit = product.sellingPrice - product.purchasePrice;
  const profitMargin = ((profit / product.sellingPrice) * 100).toFixed(1);

  const stats = [
    {
      label: 'Purchase Price',
      value: `৳${product.purchasePrice.toLocaleString()}`,
      icon: TrendingDown,
      color: 'text-blue-500 bg-blue-500/10',
    },
    {
      label: 'Selling Price',
      value: `৳${product.sellingPrice.toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-primary bg-primary/10',
    },
    {
      label: 'Profit / Unit',
      value: `৳${profit.toLocaleString()} (${profitMargin}%)`,
      icon: TrendingUp,
      color: 'text-emerald-500 bg-emerald-500/10',
    },
    {
      label: 'Stock Quantity',
      value: `${product.stockQuantity} units`,
      icon: Layers,
      color: isLowStock
        ? 'text-destructive bg-destructive/10'
        : 'text-green-500 bg-green-500/10',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button + Title */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-lg font-bold text-foreground">Product Details</h1>
          <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Image Card */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="relative bg-muted h-72 lg:h-full min-h-64">
            <img
              src={product.photoUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {/* Stock status overlay */}
            <div className="absolute top-4 left-4">
              <Badge
                variant={isLowStock ? 'destructive' : 'secondary'}
                className="flex items-center gap-1"
              >
                {isLowStock ? (
                  <AlertTriangle className="h-3 w-3" />
                ) : (
                  <CheckCircle2 className="h-3 w-3" />
                )}
                {isLowStock ? 'Low Stock' : 'In Stock'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          {/* Product name + category */}
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {product.name}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {product?.category?.name ?? 'Uncategorized'}
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-border bg-muted/30 p-3 space-y-2"
                >
                  <div className="flex items-center gap-2 ">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.color}`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-xs text-muted-foreground text-center">
                      {stat.label}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-foreground">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* SKU & Category row */}
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Package className="h-4 w-4" />
                <span>SKU</span>
              </div>
              <span className="font-medium text-foreground font-mono text-xs bg-muted px-2 py-1 rounded">
                {product.sku}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Added</span>
              </div>
              <span className="font-medium text-foreground text-xs">
                {new Date(product.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Updated</span>
              </div>
              <span className="font-medium text-foreground text-xs">
                {new Date(product.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-4">
            <h3 className="text-sm font-semibold">Inventory Actions</h3>

            <div className="flex gap-2">
              <Input type="number" placeholder="Qty" min={1} />

              <Button variant="outline">Reset</Button>
            </div>

            <div className="flex gap-3">
              <Button className="flex-1 text-green-500 bg-green-500/10">
                <Plus className="mr-2 h-4 w-4" />
                Buy Stock
              </Button>

              <Button variant="outline" className="flex-1">
                <Minus className="mr-2 h-4 w-4" />
                Sell Stock
              </Button>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex gap-2 pt-1">
            <Button
              className="flex-1"
              onClick={() => navigate(`/admin/products/${id}/edit`)}
            >
              Edit Product
            </Button>
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Delete
            </Button>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
