import React from "react";
import { Image, StyleSheet } from "react-native";

const HeaderView = () => {
    return (
      <Image source={require("../assets/nasdaqExploreLogo.png")} style={styles.logo} resizeMode="contain" />
    );
  };
  
  const styles = StyleSheet.create({
    logo: {
      width: 120,
      height: 40, 
      marginBottom: 20
    },
  });

  export { HeaderView }
  