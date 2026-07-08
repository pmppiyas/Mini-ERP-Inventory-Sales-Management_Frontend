import type { IProduct } from '@/interfaces/product.interface';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { Package, Tag, TrendingUp, Layers, ArrowRight } from 'lucide-react';

const ProductContent = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {products.map((product) => (
        <Link
          to={`/admin/products/${product._id}`}
          key={product._id}
          className="group block rounded-xl border border-border bg-card hover:shadow-md hover:border-primary/30 transition-all duration-200"
        >
          {/* Image */}
          <div className="relative overflow-hidden rounded-t-xl bg-muted h-48">
            <img
              src={product.photoUrl}
              alt={product.productName}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* Stock badge */}
            <div className="absolute top-3 right-3">
              <Badge
                variant={
                  product.stockQuantity < 10 ? 'destructive' : 'secondary'
                }
                className="text-xs"
              >
                {product.stockQuantity < 10 ? 'Low Stock' : 'In Stock'}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <h2 className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                {product.productName}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                SKU: {product.sku}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Tag className="h-3 w-3" />
                <span>{product?.category?.name ?? 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Layers className="h-3 w-3" />
                <span>{product.stockQuantity} units</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div className="space-y-0.5">
                <p className="text-[10px] text-muted-foreground">Buy / Sell</p>
                <p className="text-sm font-semibold text-foreground">
                  ৳{product.purchasePrice}{' '}
                  <span className="text-primary">
                    / ৳{product.sellingPrice}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Details</span>
                <ArrowRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductContent;
