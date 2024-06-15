import React, { useEffect, useState } from 'react';
import { Animated, View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const [opacity] = useState(new Animated.Value(0)); // Correctly destructuring the useState hook

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.reset({
        index: 0,
        //@ts-ignore
        routes: [{ name: 'Home' }],
      });
    }, 3000);

    // Animate opacity to 1 over 1 second
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true, // Improve performance (optional)
    }).start();

    return () => {
      clearTimeout(timeout);
    };
  }, [navigation, opacity]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/nasdaqLogo.png')}
        style={[styles.image, { opacity }]} // Apply animated opacity
        resizeMode='contain'
      />
      <Animated.Text style={[styles.text, { opacity }]}>
       Developed by Adham Mahmoud
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    position: 'absolute',
    bottom: 30,
    fontSize: 18,
    color: 'black',
  },
});

export { SplashScreen };
