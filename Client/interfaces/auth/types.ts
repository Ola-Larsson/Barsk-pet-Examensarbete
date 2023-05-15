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
};
