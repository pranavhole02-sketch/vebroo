import { apiClient } from '../client';
import { Endpoints } from '../endpoints';
import { GiftItem, LuckyBag } from '../../types';

export const giftService = {
  async getGiftBag(): Promise<GiftItem[]> {
    const res = await apiClient.get<any>(Endpoints.gifts.bag);
    return Array.isArray(res) ? res : res.items || [];
  },

  async sendGift(data: { roomId: string; receiverId: string; giftId: string; count: number }): Promise<any> {
    return apiClient.post(Endpoints.gifts.send, data);
  },

  async sendGiftFromBag(data: { roomId: string; receiverId: string; itemId: string; count: number }): Promise<any> {
    return apiClient.post(Endpoints.gifts.sendFromBag, data);
  },

  async getTopSenders(roomId?: string): Promise<any[]> {
    return apiClient.get(Endpoints.gifts.topSenders, { roomId });
  },

  async getTopReceivers(): Promise<any[]> {
    return apiClient.get(Endpoints.gifts.topReceivers);
  },

  // Lucky Bag
  async createLuckyBag(data: { roomId: string; totalDiamonds: number; totalPacks: number }): Promise<LuckyBag> {
    return apiClient.post(Endpoints.gifts.luckyBagCreate, data);
  },

  async claimLuckyBag(luckyBagId: string): Promise<{ diamondsWon: number }> {
    return apiClient.post(Endpoints.gifts.luckyBagClaim, { luckyBagId });
  },

  async getActiveLuckyBag(roomId: string): Promise<LuckyBag | null> {
    return apiClient.get(Endpoints.gifts.luckyBagActive, { roomId }).catch(() => null);
  },
};
