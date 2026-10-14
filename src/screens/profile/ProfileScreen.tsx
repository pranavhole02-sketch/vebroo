import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Colors } from '../../theme/colors';
import { NavKeys } from '../../constants/NavKeys';
import { logout } from '../../store/slices/authSlice';

export const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const balance = useSelector((state: RootState) => state.wallet.balance);

  const handleLogout = () => {
    dispatch(logout());
    navigation.replace(NavKeys.LoginScreen);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarEmoji}>😎</Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'VoBee Star'}</Text>
        <Text style={styles.userId}>ID: {user?.id || '88392104'}</Text>

        {/* Level Badges */}
        <View style={styles.badgeRow}>
          <View style={styles.badgeLevel}>
            <Text style={styles.badgeText}>Lv.{user?.level || 1}</Text>
          </View>
          <View style={styles.badgeSvip}>
            <Text style={styles.badgeText}>👑 VIP 1</Text>
          </View>
        </View>
      </View>

      {/* Stats Counter */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>142</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>1.8K</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statValue}>💎 {balance.diamonds}</Text>
          <Text style={styles.statLabel}>Diamonds</Text>
        </View>
      </View>

      {/* Quick Menu Options */}
      <View style={styles.menuSection}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate(NavKeys.Wallet)}
        >
          <Text style={styles.menuIcon}>💎</Text>
          <Text style={styles.menuTitle}>My Wallet & Recharge</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate(NavKeys.LevelScreen)}
        >
          <Text style={styles.menuIcon}>⭐</Text>
          <Text style={styles.menuTitle}>Level & VIP Privileges</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate(NavKeys.GroupPkRankingScreen)}
        >
          <Text style={styles.menuIcon}>🏆</Text>
          <Text style={styles.menuTitle}>PK Hall of Fame</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate(NavKeys.HelpFeedbackScreen)}
        >
          <Text style={styles.menuIcon}>🎧</Text>
          <Text style={styles.menuTitle}>Help & Customer Support</Text>
          <Text style={styles.menuArrow}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 48,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.primaryLight,
    marginBottom: 12,
  },
  avatarEmoji: {
    fontSize: 40,
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  userId: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  badgeLevel: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 6,
  },
  badgeSvip: {
    backgroundColor: '#D97706',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    borderRadius: 16,
    paddingVertical: 14,
    justifyContent: 'space-around',
    borderColor: Colors.border,
    borderWidth: 1,
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  statLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
    height: '70%',
    alignSelf: 'center',
  },
  menuSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 14,
  },
  menuTitle: {
    flex: 1,
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
  menuArrow: {
    color: Colors.textSecondary,
    fontSize: 20,
  },
  logoutItem: {
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 16,
  },
  logoutText: {
    color: Colors.error,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
