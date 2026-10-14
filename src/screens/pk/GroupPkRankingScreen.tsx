import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';

interface RankUser {
  rank: number;
  name: string;
  avatar: string;
  score: number;
}

const DUMMY_GIFTERS: RankUser[] = [
  { rank: 1, name: 'Dragon_Lord', avatar: '🐲', score: 985200 },
  { rank: 2, name: 'Royal_King', avatar: '👑', score: 654000 },
  { rank: 3, name: 'Star_Gazer', avatar: '✨', score: 412300 },
  { rank: 4, name: 'Diamond_Prince', avatar: '💎', score: 298000 },
  { rank: 5, name: 'Thunder_God', avatar: '⚡', score: 184500 },
];

export const GroupPkRankingScreen = () => {
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState<'gifters' | 'receivers' | 'rooms'>('gifters');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PK Battle Rankings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tab, tab === 'gifters' && styles.tabActive]}
          onPress={() => setTab('gifters')}
        >
          <Text style={[styles.tabText, tab === 'gifters' && styles.tabTextActive]}>
            Top Gifters
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, tab === 'receivers' && styles.tabActive]}
          onPress={() => setTab('receivers')}
        >
          <Text style={[styles.tabText, tab === 'receivers' && styles.tabTextActive]}>
            Top Hosts
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, tab === 'rooms' && styles.tabActive]}
          onPress={() => setTab('rooms')}
        >
          <Text style={[styles.tabText, tab === 'rooms' && styles.tabTextActive]}>
            Top Rooms
          </Text>
        </TouchableOpacity>
      </View>

      {/* Leaderboard List */}
      <FlatList
        data={DUMMY_GIFTERS}
        keyExtractor={(item) => String(item.rank)}
        renderItem={({ item }) => {
          const isTop3 = item.rank <= 3;
          return (
            <View style={[styles.rankCard, isTop3 && styles.rankCardTop]}>
              <View style={styles.rankBadge}>
                <Text
                  style={[
                    styles.rankNumber,
                    item.rank === 1 && { color: Colors.gold },
                    item.rank === 2 && { color: '#E2E8F0' },
                    item.rank === 3 && { color: '#B45309' },
                  ]}
                >
                  #{item.rank}
                </Text>
              </View>

              <Text style={styles.avatarEmoji}>{item.avatar}</Text>

              <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userScore}>💎 {item.score.toLocaleString()}</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
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
    marginBottom: 20,
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
  tabsRow: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: Colors.primary,
  },
  tabText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFF',
  },
  rankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  rankCardTop: {
    borderColor: Colors.primaryLight,
  },
  rankBadge: {
    width: 36,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textSecondary,
  },
  avatarEmoji: {
    fontSize: 28,
    marginHorizontal: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  userScore: {
    color: Colors.gold,
    fontSize: 12,
    marginTop: 2,
  },
});
