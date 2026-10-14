import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { NavKeys } from '../../constants/NavKeys';
import { roomService } from '../../api/services/roomService';

export const CreateRoomScreen = () => {
  const navigation = useNavigation<any>();

  const [title, setTitle] = useState('');
  const [roomType, setRoomType] = useState<'audio' | 'video'>('audio');
  const [loading, setLoading] = useState(false);

  const handleStartLive = async () => {
    if (!title.trim()) {
      Alert.alert('Required', 'Please enter a room title');
      return;
    }

    setLoading(true);
    try {
      const room = await roomService.createRoom({ title: title.trim(), roomType }).catch(() => ({
        id: `room_${Date.now()}`,
        title: title.trim(),
        roomType,
        zegoRoomId: `zego_${Date.now()}`,
      }));

      navigation.replace(NavKeys.HostPage, {
        roomId: room.id || room.zegoRoomId,
        roomTitle: title.trim(),
        roomType,
      });
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Could not create room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Live Room</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Room Title</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Chill Music & Chat"
          placeholderTextColor={Colors.textMuted}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Room Type</Text>
        <View style={styles.typeSelector}>
          <TouchableOpacity
            style={[styles.typeButton, roomType === 'audio' && styles.typeButtonActive]}
            onPress={() => setRoomType('audio')}
          >
            <Text style={styles.typeIcon}>🎙️</Text>
            <Text style={[styles.typeText, roomType === 'audio' && styles.typeTextActive]}>
              Voice Room
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.typeButton, roomType === 'video' && styles.typeButtonActive]}
            onPress={() => setRoomType('video')}
          >
            <Text style={styles.typeIcon}>📹</Text>
            <Text style={[styles.typeText, roomType === 'video' && styles.typeTextActive]}>
              Video Live
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartLive}
          disabled={loading}
        >
          <Text style={styles.startButtonText}>
            {loading ? 'Starting...' : 'Go Live Now'}
          </Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 32,
  },
  backButton: {
    color: '#FFF',
    fontSize: 22,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 12,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    color: Colors.text,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 24,
  },
  typeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  typeButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 14,
    paddingVertical: 20,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  typeButtonActive: {
    borderColor: Colors.primaryLight,
    backgroundColor: '#2A1B4E',
  },
  typeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  typeText: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  typeTextActive: {
    color: '#FFF',
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
