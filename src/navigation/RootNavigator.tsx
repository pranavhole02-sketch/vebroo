import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavKeys } from '../constants/NavKeys';
import { Colors } from '../theme/colors';

// Implemented Screens
import { LoginScreen } from '../screens/auth/LoginScreen';
import { BottomTabs } from './BottomTabs';
import { HostPage } from '../screens/live/HostPage';
import { AudiencePage } from '../screens/live/AudiencePage';
import { CreateRoomScreen } from '../screens/live/CreateRoomScreen';
import { WalletScreen } from '../screens/wallet/WalletScreen';
import { LevelScreen } from '../screens/profile/LevelScreen';
import { GroupPkRankingScreen } from '../screens/pk/GroupPkRankingScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';

const Stack = createStackNavigator();

/**
 * Placeholder component for secondary screens to ensure 100% of the 92 routes
 * are registered and navigable without runtime crashes.
 */
const GenericPlaceholderScreen = ({ route, navigation }: any) => (
  <View style={styles.placeholderContainer}>
    <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
      <Text style={styles.backText}>← Back</Text>
    </TouchableOpacity>
    <Text style={styles.placeholderTitle}>{route.name}</Text>
    <Text style={styles.placeholderSubtitle}>
      Screen scaffolded from recovered bundle. Ready for your custom implementation.
    </Text>
  </View>
);

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={NavKeys.LoginScreen}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: Colors.background },
      }}
    >
      {/* Primary Implemented Screens */}
      <Stack.Screen name={NavKeys.LoginScreen} component={LoginScreen} />
      <Stack.Screen name={NavKeys.BottomTabs} component={BottomTabs} />
      <Stack.Screen name={NavKeys.HostPage} component={HostPage} />
      <Stack.Screen name={NavKeys.AudiencePage} component={AudiencePage} />
      <Stack.Screen name={NavKeys.CreateRoomScreen} component={CreateRoomScreen} />
      <Stack.Screen name={NavKeys.Wallet} component={WalletScreen} />
      <Stack.Screen name={NavKeys.LevelScreen} component={LevelScreen} />
      <Stack.Screen name={NavKeys.GroupPkRankingScreen} component={GroupPkRankingScreen} />
      <Stack.Screen name={NavKeys.ChatScreen} component={ChatScreen} />

      {/* Register remaining recovered NavKeys routes */}
      {Object.values(NavKeys).map((screenKey) => {
        // Skip already registered screens
        if (
          [
            NavKeys.LoginScreen,
            NavKeys.BottomTabs,
            NavKeys.HostPage,
            NavKeys.AudiencePage,
            NavKeys.CreateRoomScreen,
            NavKeys.Wallet,
            NavKeys.LevelScreen,
            NavKeys.GroupPkRankingScreen,
            NavKeys.ChatScreen,
            NavKeys.HomeTab,
            NavKeys.MineTab,
          ].includes(screenKey as any)
        ) {
          return null;
        }

        return (
          <Stack.Screen
            key={screenKey}
            name={screenKey}
            component={GenericPlaceholderScreen}
          />
        );
      })}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 8,
  },
  backText: {
    color: '#FFF',
    fontSize: 16,
  },
  placeholderTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  placeholderSubtitle: {
    color: Colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 280,
  },
});
