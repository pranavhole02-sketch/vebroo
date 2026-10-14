import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Colors } from '../../theme/colors';
import { zegoService } from '../../services/zegoService';
import { addMessage, leaveRoomState } from '../../store/slices/roomSlice';
import { GiftModal } from '../../components/GiftModal';
import { LuckyBagModal } from '../../components/LuckyBagModal';
import { ChatMessage, GiftItem, LuckyBag } from '../../types';

export const AudiencePage = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const messages = useSelector((state: RootState) => state.room.messages);

  const {
    roomId = 'room_demo_1',
    roomTitle = 'Live Room',
    hostName = 'Host',
  } = route.params || {};

  const streamId = `stream_${roomId}`;

  const [inputText, setInputText] = useState('');
  const [giftModalVisible, setGiftModalVisible] = useState(false);
  const [luckyBagModalVisible, setLuckyBagModalVisible] = useState(false);
  const [activeLuckyBag, setActiveLuckyBag] = useState<LuckyBag | null>({
    id: 'lb_1',
    creatorId: 'host',
    creatorName: hostName,
    totalDiamonds: 500,
    remainingDiamonds: 320,
    totalPacks: 10,
    remainingPacks: 6,
    expiresAt: Date.now() + 60000,
  });

  useEffect(() => {
    const joinRoom = async () => {
      const ok = await zegoService.loginRoom(roomId, {
        userId: user?.id || `user_${Date.now()}`,
        userName: user?.name || 'Viewer',
      });
      if (ok) {
        await zegoService.startPlaying(streamId);
      }
    };

    joinRoom();

    return () => {
      zegoService.leaveRoom();
      dispatch(leaveRoomState());
    };
  }, [roomId]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const msg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: user?.id || 'viewer',
      senderName: user?.name || 'Viewer',
      content: inputText.trim(),
      type: 'text',
      timestamp: Date.now(),
    };
    dispatch(addMessage(msg));
    setInputText('');
  };

  const handleSendGift = (gift: GiftItem, count: number) => {
    const msg: ChatMessage = {
      id: `gift_${Date.now()}`,
      senderId: user?.id || 'viewer',
      senderName: user?.name || 'Viewer',
      content: `sent ${gift.name} x${count} ${gift.icon}`,
      type: 'gift',
      timestamp: Date.now(),
      giftData: {
        giftId: gift.id,
        giftName: gift.name,
        giftIcon: gift.icon,
        giftCount: count,
      },
    };
    dispatch(addMessage(msg));
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.topBar}>
        <View style={styles.hostBadge}>
          <Text style={styles.hostAvatar}>🎙️</Text>
          <View>
            <Text style={styles.hostName}>{hostName}</Text>
            <Text style={styles.roomTitle}>{roomTitle}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
      </View>

      {/* Main Stream Area */}
      <View style={styles.streamArea}>
        <View style={styles.audioStage}>
          <Text style={styles.stageEmoji}>✨</Text>
          <Text style={styles.stageStatus}>Listening to {hostName}</Text>
        </View>

        {/* Floating Lucky Bag Icon if active */}
        {activeLuckyBag && (
          <TouchableOpacity
            style={styles.floatingLuckyBag}
            onPress={() => setLuckyBagModalVisible(true)}
          >
            <Text style={styles.luckyBagEmoji}>🧧</Text>
            <Text style={styles.luckyBagLabel}>Lucky Bag</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Chat Messages */}
      <View style={styles.chatArea}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={[styles.chatBubble, item.type === 'gift' && styles.giftBubble]}>
              <Text style={styles.chatSender}>{item.senderName}: </Text>
              <Text style={styles.chatText}>{item.content}</Text>
            </View>
          )}
        />
      </View>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TextInput
          style={styles.input}
          placeholder="Send a comment..."
          placeholderTextColor={Colors.textMuted}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSendMessage}
        />

        <TouchableOpacity style={styles.actionBtn} onPress={handleSendMessage}>
          <Text style={styles.btnEmoji}>💬</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, styles.giftBtn]}
          onPress={() => setGiftModalVisible(true)}
        >
          <Text style={styles.btnEmoji}>🎁</Text>
        </TouchableOpacity>
      </View>

      {/* Gift Modal */}
      <GiftModal
        visible={giftModalVisible}
        onClose={() => setGiftModalVisible(false)}
        onSendGift={handleSendGift}
      />

      {/* Lucky Bag Modal */}
      <LuckyBagModal
        visible={luckyBagModalVisible}
        luckyBag={activeLuckyBag}
        onClose={() => setLuckyBagModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 12,
  },
  hostBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  hostAvatar: {
    fontSize: 22,
    marginRight: 8,
  },
  hostName: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  roomTitle: {
    color: Colors.textSecondary,
    fontSize: 10,
  },
  closeBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  streamArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  audioStage: {
    alignItems: 'center',
  },
  stageEmoji: {
    fontSize: 64,
    marginBottom: 12,
  },
  stageStatus: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  floatingLuckyBag: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#DC2626',
    borderRadius: 16,
    padding: 8,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.gold,
  },
  luckyBagEmoji: {
    fontSize: 28,
  },
  luckyBagLabel: {
    color: Colors.gold,
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 2,
  },
  chatArea: {
    height: 180,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  chatBubble: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginVertical: 2,
    alignSelf: 'flex-start',
  },
  giftBubble: {
    backgroundColor: 'rgba(123, 44, 191, 0.6)',
    borderColor: Colors.gold,
    borderWidth: 1,
  },
  chatSender: {
    color: Colors.gold,
    fontWeight: 'bold',
    fontSize: 12,
  },
  chatText: {
    color: '#FFF',
    fontSize: 12,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.surface,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#FFF',
    fontSize: 14,
    marginRight: 8,
  },
  actionBtn: {
    backgroundColor: Colors.surfaceLight,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  giftBtn: {
    backgroundColor: Colors.secondary,
  },
  btnEmoji: {
    fontSize: 18,
  },
});
