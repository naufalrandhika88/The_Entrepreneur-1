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

export type ResponseObject = {
  success: boolean;
  data: any;
  message: string;
  token?: string;
};

export type DecodedObject = {
  id: string;
  iat: number;
};

export type ReqEditProfileObject = {
  first_name: string;
  last_name: string;
  isAvatarChange?: boolean;
  avatar: string | null;
  gender: 'Male' | 'Female' | 'Other';
};
