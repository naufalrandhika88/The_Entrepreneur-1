import { SignUpState, SignUpAction } from '../types/signUpSceneType';

const initialRegisterState: SignUpState = {
  message: '',
};
export default function registerReducer(
  registerState: SignUpState = initialRegisterState,
  action: SignUpAction,
) {
  switch (action.type) {
    case 'REGISTER_REQUESTED': {
      return { ...registerState, message: '' };
    }
    case 'REGISTER_SUCCEED': {
      return {
        ...registerState,
        message: action.message,
      };
    }
    case 'REGISTER_FAILED': {
      return {
        ...registerState,
        message: action.message,
      };
    }
    case 'RESET_ERROR': {
      return {
        ...registerState,
        message: '',
      };
    }
    default: {
      return registerState;
    }
  }
}
