export type User = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  membership: 'Basic' | 'Premium';
  avatar: string | null;
  gender: 'Male' | 'Female' | 'Other';
};

export type UserSignUp = {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type UserSignIn = {
  email: string;
  password: string;
};
