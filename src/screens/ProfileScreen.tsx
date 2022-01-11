/* eslint-disable react-native/no-inline-styles */
import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { Button, View } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Logout" onPress={() => signOut(getAuth())} />
    </View>
  );
}
