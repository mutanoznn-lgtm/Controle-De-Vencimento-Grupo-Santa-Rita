import { useState, useCallback, useEffect } from "react";
import { Product } from "@/types/product";
import { productService } from "@/services/productService";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useProducts = (user: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchProducts = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const data = await productService.fetchAll();
      setProducts(data);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar produtos",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [user, toast]);

  useEffect(() => {
    fetchProducts();

    const channel = supabase
      .channel("products_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "products" },
        () => {
          fetchProducts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchProducts]);

  const handleAdd = useCallback(
    async (name: string, manufactureDate: string, expirationDate: string) => {
      if (!user) return;
      try {
        await productService.add(user.id, name, manufactureDate, expirationDate);
        toast({ title: "Produto adicionado com sucesso!" });
      } catch (error: any) {
        toast({
          title: "Erro ao adicionar produto",
          description: error.message,
          variant: "destructive",
        });
      }
    },
    [user, toast]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await productService.delete(id);
        toast({ title: "Produto removido!" });
      } catch (error: any) {
        toast({
          title: "Erro ao remover produto",
          description: error.message,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const handleEdit = useCallback(
    async (id: string, name: string, manufactureDate: string, expirationDate: string) => {
      try {
        await productService.update(id, name, manufactureDate, expirationDate);
        toast({ title: "Produto atualizado!" });
      } catch (error: any) {
        toast({
          title: "Erro ao atualizar produto",
          description: error.message,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  return {
    products,
    isLoading,
    handleAdd,
    handleDelete,
    handleEdit,
    refresh: fetchProducts,
  };
};
