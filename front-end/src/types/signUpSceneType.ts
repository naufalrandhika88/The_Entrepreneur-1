import { NavigationContainerComponent } from 'react-navigation';

export type SignUpState = {
  isProcessing: boolean;
  errorMessage: string;
};

export type SignUpAction =
  | {
      type: 'REGISTER_REQUESTED';
      email: string;
      password: string;
      _navigator: NavigationContainerComponent;
    }
  | { type: 'REGISTER_FAILED'; message: string }
  | { type: 'REGISTER_SUCCEED' }
  | { type: 'RESET_ERROR' };
