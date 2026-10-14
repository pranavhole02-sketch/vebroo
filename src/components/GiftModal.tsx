import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Colors } from '../theme/colors';
import { deductDiamonds } from '../store/slices/walletSlice';
import { GiftItem } from '../types';

interface GiftModalProps {
  visible: boolean;
  onClose: () => void;
  onSendGift: (gift: GiftItem, count: number) => void;
}

const DEFAULT_GIFTS: GiftItem[] = [
  { id: 'gift_rose', name: 'Rose', icon: '🌹', price: 1, type: 'static' },
  { id: 'gift_heart', name: 'Heart', icon: '💖', price: 5, type: 'static' },
  { id: 'gift_car', name: 'Sports Car', icon: '🏎️', price: 99, type: 'svga' },
  { id: 'gift_rocket', name: 'Rocket', icon: '🚀', price: 520, type: 'lottie' },
  { id: 'gift_castle', name: 'Magic Castle', icon: '🏰', price: 1314, type: 'svga' },
  { id: 'gift_wings', name: 'Purple Wings', icon: '🪽', price: 2999, type: 'wings' },
];

const COUNTS = [1, 10, 66, 99, 520, 1314];

export const GiftModal: React.FC<GiftModalProps> = ({ visible, onClose, onSendGift }) => {
  const dispatch = useDispatch();
  const diamonds = useSelector((state: RootState) => state.wallet.balance.diamonds);

  const [selectedGift, setSelectedGift] = useState<GiftItem>(DEFAULT_GIFTS[0]);
  const [selectedCount, setSelectedCount] = useState<number>(1);

  const handleSend = () => {
    const totalCost = selectedGift.price * selectedCount;
    if (diamonds < totalCost) {
      Alert.alert('Insufficient Diamonds', 'Please recharge diamonds to send this gift.');
      return;
    }
    dispatch(deductDiamonds(totalCost));
    onSendGift(selectedGift, selectedCount);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.container} onStartShouldSetResponder={() => true}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Send Gift</Text>
            <View style={styles.balanceBadge}>
              <Text style={styles.balanceText}>💎 {diamonds}</Text>
            </View>
          </View>

          {/* Gift Grid */}
          <FlatList
            data={DEFAULT_GIFTS}
            numColumns={3}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              const isSelected = selectedGift.id === item.id;
              return (
                <TouchableOpacity
                  style={[styles.giftCard, isSelected && styles.giftCardSelected]}
                  onPress={() => setSelectedGift(item)}
                >
                  <Text style={styles.giftIcon}>{item.icon}</Text>
                  <Text style={styles.giftName}>{item.name}</Text>
                  <Text style={styles.giftPrice}>💎 {item.price}</Text>
                </TouchableOpacity>
              );
            }}
          />

          {/* Count Multiplier Selector */}
          <View style={styles.countRow}>
            {COUNTS.map((cnt) => (
              <TouchableOpacity
                key={cnt}
                style={[styles.countBadge, selectedCount === cnt && styles.countBadgeSelected]}
                onPress={() => setSelectedCount(cnt)}
              >
                <Text
                  style={[styles.countText, selectedCount === cnt && styles.countTextSelected]}
                >
                  x{cnt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Action Footer */}
          <View style={styles.footer}>
            <Text style={styles.totalText}>
              Total: 💎 {selectedGift.price * selectedCount}
            </Text>
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  balanceBadge: {
    backgroundColor: Colors.surfaceLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderColor: Colors.border,
    borderWidth: 1,
  },
  balanceText: {
    color: Colors.gold,
    fontWeight: 'bold',
    fontSize: 14,
  },
  giftCard: {
    flex: 1,
    margin: 6,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  giftCardSelected: {
    borderColor: Colors.primaryLight,
    backgroundColor: '#322258',
  },
  giftIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  giftName: {
    color: Colors.text,
    fontSize: 12,
    fontWeight: '600',
  },
  giftPrice: {
    color: Colors.gold,
    fontSize: 11,
    marginTop: 4,
  },
  countRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 14,
  },
  countBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: Colors.surfaceLight,
  },
  countBadgeSelected: {
    backgroundColor: Colors.primary,
  },
  countText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  countTextSelected: {
    color: '#FFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 12,
  },
  totalText: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: 'bold',
  },
  sendButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 12,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
