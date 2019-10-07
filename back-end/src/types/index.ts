export type User = {
  _id: number;
  email: string;
  first_name: string;
  last_name: string;
  membership: 'Basic' | 'Premium';
  avatar: string | null;
  gender: 'Male' | 'Female' | 'Other';
};

export type UserSignUp = {
  email: string;
  user_role: Role;
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
  id: number;
  iat: number;
};

export type Role = 'Admin' | 'User';

export type ReqEditProfileObject = {
  first_name: string;
  last_name: string;
  isAvatarChange?: boolean;
  image: string | null;
  membership: 'Basic' | 'Premium';
  gender: 'Male' | 'Female' | 'Other';
};

export type CreateEvent = {
  event_name: string;
  category: 'Workshop' | 'Seminar';
  event_date: string;
  place: string;
  price: number;
  description: string;
  available_seat: number;
  image?: string | null;
};

export type ReqEditEventObject = {
  event_name: string;
  category: 'Workshop' | 'Seminar';
  event_date: string;
  place: string;
  price: number;
  description: string;
  available_seat: number;
  isImageChange?: boolean;
  image: string | null;
};

export type Event = {
  id: number;
  event_name: string;
  category: 'Workshop' | 'Seminar';
  place: string;
  price: number;
  description: string;
  available_seat: number;
  image?: string | null;
};

export type CreateForum = {
  id_user: number;
  forum_name: string;
  category: 'Umum' | 'Jual' | 'Beli';
  description: string;
  image?: string[] | null;
};

export type BuyTicket = {
  id_event: number;
  id_user: number;
  type: 'Regular';
  qty: number;
  total: number;
};
