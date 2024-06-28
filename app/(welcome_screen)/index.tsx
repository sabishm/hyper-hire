import { Tabs } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Screen } from 'expo-router/build/views/Screen';
import { Button, Dimensions, StyleSheet, View, Image, Text, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const videoSource = require('../../assets/videos/welcome_video.mp4');

export default function WelcomeScreen() {
  const colorScheme = useColorScheme();
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  useEffect(() => {
    if (video.current) {
      video.current.playAsync();
    }
  }, []);

  return (
    <View style={{ height: Dimensions.get('window').height, width: Dimensions.get('window').width, position: 'absolute' }}>
      <Video
        ref={video}
        style={styles.video}
        source={videoSource}
        useNativeControls
        resizeMode={ResizeMode.COVER}
        isLooping
        onPlaybackStatusUpdate={status => setStatus(status)}
      />
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
        <LinearGradient
          colors={['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']}
        >
          <View style={{ marginTop: 48, width: Dimensions.get('window').width, paddingLeft: 15, paddingBottom: 64 }}>
            <Text style={{ fontSize: 52, fontWeight: 'bold', color: 'white' }}>Soo</Text>
            <Text style={{ fontSize: 52, fontWeight: 'bold', color: 'white' }}>and Carrots</Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)']}
        >
          <View style={{ width: Dimensions.get("window").width, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 64 }}>
            <View>
              <TouchableHighlight
                style={{
                  height: 52,
                  maxWidth: 300,
                  borderRadius: 52
                }}
                onPress={() => {
                  router.push("signup_screen");
                 }}
                activeOpacity={0.7} // Controls the opacity when pressed
              >
                <View style={{
                  height: 52,
                  width: 300,
                  display: 'flex',
                  backgroundColor: '#253BFF',
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderRadius: 52
                }}>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{ marginLeft: 16 }} source={require('../../assets/icons/log-in.png')} />
                    <Text style={{ color: "white", marginLeft: 16 }}>Sign up for free</Text>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 4 }}>
                    <Image source={require('../../assets/icons/Button.png')} />
                  </View>
                </View>
              </TouchableHighlight>
            </View>

            <View style={{ height: 16 }} />

            <TouchableHighlight
              style={{
                height: 52,
                maxWidth: 300, borderRadius: 52
              }}
              onPress={() => { }}
              activeOpacity={0.7} // Controls the opacity when pressed
            >
              <View style={{
                height: 52,
                width: 300,
                display: 'flex',
                backgroundColor: '#1D2939',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderRadius: 52
              }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ marginLeft: 16 }} source={require('../../assets/icons/mail.png')} />
                  <Text style={{ color: "white", marginLeft: 16 }}>Sign up for Email</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'flex-end', marginRight: 4 }}>
                  <Image source={require('../../assets/icons/ButtonBlack.png')} />
                </View>
              </View>
            </TouchableHighlight>
            <View style={{ height: 32 }} />

          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    position: 'absolute',
    top: 0, right: 0, left: 0, bottom: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  controlsContainer: {
    padding: 10,
  },
});
