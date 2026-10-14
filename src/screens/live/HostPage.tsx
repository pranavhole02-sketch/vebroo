import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  TextInput,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Colors } from '../../theme/colors';
import { zegoService } from '../../services/zegoService';
import { addMessage, toggleMute, leaveRoomState } from '../../store/slices/roomSlice';
import { ChatMessage } from '../../types';

export const HostPage = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const messages = useSelector((state: RootState) => state.room.messages);
  const isMuted = useSelector((state: RootState) => state.room.isMuted);

  const { roomTitle = 'My Live Room', roomType = 'audio' } = route.params || {};
  const roomId = route.params?.roomId || `room_${user?.id || 'host'}_${Date.now()}`;
  const streamId = `stream_${roomId}`;

  const [viewerCount, setViewerCount] = useState(1);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    // Initialize Zego RTC and start broadcasting
    const startLive = async () => {
      const ok = await zegoService.loginRoom(roomId, {
        userId: user?.id || 'host_user',
        userName: user?.name || 'Host',
      });
      if (ok) {
        await zegoService.startPublishing(streamId);
      }
    };

    startLive();

    return () => {
      zegoService.leaveRoom();
      dispatch(leaveRoomState());
    };
  }, [roomId]);

  const handleToggleMute = async () => {
    const nextMute = !isMuted;
    await zegoService.setMuteMicrophone(nextMute);
    dispatch(toggleMute());
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const msg: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: user?.id || 'host',
      senderName: user?.name || 'Host (You)',
      content: inputText.trim(),
      type: 'text',
      timestamp: Date.now(),
    };
    dispatch(addMessage(msg));
    setInputText('');
  };

  const handleEndStream = () => {
    Alert.alert('End Stream', 'Are you sure you want to end your live stream?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'End Stream',
        style: 'destructive',
        onPress: async () => {
          await zegoService.leaveRoom();
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.hostBadge}>
          <Text style={styles.hostAvatar}>👑</Text>
          <View>
            <Text style={styles.hostName}>{user?.name || 'Host'}</Text>
            <Text style={styles.roomTag}>{roomType.toUpperCase()} LIVE</Text>
          </View>
        </View>

        <View style={styles.topRight}>
          <View style={styles.viewerBadge}>
            <Text style={styles.viewerText}>👁️ {viewerCount}</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={handleEndStream}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Stage / Video Area */}
      <View style={styles.stageArea}>
        <View style={styles.pulsingMic}>
          <Text style={styles.micEmoji}>🎙️</Text>
          <Text style={styles.stageTitle}>{roomTitle}</Text>
          <Text style={styles.broadcastingText}>Broadcasting Live via ZEGOCLOUD</Text>
        </View>
      </View>

      {/* Floating Chat Feed */}
      <View style={styles.chatContainer}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.chatBubble}>
              <Text style={styles.chatSender}>{item.senderName}: </Text>
              <Text style={styles.chatContent}>{item.content}</Text>
            </View>
          )}
        />
      </View>

      {/* Bottom Controls */}
      <View style={styles.bottomBar}>
        <TextInput
          style={styles.chatInput}
          placeholder="Say something to your room..."
          placeholderTextColor={Colors.textMuted}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleSendMessage}
        />

        <TouchableOpacity style={styles.iconButton} onPress={handleSendMessage}>
          <Text style={styles.iconEmoji}>💬</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconButton, isMuted && styles.iconButtonActive]}
          onPress={handleToggleMute}
        >
          <Text style={styles.iconEmoji}>{isMuted ? '🔇' : '🎤'}</Text>
        </TouchableOpacity>
      </View>
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
    paddingVertical: 4,
    borderRadius: 20,
  },
  hostAvatar: {
    fontSize: 20,
    marginRight: 6,
  },
  hostName: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  roomTag: {
    color: Colors.accent,
    fontSize: 9,
    fontWeight: 'bold',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewerBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    marginRight: 8,
  },
  viewerText: {
    color: '#FFF',
    fontSize: 12,
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
  stageArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulsingMic: {
    alignItems: 'center',
    backgroundColor: 'rgba(123, 44, 191, 0.25)',
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primaryLight,
  },
  micEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  stageTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  broadcastingText: {
    color: Colors.accent,
    fontSize: 11,
    marginTop: 4,
  },
  chatContainer: {
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
  chatSender: {
    color: Colors.gold,
    fontWeight: 'bold',
    fontSize: 12,
  },
  chatContent: {
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
  chatInput: {
    flex: 1,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#FFF',
    fontSize: 14,
    marginRight: 8,
  },
  iconButton: {
    backgroundColor: Colors.surfaceLight,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 6,
  },
  iconButtonActive: {
    backgroundColor: Colors.error,
  },
  iconEmoji: {
    fontSize: 18,
  },
});
