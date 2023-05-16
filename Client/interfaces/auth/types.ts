export type User = {
  id: number;
  username: string;
  email: string;
};

export type AuthUser = {
  user: User;
  token: string;
  expiration: string;
};

export type Drink = {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  ingredients: { name: string; amount: string }[];
  tags: { name: string }[];
  instructions: string;
  created: string;
  user: string;
  rating: number;
  ratingCount: number;
  isFavorite: boolean;
  currentUserRating: number;
  isOwned: boolean;
};

export interface DrinkDto {
  id?: string;
  name: string;
  description: string;
  imageUrl?: string | null;
  instructions: string;
  ingredients: IngredientDto[];
  tags: TagDto[];
  user: string;
  created?: string;
  rating?: number;
  ratingCount?: number;
  isFavorite?: boolean;
  currentUserRating?: number | null;
  isOwned?: boolean;
}

export interface TagDto {
  name: string;
}

export interface IngredientDto {
  name: string;
  amount: string;
}

export interface CreateDrinkRequest {
  name: string;
  description: string;
  image: string | null | undefined;
  instructions: string;
  ingredients: IngredientDto[];
  tags: TagDto[];
}
