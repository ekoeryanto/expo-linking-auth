import React from 'react';
import { AppStackParamList } from './types';
import { DeepLinkEnum, useDeepLinks } from '../providers/DeepLink';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<AppStackParamList>();
export function AppStack() {
  useDeepLinks([DeepLinkEnum.NAVIGATION]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
