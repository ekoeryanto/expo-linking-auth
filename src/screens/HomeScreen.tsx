/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Button, View } from 'react-native';
import { AppStackScreenProps } from '../navigation/types';

export default function HomeScreen({
  navigation,
}: AppStackScreenProps<'Home'>) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}
