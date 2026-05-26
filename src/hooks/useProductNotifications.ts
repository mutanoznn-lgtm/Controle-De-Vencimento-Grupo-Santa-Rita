import { useEffect, useRef } from "react";
import { Product } from "@/types/product";
import { getDaysUntilExpiration, getStatusLabel } from "@/lib/products";
import { useToast } from "@/hooks/use-toast";

export const useProductNotifications = (products: Product[]) => {
  const { toast } = useToast();
  const notifiedRef = useRef(false);

  useEffect(() => {
    if (notifiedRef.current || products.length === 0) return;
    
    const urgent = products.filter((p) => {
      const d = getDaysUntilExpiration(p.expirationDate);
      return d >= 0 && d <= 3;
    });

    if (urgent.length > 0) {
      notifiedRef.current = true;
      toast({
        title: `⚠️ ${urgent.length} produto${urgent.length > 1 ? "s" : ""} vencendo em breve!`,
        description: urgent.slice(0, 3).map((p) => `${p.name} — ${getStatusLabel(getDaysUntilExpiration(p.expirationDate))}`).join("\n"),
        variant: "destructive",
        duration: 8000,
      });
    }
  }, [products, toast]);
};
