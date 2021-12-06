export interface User {
  displayName: string | null;
  email: string | null;
  emailVerified: boolean;
  creationTime: string | undefined;
  lastSignInTime: string | undefined;
  phoneNumber: string | null;
  photoUrl: string | null;
  uid: string;
}

export interface ShopItem {
  name: string;
  price: number;
  description?: string;
  previewImage?: string;
  images?: [{ src: string; alt: string }];
  category: string;
  id: string;
  i?: number;
}

export interface Category {
  name: string;
  slug: string;
}

export interface FileWithId extends File {
  id: string;
}
