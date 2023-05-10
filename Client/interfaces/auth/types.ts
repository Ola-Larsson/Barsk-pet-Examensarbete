export type User = {
  id: number;
  username: string;
  email: string;
};

export type AuthUser = {
  user: User;
  token: string;
  expires: string;
};
