import WelcomeScreen from '@/app/(welcome_screen)';
import React from 'react';
import { View } from 'react-native';

export default {
  title: 'WelcomeScreen',
  component: WelcomeScreen,
};

export const Default = () => (
  <View style={{ flex: 1 }}>
    <WelcomeScreen />
  </View>
);