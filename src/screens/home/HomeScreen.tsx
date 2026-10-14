import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { NavKeys } from '../../constants/NavKeys';
import { roomService } from '../../api/services/roomService';
import { LiveRoom } from '../../types';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [activeTab, setActiveTab] = useState<'popular' | 'follow' | 'pk'>('popular');
  const [rooms, setRooms] = useState<LiveRoom[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRooms = async () => {
    try {
      const data = await roomService.getRooms().catch(() => [
        {
          id: 'room_1',
          title: '🔥 DJ Night Party & Fun',
          hostId: 'h1',
          hostName: 'DJ_Alex',
          zegoRoomId: 'room_1',
          onlineCount: 1420,
          roomType: 'audio' as const,
          isLive: true,
        },
        {
          id: 'room_2',
          title: 'Singing & Acoustic Chill',
          hostId: 'h2',
          hostName: 'Aria_Sing',
          zegoRoomId: 'room_2',
          onlineCount: 856,
          roomType: 'audio' as const,
          isLive: true,
        },
        {
          id: 'room_3',
          title: 'Group PK Battle LIVE! 🥊',
          hostId: 'h3',
          hostName: 'King_Raju',
          zegoRoomId: 'room_3',
          onlineCount: 2310,
          roomType: 'video' as const,
          isLive: true,
        },
        {
          id: 'room_4',
          title: 'Late Night Talks & Advice',
          hostId: 'h4',
          hostName: 'Luna_Star',
          zegoRoomId: 'room_4',
          onlineCount: 540,
          roomType: 'audio' as const,
          isLive: true,
        },
      ]);
      setRooms(data);
    } catch (e) {
      console.warn('Failed to load rooms');
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [activeTab]);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchRooms();
    setRefreshing(false);
  };

  const renderRoomItem = ({ item }: { item: LiveRoom }) => (
    <TouchableOpacity
      style={styles.roomCard}
      onPress={() =>
        navigation.navigate(NavKeys.AudiencePage, {
          roomId: item.zegoRoomId || item.id,
          roomTitle: item.title,
          hostName: item.hostName,
        })
      }
    >
      <View style={styles.roomCover}>
        <Text style={styles.roomAvatarEmoji}>🎙️</Text>
        <View style={styles.liveBadge}>
          <Text style={styles.liveText}>● LIVE</Text>
        </View>
        <View style={styles.viewerBadge}>
          <Text style={styles.viewerText}>👁️ {item.onlineCount}</Text>
        </View>
      </View>
      <View style={styles.roomInfo}>
        <Text style={styles.roomTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.hostName}>{item.hostName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>VoBee</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate(NavKeys.GroupPkRankingScreen)}
          >
            <Text style={styles.headerIconText}>🏆</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            onPress={() => navigation.navigate(NavKeys.Wallet)}
          >
            <Text style={styles.headerIconText}>💎</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'popular' && styles.tabActive]}
          onPress={() => setActiveTab('popular')}
        >
          <Text style={[styles.tabText, activeTab === 'popular' && styles.tabTextActive]}>
            Popular
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'follow' && styles.tabActive]}
          onPress={() => setActiveTab('follow')}
        >
          <Text style={[styles.tabText, activeTab === 'follow' && styles.tabTextActive]}>
            Following
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'pk' && styles.tabActive]}
          onPress={() => navigation.navigate(NavKeys.GroupPkRankingScreen)}
        >
          <Text style={styles.tabText}>PK Rankings</Text>
        </TouchableOpacity>
      </View>

      {/* Live Rooms Grid */}
      <FlatList
        data={rooms}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderRoomItem}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFF" />
        }
      />

      {/* Floating Create Room Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate(NavKeys.CreateRoomScreen)}
      >
        <Text style={styles.floatingButtonIcon}>🎙️</Text>
        <Text style={styles.floatingButtonText}>Go Live</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 48,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    backgroundColor: Colors.surface,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  headerIconText: {
    fontSize: 16,
  },
  tabsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    marginRight: 20,
    paddingBottom: 6,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primaryLight,
  },
  tabText: {
    color: Colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  tabTextActive: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 14,
    paddingBottom: 80,
  },
  roomCard: {
    flex: 1,
    margin: 6,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
  },
  roomCover: {
    height: 140,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  roomAvatarEmoji: {
    fontSize: 48,
  },
  liveBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: Colors.error,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  liveText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  viewerBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  viewerText: {
    color: '#FFF',
    fontSize: 10,
  },
  roomInfo: {
    padding: 10,
  },
  roomTitle: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: 'bold',
  },
  hostName: {
    color: Colors.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 28,
    elevation: 8,
  },
  floatingButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  floatingButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
