import { NavigationContainerComponent } from 'react-navigation';

export type SignUpState = {
  message: string;
};

export type SignUpAction =
  | {
      type: 'REGISTER_REQUESTED';
      email: string;
      password: string;
      _navigator: NavigationContainerComponent;
    }
  | { type: 'REGISTER_FAILED'; message: string }
  | { type: 'REGISTER_SUCCEED'; message: string }
  | { type: 'RESET_ERROR' };
