import { apiClient } from '../client';
import { Endpoints } from '../endpoints';
import { WalletBalance, RechargeOffer } from '../../types';

export const walletService = {
  async getBalance(): Promise<WalletBalance> {
    return apiClient.get('/users/me/balance');
  },

  async getRechargeOffers(): Promise<RechargeOffer[]> {
    const res = await apiClient.get<any>(Endpoints.wallet.rechargeOffersActive);
    return res.docs || res.data || (Array.isArray(res) ? res : []);
  },

  async convertCoinsToDiamonds(coinsAmount: number): Promise<{ success: boolean; diamondsAdded: number }> {
    return apiClient.post(Endpoints.wallet.convertCoinsToDiamonds, { coins: coinsAmount });
  },

  async getTransactionHistory(): Promise<any[]> {
    return apiClient.get(Endpoints.wallet.history);
  },
};
