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
  images?: { src: string; alt: string; id: string }[];
  category: string;
}

export interface ShopItem extends DBShopItem {
  id: string;
}

export interface CartItem extends ShopItem {
  quantity: number;
  savedForLater?: boolean;
}

export interface DBCategory {
  image?: { src: string; id: string } | null;
  name: string;
  slug: string;
}
export interface Category extends DBCategory {
  id: string;
}

export interface FileWithId extends File {
  id: string;
}
export interface FileWithIdAndSrc extends FileWithId {
  src: string;
}

