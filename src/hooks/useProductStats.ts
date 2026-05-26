import { useMemo } from "react";
import { Product } from "@/types/product";
import { getDaysUntilExpiration } from "@/lib/products";

export const useProductStats = (products: Product[], userId: string | undefined) => {
  return useMemo(() => {
    const myProducts = products.filter(p => p.user_id === userId);
    const total = myProducts.length;
    const expired = myProducts.filter((p) => getDaysUntilExpiration(p.expirationDate) < 0).length;
    const warning = myProducts.filter((p) => {
      const d = getDaysUntilExpiration(p.expirationDate);
      return d >= 0 && d <= 7;
    }).length;
    return { total, expired, warning };
  }, [products, userId]);
};
