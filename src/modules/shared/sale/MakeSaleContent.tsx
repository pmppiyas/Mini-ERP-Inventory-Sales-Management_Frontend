import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Search,
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  Package,
  CheckCircle2,
  Loader2,
  X,
  Trophy,
} from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import { useGetProductsQuery } from '@/redux/features/product/product.api';
import { useAddSaleMutation } from '@/redux/features/sale/sale.api';
import type { IProduct } from '@/interfaces/product.interface';
import type { CartItem, ISaleItem } from '@/interfaces/sale.interface';

const ProductCard = ({
  product,
  added,
  onAdd,
}: {
  product: IProduct;
  added: boolean;
  onAdd: (p: IProduct) => void;
}) => {
  const outOfStock = product.stockQuantity === 0;

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none
        ${
          added
            ? 'border-primary/40 bg-primary/5'
            : outOfStock
              ? 'border-border bg-muted/20 opacity-50 cursor-not-allowed'
              : 'border-border bg-card hover:border-primary/30 hover:bg-primary/5 hover:shadow-sm'
        }`}
      onClick={() => !added && !outOfStock && onAdd(product)}
    >
      {/* Thumbnail */}
      {product.photoUrl ? (
        <img
          src={product.photoUrl}
          alt={product.name}
          className="w-11 h-11 rounded-lg object-cover shrink-0 border border-border"
        />
      ) : (
        <div className="w-11 h-11 rounded-lg bg-muted flex items-center justify-center shrink-0">
          <Package className="h-5 w-5 text-muted-foreground" />
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">
          {product.name}
        </p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          <span className="text-xs text-muted-foreground font-mono">
            {product.sku}
          </span>
          <Badge
            variant={outOfStock ? 'destructive' : 'secondary'}
            className="text-xs h-4 px-1.5"
          >
            {outOfStock ? 'Out of stock' : `${product.stockQuantity} in stock`}
          </Badge>
        </div>
      </div>

      {/* Price + Add */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-sm font-bold text-foreground">
          ৳{product.sellingPrice.toLocaleString()}
        </span>
        <div
          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors
            ${
              added
                ? 'bg-primary/10 text-primary'
                : outOfStock
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
        >
          {added ? (
            <CheckCircle2 className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
        </div>
      </div>
    </div>
  );
};

const MakeSaleContent = () => {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);

  const isSearching = searchTerm.length > 0;

  const { data: searchData, isFetching: isSearchFetching } =
    useGetProductsQuery({ searchTerm, limit: 12 }, { skip: !isSearching });

  const { data: topData, isFetching: isTopFetching } = useGetProductsQuery(
    { status: 'top_selling', limit: 8 },
    { skip: isSearching }
  );

  const products = isSearching
    ? (searchData?.products ?? [])
    : (topData?.products ?? []);
  const isFetching = isSearchFetching || isTopFetching;

  const [addSale, { isLoading: isSubmitting }] = useAddSaleMutation();

  useEffect(() => {
    const t = setTimeout(() => setSearchTerm(searchInput.trim()), 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const inCart = (id: string) => cart.some((c) => c.productId === id);

  const addToCart = (product: IProduct) => {
    if (inCart(product._id)) return;
    if (product.stockQuantity === 0) {
      toast.error('Out of stock.');
      return;
    }
    setCart((prev) => [
      ...prev,
      {
        productId: product._id,
        name: product.name,
        sku: product.sku,
        photoUrl: product.photoUrl,
        stockQuantity: product.stockQuantity,
        sellingPrice: product.sellingPrice,
        quantity: 1,
      },
    ]);
  };

  const removeFromCart = (id: string) =>
    setCart((prev) => prev.filter((c) => c.productId !== id));

  const updateQty = (id: string, qty: number) =>
    setCart((prev) =>
      prev.map((c) =>
        c.productId === id
          ? { ...c, quantity: Math.max(1, Math.min(qty, c.stockQuantity)) }
          : c
      )
    );

  const updatePrice = (id: string, price: number) =>
    setCart((prev) =>
      prev.map((c) =>
        c.productId === id ? { ...c, sellingPrice: Math.max(0, price) } : c
      )
    );

  const totalAmount = cart.reduce((s, c) => s + c.sellingPrice * c.quantity, 0);

  const handleSubmit = async () => {
    if (!cart.length) {
      toast.error('Cart is empty.');
      return;
    }
    const payload: ISaleItem[] = cart.map((c) => ({
      productId: c.productId,
      quantity: c.quantity,
      sellingPrice: c.sellingPrice,
    }));
    try {
      await addSale(payload).unwrap();
      toast.success(
        `${cart.length} item${cart.length > 1 ? 's' : ''} sold successfully!`
      );
      navigate('/admin/sales');
    } catch {
      toast.error('Failed to submit sale.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
      <div className="lg:col-span-3">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Search bar */}
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search by product name or SKU..."
                className="pl-9 pr-9"
              />
              {/* Clear */}
              {searchInput && (
                <button
                  onClick={() => setSearchInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
              {/* Spinner */}
              {isFetching && !searchInput && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 animate-spin text-muted-foreground" />
              )}
            </div>
          </div>

          {/* Section label */}
          <div className="px-4 py-2.5 border-b border-border bg-muted/30 flex items-center gap-2">
            {!isSearching ? (
              <>
                <Trophy className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-xs font-semibold text-amber-500">
                  Top Selling
                </span>
                {isFetching && (
                  <Loader2 className="h-3 w-3 animate-spin text-muted-foreground ml-auto" />
                )}
              </>
            ) : (
              <>
                <Search className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium text-muted-foreground">
                  Results for{' '}
                  <span className="text-primary font-semibold">
                    "{searchTerm}"
                  </span>
                </span>
                {isFetching && (
                  <Loader2 className="h-3 w-3 animate-spin text-muted-foreground ml-auto" />
                )}
              </>
            )}
          </div>

          {/* Product list */}
          <div className="p-3 space-y-2 max-h-130 overflow-y-auto">
            {/* Skeleton */}
            {isFetching && products.length === 0 && (
              <>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 rounded-xl bg-muted animate-pulse"
                  />
                ))}
              </>
            )}

            {/* Empty search */}
            {!isFetching && isSearching && products.length === 0 && (
              <div className="text-center py-10 text-muted-foreground">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">No products found for "{searchTerm}"</p>
              </div>
            )}

            {/* Products */}
            {products.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                added={inCart(product._id)}
                onAdd={addToCart}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ───── RIGHT: Cart ───── */}
      <div className="lg:col-span-2">
        <div className="rounded-xl border border-border bg-card overflow-hidden sticky top-4">
          {/* Cart header */}
          <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 text-emerald-500" />
              <span className="text-sm font-semibold text-foreground">
                Cart
              </span>
            </div>
            {cart.length > 0 && (
              <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs">
                {cart.length} item{cart.length > 1 ? 's' : ''}
              </Badge>
            )}
          </div>

          {/* Empty */}
          {cart.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mb-3 opacity-15" />
              <p className="text-sm font-medium">Cart is empty</p>
              <p className="text-xs mt-1 opacity-70">
                Click a product to add it
              </p>
            </div>
          )}

          {/* Cart items */}
          {cart.length > 0 && (
            <div className="divide-y divide-border max-h-100 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.productId} className="p-3 space-y-2.5">
                  {/* Product row */}
                  <div className="flex items-center gap-2">
                    {item.photoUrl ? (
                      <img
                        src={item.photoUrl}
                        alt={item.name}
                        className="w-9 h-9 rounded-lg object-cover shrink-0 border border-border"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <Package className="h-4 w-4 text-muted-foreground" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-foreground truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {item.sku}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="w-6 h-6 rounded-md flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors shrink-0"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Qty + Price */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Quantity</p>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateQty(item.productId, item.quantity - 1)
                          }
                          className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <Input
                          type="number"
                          value={item.quantity}
                          min={1}
                          max={item.stockQuantity}
                          onChange={(e) =>
                            updateQty(item.productId, Number(e.target.value))
                          }
                          className="h-7 text-center text-xs px-0 w-10"
                        />
                        <button
                          onClick={() =>
                            updateQty(item.productId, item.quantity + 1)
                          }
                          className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors shrink-0"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-muted-foreground">Price (৳)</p>
                      <Input
                        type="number"
                        value={item.sellingPrice}
                        min={0}
                        onChange={(e) =>
                          updatePrice(item.productId, Number(e.target.value))
                        }
                        className="h-7 text-xs"
                      />
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-center justify-between bg-muted/40 rounded-lg px-2.5 py-1.5">
                    <span className="text-xs text-muted-foreground">
                      Subtotal
                    </span>
                    <span className="text-xs font-bold text-foreground">
                      ৳{(item.sellingPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer: total + actions */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-border space-y-3 bg-muted/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  Total
                </span>
                <span className="text-xl font-bold text-emerald-600">
                  ৳{totalAmount.toLocaleString()}
                </span>
              </div>
              <Button
                className="w-full"
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />{' '}
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" /> Confirm Sale (
                    {cart.length})
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full h-8 text-xs"
                onClick={() => setCart([])}
                disabled={isSubmitting}
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MakeSaleContent;
