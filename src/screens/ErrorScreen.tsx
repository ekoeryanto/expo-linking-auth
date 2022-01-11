/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Button, Text, View } from 'react-native';

export default function ErrorScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Error</Text>
      <Button title="Logout" onPress={() => console.log('login')} />
    </View>
  );
}
