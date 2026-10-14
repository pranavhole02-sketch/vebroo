import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Colors } from '../../theme/colors';

export const LevelScreen = () => {
  const navigation = useNavigation<any>();
  const user = useSelector((state: RootState) => state.auth.user);
  const currentLevel = user?.level || 1;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Level & Privileges</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Level Banner */}
      <View style={styles.banner}>
        <Text style={styles.levelBadgeText}>Level {currentLevel}</Text>
        <Text style={styles.expText}>EXP: 1,450 / 3,000</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: '48%' }]} />
        </View>
        <Text style={styles.upgradeHint}>Send gifts and stay in live rooms to level up faster!</Text>
      </View>

      {/* Privileges Grid */}
      <Text style={styles.sectionTitle}>Level Privileges</Text>
      <View style={styles.privilegeRow}>
        <View style={styles.privilegeCard}>
          <Text style={styles.privilegeIcon}>✨</Text>
          <Text style={styles.privilegeTitle}>Entrance Effect</Text>
          <Text style={styles.privilegeDesc}>Cool entry animation</Text>
        </View>
        <View style={styles.privilegeCard}>
          <Text style={styles.privilegeIcon}>🏷️</Text>
          <Text style={styles.privilegeTitle}>Exclusive Badge</Text>
          <Text style={styles.privilegeDesc}>Custom chat badge</Text>
        </View>
      </View>

      <View style={styles.privilegeRow}>
        <View style={styles.privilegeCard}>
          <Text style={styles.privilegeIcon}>🚀</Text>
          <Text style={styles.privilegeTitle}>Rocket Gifts</Text>
          <Text style={styles.privilegeDesc}>Unlock VIP gifts</Text>
        </View>
        <View style={styles.privilegeCard}>
          <Text style={styles.privilegeIcon}>👑</Text>
          <Text style={styles.privilegeTitle}>Room Mic Priority</Text>
          <Text style={styles.privilegeDesc}>Reserved seats</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 48,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    color: '#FFF',
    fontSize: 24,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  banner: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 28,
  },
  levelBadgeText: {
    color: Colors.gold,
    fontSize: 28,
    fontWeight: 'bold',
  },
  expText: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 6,
  },
  progressBarBg: {
    width: '100%',
    height: 10,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 5,
    marginVertical: 14,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  upgradeHint: {
    color: Colors.accent,
    fontSize: 12,
    textAlign: 'center',
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  privilegeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  privilegeCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  privilegeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  privilegeTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  privilegeDesc: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
    textAlign: 'center',
  },
});
