import {
  NavigationActions,
  NavigationParams,
  NavigationContainerComponent,
  StackActions,
} from 'react-navigation';

let _navigator: NavigationContainerComponent;

function setTopLevelNavigator(navigatorRef: NavigationContainerComponent) {
  _navigator = navigatorRef;
}

function navigate(routeName: string, params?: NavigationParams) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function navigateToStart() {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Login' })],
      key: 'Auth',
    }),
  );
}

function navigateToHome() {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'HomeBottomTab' })],
      key: 'Main',
    }),
  );
}

function navigateBack() {
  _navigator.dispatch(NavigationActions.back());
}

export function createNavigationHelper(
  _navigator: NavigationContainerComponent,
) {
  return {
    navigate: (routeName: string, params?: NavigationParams) => {
      _navigator.dispatch(
        NavigationActions.navigate({
          routeName,
          params,
        }),
      );
    },
  };
}

export default {
  navigate,
  navigateToStart,
  setTopLevelNavigator,
  navigateToHome,
  navigateBack,
};
