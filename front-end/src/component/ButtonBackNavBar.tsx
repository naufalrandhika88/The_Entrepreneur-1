import { headerBarColor } from '../constants/color';

export function navigationOption(title: string) {
  return {
    title: title,
    headerStyle: {
      backgroundColor: headerBarColor,
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
}
