import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Colors } from '../theme/colors';
import { addDiamonds } from '../store/slices/walletSlice';
import { LuckyBag } from '../types';

interface LuckyBagModalProps {
  visible: boolean;
  luckyBag: LuckyBag | null;
  onClose: () => void;
}

export const LuckyBagModal: React.FC<LuckyBagModalProps> = ({ visible, luckyBag, onClose }) => {
  const dispatch = useDispatch();
  const [claiming, setClaiming] = useState(false);
  const [claimedReward, setClaimedReward] = useState<number | null>(null);

  const handleClaim = async () => {
    setClaiming(true);
    try {
      // Simulate or call claim API
      const reward = Math.floor(Math.random() * 50) + 5;
      setClaimedReward(reward);
      dispatch(addDiamonds(reward));
    } catch (e: any) {
      Alert.alert('Lucky Bag', e.message || 'Already claimed or expired');
    } finally {
      setClaiming(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.icon}>🧧</Text>
          <Text style={styles.title}>Lucky Bag</Text>
          <Text style={styles.sender}>
            Sent by: {luckyBag?.creatorName || 'Room Host'}
          </Text>

          {claimedReward !== null ? (
            <View style={styles.rewardBox}>
              <Text style={styles.congrats}>Congratulations!</Text>
              <Text style={styles.rewardAmount}>+ 💎 {claimedReward}</Text>
            </View>
          ) : (
            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Remaining: {luckyBag?.remainingPacks || 5} / {luckyBag?.totalPacks || 10} bags
              </Text>
              <TouchableOpacity
                style={styles.claimButton}
                onPress={handleClaim}
                disabled={claiming}
              >
                {claiming ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.claimButtonText}>Open Lucky Bag</Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  content: {
    backgroundColor: '#991B1B', // Red packet theme
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: '85%',
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  icon: {
    fontSize: 54,
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.gold,
  },
  sender: {
    color: '#FDE047',
    fontSize: 14,
    marginTop: 4,
    marginBottom: 16,
  },
  infoBox: {
    width: '100%',
    alignItems: 'center',
  },
  infoText: {
    color: '#FFF',
    fontSize: 13,
    marginBottom: 14,
  },
  claimButton: {
    backgroundColor: Colors.gold,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  claimButtonText: {
    color: '#7F1D1D',
    fontWeight: 'bold',
    fontSize: 16,
  },
  rewardBox: {
    alignItems: 'center',
    marginVertical: 12,
  },
  congrats: {
    color: '#FFF',
    fontSize: 14,
  },
  rewardAmount: {
    color: Colors.gold,
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
  closeButton: {
    marginTop: 16,
    padding: 8,
  },
  closeButtonText: {
    color: '#FCA5A5',
    fontSize: 13,
  },
});
