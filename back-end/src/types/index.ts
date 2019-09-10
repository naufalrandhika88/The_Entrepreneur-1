export type User = {
  _id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  membership: 'Basic' | 'Premium';
  avatar: string | null;
  gender: 'Male' | 'Female' | 'Other';
};

export type UserSignUp = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};
