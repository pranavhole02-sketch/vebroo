import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/colors';
import { NavKeys } from '../constants/NavKeys';
import { HomeScreen } from '../screens/home/HomeScreen';
import { GroupPkRankingScreen } from '../screens/pk/GroupPkRankingScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primaryLight,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tab.Screen
        name={NavKeys.HomeTab}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name={NavKeys.GroupPkRankingScreen}
        component={GroupPkRankingScreen}
        options={{
          tabBarLabel: 'Rankings',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🏆</Text>,
        }}
      />
      <Tab.Screen
        name={NavKeys.ChatScreen}
        component={ChatScreen}
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>💬</Text>,
        }}
      />
      <Tab.Screen
        name={NavKeys.MineTab}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Me',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>👤</Text>,
        }}
      />
    </Tab.Navigator>
  );
};
