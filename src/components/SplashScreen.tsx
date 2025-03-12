import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { splashScreenStyles } from '../styles';

// Mantener visible el splash screen nativo hasta que estemos listos para ocultarlo
SplashScreen.preventAutoHideAsync();

const CustomSplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  useEffect(() => {
    // Ocultar inmediatamente el splash screen nativo y llamar a onFinish
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
      onFinish();
    };
    
    hideSplash();
  }, [onFinish]);

  return (
    <View style={splashScreenStyles.container}>
      <Image 
        source={require('../assets/images/splash.png')} 
        style={splashScreenStyles.logo}
        resizeMode="cover"
      />
    </View>
  );
};

export default CustomSplashScreen;