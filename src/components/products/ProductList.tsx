import { AnimatePresence } from "framer-motion";
import { Product } from "@/types/product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  onDelete: (id: string) => void;
  onEdit: (id: string, name: string, manufactureDate: string, expirationDate: string) => void;
  isAdmin: boolean;
  currentUserId: string | undefined;
  showAllProducts: boolean;
}

export const ProductList = ({
  products,
  onDelete,
  onEdit,
  isAdmin,
  currentUserId,
  showAllProducts,
}: ProductListProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <AnimatePresence mode="popLayout">
        {products.map((product, index) => (
          <div key={product.id} className="relative group min-w-0">
            <ProductCard 
              product={product} 
              onDelete={onDelete} 
              onEdit={onEdit} 
              index={index}
              readOnly={!isAdmin && product.user_id !== currentUserId}
            />
            {showAllProducts && (
              <span className="pointer-events-none absolute bottom-3 right-3 max-w-[45%] truncate rounded-full bg-background/80 backdrop-blur-sm border border-border px-2 py-0.5 text-[10px] font-bold text-muted-foreground shadow-sm">
                {product.username}
              </span>
            )}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

