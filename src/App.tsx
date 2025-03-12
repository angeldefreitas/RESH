import 'react-native-reanimated';
import React, { useState, useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { registerRootComponent } from 'expo';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import custom SplashScreen
import CustomSplashScreen from './components/SplashScreen';

// Import QuoteModal component
import QuoteModal from './components/QuoteModal';

// Import i18n configuration
import './utils/i18n';

// Import screens
import HomeScreen from './screens/HomeScreen/HomeScreen';
import AddHabitScreen from './screens/AddHabitScreen/AddHabitScreen';
import EditHabitScreen from './screens/EditHabitScreen/EditHabitScreen';
import SettingsScreen from './screens/SettingsScreen/SettingsScreen';
import ReorderHabitsScreen from './screens/HomeScreen/components/ReorderHabitsScreen';

// Import theme colors
import { colors, fontSize, spacing } from './styles/theme';

// Define types for navigator
type RootStackParamList = {
  Home: undefined;
  AddHabit: undefined;
  EditHabit: { habit: any, onUpdated?: () => void };
  Settings: undefined;
  ReorderHabits: { habits: any[], onSaveOrder: (habits: any[]) => Promise<boolean> };
};

const Stack = createStackNavigator<RootStackParamList>();

// Custom component for the app title
const AppTitle: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <View style={styles.titleTwoLinesContainer}>
      <Text style={styles.titleFirstLine}>{t('appName')}</Text>
      <Text style={styles.subtitleText}>{t('appFullName')}</Text>
    </View>
  );
};

// Custom component for the add habit title in two lines
const AddHabitTitle: React.FC = () => {
  const { t } = useTranslation();
  // Split the translation by the line break
  const titleParts = t('addHabit').split('\n');
  
  return (
    <View style={styles.titleTwoLinesContainer}>
      <Text style={styles.titleFirstLine}>{titleParts[0]}</Text>
      <Text style={styles.titleSecondLine}>{titleParts[1]}</Text>
    </View>
  );
};

// Keys for AsyncStorage
const QUOTE_TIME_KEY = 'RESH_LAST_QUOTE_TIME';
const QUOTES_ENABLED_KEY = 'resh_quotes_enabled';
const QUOTES_FREQUENCY_KEY = 'resh_quotes_frequency';

function App() {
  const { t } = useTranslation();
  const [appIsReady, setAppIsReady] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [quoteVisible, setQuoteVisible] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, data, etc.
        // For example:
        // await Font.loadAsync({
        //   // Load custom fonts here
        // });
        
        // Simulate loading time (optional)
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    // Check if we should show a quote
    const checkQuoteDisplay = async () => {
      if (!splashVisible && appIsReady) {
        try {
          // Check if quotes are enabled
          const quotesEnabled = await AsyncStorage.getItem(QUOTES_ENABLED_KEY);
          if (quotesEnabled === 'false') {
            return; // Quotes are disabled
          }
          
          // Get the frequency setting (in hours)
          const frequencyStr = await AsyncStorage.getItem(QUOTES_FREQUENCY_KEY);
          const frequency = frequencyStr ? parseInt(frequencyStr) : 3; // Default: 3 hours
          
          // If frequency is -1, quotes are set to "NEVER"
          if (frequency === -1) {
            return;
          }
          
          // If frequency is 0, show a quote every session
          if (frequency === 0) {
            setQuoteVisible(true);
            return;
          }
          
          // Check the last time a quote was shown
          const lastQuoteTime = await AsyncStorage.getItem(QUOTE_TIME_KEY);
          const currentTime = Date.now();
          
          // Convert frequency to milliseconds
          const frequencyMs = frequency * 60 * 60 * 1000;
          
          // If no previous time or it has been more than frequencyMs since last quote
          if (!lastQuoteTime || (currentTime - parseInt(lastQuoteTime)) > frequencyMs) {
            setQuoteVisible(true);
          }
        } catch (error) {
          console.error('Error checking quote time:', error);
        }
      }
    };
    
    checkQuoteDisplay();
  }, [splashVisible, appIsReady]);

  const onSplashFinish = useCallback(() => {
    setSplashVisible(false);
  }, []);

  const handleCloseQuote = () => {
    setQuoteVisible(false);
  };

  if (!appIsReady || splashVisible) {
    return <CustomSplashScreen onFinish={onSplashFinish} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={{
        dark: true,
        colors: {
          primary: colors.primary,
          background: colors.black,
          card: colors.black,
          text: colors.white,
          border: 'rgba(255, 255, 255, 0.2)',
          notification: colors.accent
        },
        fonts: {
          regular: {
            fontFamily: 'System',
            fontWeight: 'normal'
          },
          medium: {
            fontFamily: 'System',
            fontWeight: '500'
          },
          bold: {
            fontFamily: 'System',
            fontWeight: 'bold'
          },
          heavy: {
            fontFamily: 'System',
            fontWeight: '900'
          }
        }
      }}>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.black,
              shadowColor: colors.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
              elevation: 5,
              height: 100, // Slightly taller height to accommodate subtitle
              borderBottomColor: 'rgba(255, 255, 255, 0.1)',
              borderBottomWidth: 1,
            },
            headerTintColor: colors.white,
            headerTitleStyle: {
              fontWeight: 'bold',
              letterSpacing: 1,
              textTransform: 'uppercase',
            },
            headerTitleAlign: 'center', // Center all titles
            cardStyle: {
              backgroundColor: colors.black
            }
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ 
              headerTitle: () => <AppTitle />
            }} 
          />
          <Stack.Screen 
            name="AddHabit" 
            component={AddHabitScreen} 
            options={({ navigation }) => ({
              headerTitle: () => <AddHabitTitle />,
              headerTitleContainerStyle: {
                width: '100%',
                left: 0,
                right: 0,
              },
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ marginLeft: 10 }}
                >
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="chevron-back" size={24} color={colors.white} />
                    <Text style={{ color: colors.white, marginLeft: 5 }}>Home</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          />
          <Stack.Screen 
            name="EditHabit" 
            component={EditHabitScreen} 
            options={{ title: t('editHabit') }} 
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ title: t('settings') }} 
          />
          <Stack.Screen 
            name="ReorderHabits" 
            component={ReorderHabitsScreen} 
            options={{ 
              headerShown: false, // Ocultamos el header porque definimos uno personalizado
              presentation: 'modal',
              cardStyle: {
                backgroundColor: colors.black
              }
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
      
      {/* Quote Modal */}
      <QuoteModal visible={quoteVisible} onClose={handleCloseQuote} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleTwoLinesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  titleFirstLine: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: fontSize.lg * 1.2,
    width: '100%',
  },
  titleSecondLine: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
    lineHeight: fontSize.lg * 1.2,
    width: '100%',
  },
  subtitleText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: fontSize.xs,
    letterSpacing: 0.5,
    marginTop: spacing.xs / 2,
    textAlign: 'center',
  }
});

// Register the main component
registerRootComponent(App);

export default App;