import { apiClient } from '../client';
import { Endpoints } from '../endpoints';
import { UserProfile } from '../../types';

export const authService = {
  async loginWithPhone(phoneNumber: string, otp?: string): Promise<{ user: UserProfile; token: string }> {
    return apiClient.post(Endpoints.auth.phone, { phoneNumber, otp });
  },

  async loginWithGoogle(idToken: string): Promise<{ user: UserProfile; token: string }> {
    return apiClient.post(Endpoints.auth.google, { idToken });
  },

  async loginWithFacebook(accessToken: string): Promise<{ user: UserProfile; token: string }> {
    return apiClient.post(Endpoints.auth.facebook, { accessToken });
  },

  async createUserWithZego(data: { nickname: string; avatar?: string; gender: string }): Promise<UserProfile> {
    return apiClient.post(Endpoints.auth.createUserWithZego, data);
  },

  async getMe(): Promise<UserProfile> {
    return apiClient.get('/users/me');
  },

  async checkBanStatus(): Promise<{ isBanned: boolean; reason?: string }> {
    return apiClient.get(Endpoints.auth.banStatus);
  },
};
