export interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  creationTime: string | undefined;
  lastSignInTime: string | undefined;
  phoneNumber: string | null;
  photoUrl: string | null;
  uid: string;
  isAdmin: boolean;
}

export interface DBShopItem {
  name: string;
  price: number;
  description?: string;
  previewImage?: string;
  images?: [{ src: string; alt: string }];
  category: string;
}

export interface ShopItem extends DBShopItem {
  id: string;
  i?: number;
}

export interface DBCategory {
  src?: string;
  name: string;
  slug: string;
}
export interface Category extends DBCategory {
  id: string;
}

export interface FileWithId extends File {
  id: string;
}
