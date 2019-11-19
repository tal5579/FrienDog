import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../../assets/logo.jpg')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 420,
    height: 228,
    marginBottom: 1,
  },
});

export default Logo;