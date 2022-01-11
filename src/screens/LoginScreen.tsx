/* eslint-disable react-native/no-inline-styles */
import { getAuth, signInAnonymously } from 'firebase/auth';
import React from 'react';
import { Button, View } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Login" onPress={() => signInAnonymously(getAuth())} />
    </View>
  );
}
