import { apiClient } from '../client';
import { Endpoints } from '../endpoints';
import { LiveRoom } from '../../types';

export const roomService = {
  async getRooms(params?: { page?: number; limit?: number; category?: string }): Promise<LiveRoom[]> {
    const res = await apiClient.get<{ docs?: LiveRoom[]; data?: LiveRoom[] }>(Endpoints.rooms.base, params);
    return res.docs || res.data || (Array.isArray(res) ? res : []);
  },

  async getRecentRooms(): Promise<LiveRoom[]> {
    return apiClient.get(Endpoints.rooms.recent);
  },

  async getMyFollowRooms(): Promise<LiveRoom[]> {
    return apiClient.get(Endpoints.rooms.myFollows);
  },

  async createRoom(data: { title: string; roomType: 'audio' | 'video'; cover?: string }): Promise<LiveRoom> {
    return apiClient.post(Endpoints.rooms.base, data);
  },

  async followRoom(roomId: string): Promise<boolean> {
    return apiClient.post(Endpoints.rooms.follow, { roomId });
  },

  async unfollowRoom(roomId: string): Promise<boolean> {
    return apiClient.post(Endpoints.rooms.unfollow, { roomId });
  },

  async getRoomProgress(roomId: string): Promise<any> {
    return apiClient.get(Endpoints.rooms.roomProgressSummary, { roomId });
  },
};
