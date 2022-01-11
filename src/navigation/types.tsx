/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  App: NavigatorScreenParams<AppStackParamList> | undefined;
  OnBoarding: NavigatorScreenParams<OnboardingStackParamList> | undefined;
  Error: undefined;
};

export type AppStackParamList = {
  Home: undefined;
  Profile: undefined;
};

export type OnboardingStackParamList = {
  Login: undefined;
};

export type AppStackScreenProps<Screen extends keyof AppStackParamList> =
  NativeStackScreenProps<AppStackParamList, Screen>;

export type OnboardingStackScreenProps<
  Screen extends keyof OnboardingStackParamList
> = NativeStackScreenProps<OnboardingStackParamList, Screen>;

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
