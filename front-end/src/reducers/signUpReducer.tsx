import { SignUpState, SignUpAction } from '../types/signUpSceneType';

const initialRegisterState: SignUpState = {
  isProcessing: false,
  errorMessage: '',
};
export default function registerReducer(
  registerState: SignUpState = initialRegisterState,
  action: SignUpAction,
) {
  switch (action.type) {
    case 'REGISTER_REQUESTED': {
      return { ...registerState, isProcessing: true, errorMessage: '' };
    }
    case 'REGISTER_SUCCEED': {
      return {
        ...registerState,
        isProcessing: false,
        errorMessage: '',
      };
    }
    case 'REGISTER_FAILED': {
      return {
        ...registerState,
        isProcessing: false,
        errorMessage: action.message,
      };
    }
    case 'RESET_ERROR': {
      return {
        ...registerState,
        isProcessing: false,
        errorMessage: '',
      };
    }
    default: {
      return registerState;
    }
  }
}
