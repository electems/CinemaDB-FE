export type AuthUser = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  role: 'ADMIN' | 'USER';
  type: string;
};

export type UserResponse = {
  token: string;
  user: AuthUser;
};
