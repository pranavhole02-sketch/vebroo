import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { Colors } from '../../theme/colors';
import { paymentService } from '../../services/razorpayService';
import { addDiamonds } from '../../store/slices/walletSlice';
import { RechargeOffer } from '../../types';

const RECHARGE_PACKS: RechargeOffer[] = [
  { id: 'pack_1', title: 'Starter Pack', diamonds: 100, bonusDiamonds: 10, priceInr: 99 },
  { id: 'pack_2', title: 'Popular Pack', diamonds: 500, bonusDiamonds: 75, priceInr: 499 },
  { id: 'pack_3', title: 'Pro Streamer', diamonds: 1200, bonusDiamonds: 250, priceInr: 999 },
  { id: 'pack_4', title: 'VIP Wealth', diamonds: 3000, bonusDiamonds: 800, priceInr: 2499 },
  { id: 'pack_5', title: 'King Bundle', diamonds: 7000, bonusDiamonds: 2200, priceInr: 4999 },
  { id: 'pack_6', title: 'Godfather Pack', diamonds: 15000, bonusDiamonds: 6000, priceInr: 9999 },
];

export const WalletScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const balance = useSelector((state: RootState) => state.wallet.balance);

  const [loadingPackId, setLoadingPackId] = useState<string | null>(null);

  const handleBuyPack = async (pack: RechargeOffer) => {
    setLoadingPackId(pack.id);
    try {
      const result = await paymentService.checkout({
        description: `Recharge ${pack.diamonds + (pack.bonusDiamonds || 0)} Diamonds`,
        amountInr: pack.priceInr,
        userName: user?.name || 'VoBee User',
      });

      if (result.success) {
        const totalPurchased = pack.diamonds + (pack.bonusDiamonds || 0);
        dispatch(addDiamonds(totalPurchased));
        Alert.alert('Recharge Successful!', `Added ${totalPurchased} Diamonds to your wallet.`);
      } else if (result.error && result.error !== 'Payment cancelled') {
        Alert.alert('Payment Notice', result.error);
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Payment initiation failed');
    } finally {
      setLoadingPackId(null);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wallet</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Balance Cards */}
      <View style={styles.balanceContainer}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceIcon}>💎</Text>
          <Text style={styles.balanceLabel}>Diamonds</Text>
          <Text style={styles.balanceValue}>{balance.diamonds}</Text>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceIcon}>🪙</Text>
          <Text style={styles.balanceLabel}>Coins</Text>
          <Text style={styles.balanceValue}>{balance.coins}</Text>
        </View>
      </View>

      {/* Recharge Section Title */}
      <Text style={styles.sectionTitle}>Recharge Diamonds (Razorpay)</Text>

      {/* Pack List */}
      <FlatList
        data={RECHARGE_PACKS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.packCard}>
            <View>
              <Text style={styles.packTitle}>{item.title}</Text>
              <Text style={styles.packDiamonds}>
                💎 {item.diamonds}
                {item.bonusDiamonds ? (
                  <Text style={styles.bonusText}> + {item.bonusDiamonds} Bonus</Text>
                ) : null}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.buyButton}
              onPress={() => handleBuyPack(item)}
              disabled={loadingPackId === item.id}
            >
              <Text style={styles.buyButtonText}>
                {loadingPackId === item.id ? '...' : `₹ ${item.priceInr}`}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  balanceIcon: {
    fontSize: 28,
    marginBottom: 4,
  },
  balanceLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  balanceValue: {
    color: Colors.gold,
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 4,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  packCard: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  packTitle: {
    color: Colors.textSecondary,
    fontSize: 13,
  },
  packDiamonds: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  bonusText: {
    color: Colors.accent,
    fontSize: 12,
  },
  buyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buyButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
