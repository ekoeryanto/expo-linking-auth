/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import {
  createNavigationContainerRef,
  getActionFromState,
  getPathFromState,
  getStateFromPath,
  LinkingOptions,
  NavigationAction,
  NavigationState,
  PartialState,
} from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from './types';

export const navigationRef = createNavigationContainerRef();

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      OnBoarding: {
        path: 'session',
        screens: {
          Login: '',
        },
      },
      App: {
        path: '',
        screens: {
          Home: '',
          Profile: 'profile',
        },
      },
      Error: '*',
    },
  },
};

export const getPathFromURL = (url: string) => {
  const { path } = Linking.parse(url);

  if (!path) {
    return '/';
  }

  // if (path.includes('expo-auth-session')) {
  //   return '/session';
  // }

  return url.slice(url.indexOf(path) - 1);
};

export const checkDeepLinkResult = (url: string) => {
  const extractedUrl = getPathFromURL(url);

  const currentState = navigationRef.current?.getRootState() as NavigationState;
  const currentPath = getPathFromState(currentState);

  const linkState = extractedUrl.includes('expo-auth-session')
    ? currentState
    : getStateFromPath(extractedUrl, linking.config);

  const linkPath = getPathFromState(
    linkState! || navigationRef.current?.getState()
  );

  const action = getActionFromState(
    linkState as PartialState<NavigationState>
  ) as NavigationAction;

  return {
    action,
    linkPath,
    didDeepLinkLand: currentPath === linkPath,
  };
};
