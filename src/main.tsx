import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import useCachedResources from './hooks/useCachedResources';
import Provider from './providers';
import Navigation from './navigation';
import useColorScheme from './hooks/useColorScheme';

export default function Main() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={'red'} />
      </View>
    );
  }

  return (
    <Provider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
