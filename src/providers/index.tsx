import React from 'react';
import { PropsWithChildren } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './Auth';
import { DeepLinkProvider } from './DeepLink';

export default function Provider({ children }: PropsWithChildren<unknown>) {
  return (
    <DeepLinkProvider>
      <AuthProvider>
        <SafeAreaProvider>{children}</SafeAreaProvider>
      </AuthProvider>
    </DeepLinkProvider>
  );
}
