export interface UserProfile {
  id: string;
  numericId?: string;
  name: string;
  nickname?: string;
  avatar?: string;
  gender?: 'male' | 'female' | 'other';
  country?: string;
  level?: number;
  wealthLevel?: number;
  cpLevel?: number;
  svipLevel?: number;
  coins?: number;
  diamonds?: number;
  beans?: number;
  followersCount?: number;
  followingCount?: number;
  zegoUserId?: string;
  token?: string;
}

export interface LiveRoom {
  id: string;
  title: string;
  cover?: string;
  hostId: string;
  hostName: string;
  hostAvatar?: string;
  zegoRoomId: string;
  streamId?: string;
  onlineCount: number;
  roomType: 'audio' | 'video';
  isLive: boolean;
  announcement?: string;
  seats?: RoomSeat[];
}

export interface RoomSeat {
  seatIndex: number;
  userId?: string;
  userName?: string;
  userAvatar?: string;
  isMuted?: boolean;
  isLocked?: boolean;
}

export interface GiftItem {
  id: string;
  name: string;
  icon: string;
  price: number;
  animationUrl?: string;
  type: 'static' | 'svga' | 'lottie' | 'wings';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  type: 'text' | 'gift' | 'system' | 'image';
  timestamp: number;
  giftData?: {
    giftId: string;
    giftName: string;
    giftIcon: string;
    giftCount: number;
  };
}

export interface WalletBalance {
  diamonds: number;
  coins: number;
  beans: number;
  isFrozen: boolean;
}

export interface RechargeOffer {
  id: string;
  title: string;
  diamonds: number;
  bonusDiamonds?: number;
  priceInr: number;
}

export interface LuckyBag {
  id: string;
  creatorId: string;
  creatorName: string;
  totalDiamonds: number;
  remainingDiamonds: number;
  totalPacks: number;
  remainingPacks: number;
  expiresAt: number;
}
