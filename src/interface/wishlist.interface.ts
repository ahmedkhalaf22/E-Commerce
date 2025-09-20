export interface WishlistData {
  status: string;
  count: number;
  data: ProductProduct[];
}

export interface ProductProduct {
  subcategory: Brand[];
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  category: Brand;
  brand: Brand;
  ratingsAverage: number;
  id: string;
  price: number;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  category?: string;
}
