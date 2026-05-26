import { supabase } from "@/integrations/supabase/client";
import { Product, toProduct } from "@/types/product";

export const productService = {
  async fetchAll() {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        profiles:user_id (
          username
        )
      `)
      .order("expiration_date", { ascending: true });

    if (error) throw error;
    return (data ?? []).map(toProduct);
  },

  async add(userId: string, name: string, manufactureDate: string, expirationDate: string) {
    const { data, error } = await supabase.from("products").insert({
      user_id: userId,
      name,
      manufacture_date: manufactureDate,
      expiration_date: expirationDate,
    }).select().single();

    if (error) throw error;
    return toProduct(data);
  },

  async delete(id: string) {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
  },

  async update(id: string, name: string, manufactureDate: string, expirationDate: string) {
    const { data, error } = await supabase
      .from("products")
      .update({
        name,
        manufacture_date: manufactureDate,
        expiration_date: expirationDate,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return toProduct(data);
  },
};
