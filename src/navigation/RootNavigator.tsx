import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../providers/Auth';
import { RootStackParamList } from './types';
import { AppStack } from './AppStack';
import { OnboardingStack } from './OnboardingStack';
import ErrorScreen from '../screens/ErrorScreen';

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen
          name="App"
          component={AppStack}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="OnBoarding"
          component={OnboardingStack}
          options={{ headerShown: false }}
        />
      )}

      <Stack.Screen
        name="Error"
        component={ErrorScreen}
        options={{ title: 'Aduh!' }}
      />
    </Stack.Navigator>
  );
}
