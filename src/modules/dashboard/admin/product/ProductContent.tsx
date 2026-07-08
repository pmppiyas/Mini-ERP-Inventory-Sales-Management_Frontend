import type { IProduct } from '@/interfaces/product.interface';

const ProductContent = ({ products }: { products: IProduct[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5">
      {products.map((product) => (
        <div key={product._id} className="rounded-lg border p-4 shadow-sm">
          <img
            src={product.productImage}
            alt={product.productName}
            className="h-48 w-full rounded-md object-cover"
          />

          <div className="mt-4 space-y-2">
            <h2 className="text-lg font-semibold">{product.productName}</h2>

            <p>
              <span className="font-medium">SKU:</span> {product.sku}
            </p>

            <p>
              <span className="font-medium">Category:</span> {product.category}
            </p>

            <p>
              <span className="font-medium">Purchase Price:</span> $
              {product.purchasePrice}
            </p>

            <p>
              <span className="font-medium">Selling Price:</span> $
              {product.sellingPrice}
            </p>

            <p>
              <span className="font-medium">Stock:</span>{' '}
              {product.stockQuantity}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductContent;
