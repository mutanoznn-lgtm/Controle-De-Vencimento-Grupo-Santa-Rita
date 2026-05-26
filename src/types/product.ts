export interface DbProduct {
  id: string;
  name: string;
  manufacture_date: string;
  expiration_date: string;
  user_id: string;
  profiles?: {
    username: string;
  };
}

export interface Product {
  id: string;
  name: string;
  manufactureDate: string;
  expirationDate: string;
  user_id: string;
  username?: string;
}

export const toProduct = (p: any): Product => ({
  id: p.id,
  name: p.name,
  manufactureDate: p.manufacture_date,
  expirationDate: p.expiration_date,
  user_id: p.user_id,
  username: p.profiles?.username || "Desconhecido",
});
