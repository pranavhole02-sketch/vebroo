import { NativeModules } from 'react-native';
import { Config } from '../constants/Config';

let ZegoExpressEngine: any = null;
try {
  if (NativeModules.RCTZegoExpressEngine) {
    ZegoExpressEngine = require('zego-express-engine-reactnative').default;
  }
} catch (e) {
  // Running in Expo Go without native Zego binary
}

class ZegoService {
  private isInitialized = false;
  private currentRoomId: string | null = null;

  async init() {
    if (this.isInitialized) return;
    if (!ZegoExpressEngine || !NativeModules.RCTZegoExpressEngine) {
      console.log('[ZegoService] Running in Expo Go simulated mode (no native Zego binary).');
      this.isInitialized = true;
      return;
    }

    if (!Config.ZEGO_APP_ID || !Config.ZEGO_APP_SIGN) {
      console.warn('[ZegoService] AppID or AppSign not configured in src/constants/Config.ts');
      return;
    }

    try {
      const profile = {
        appID: Config.ZEGO_APP_ID,
        appSign: Config.ZEGO_APP_SIGN,
        scenario: 0,
      };
      await ZegoExpressEngine.createEngineWithProfile(profile);
      this.isInitialized = true;
      console.log('[ZegoService] Engine initialized successfully');
    } catch (e: any) {
      console.error('[ZegoService] Initialization error:', e.message);
    }
  }

  async loginRoom(roomId: string, user: { userId: string; userName: string }): Promise<boolean> {
    try {
      await this.init();
      if (!ZegoExpressEngine || !NativeModules.RCTZegoExpressEngine) {
        this.currentRoomId = roomId;
        console.log(`[ZegoService:Expo] Joined room (simulated): ${roomId}`);
        return true;
      }

      await ZegoExpressEngine.instance().loginRoom(roomId, {
        userID: user.userId,
        userName: user.userName,
      }, { maxMemberCount: 0, isUserStatusNotify: true });

      this.currentRoomId = roomId;
      return true;
    } catch (e: any) {
      console.error('[ZegoService] Login room failed:', e.message);
      return false;
    }
  }

  async startPublishing(streamId: string): Promise<void> {
    if (!ZegoExpressEngine || !NativeModules.RCTZegoExpressEngine) {
      console.log(`[ZegoService:Expo] Publishing stream (simulated): ${streamId}`);
      return;
    }
    try {
      await ZegoExpressEngine.instance().startPublishingStream(streamId);
    } catch (e: any) {
      console.error('[ZegoService] Start publishing failed:', e.message);
    }
  }

  async stopPublishing(): Promise<void> {
    if (!ZegoExpressEngine || !NativeModules.RCTZegoExpressEngine) return;
    try {
      await ZegoExpressEngine.instance().stopPublishingStream();
    } catch (e: any) {
      console.error('[ZegoService] Stop publishing failed:', e.message);
    }
  }

  async startPlaying(streamId: string, view?: any): Promise<void> {
    if (!ZegoExpressEngine || !NativeModules.RCTZegoExpressEngine) {
      console.log(`[ZegoService:Expo] Playing stream (simulated): ${streamId}`);
      return;
    }
    try {
      await ZegoExpressEngine.instance().startPlayingStream(streamId, view);
    } catch (e: any) {
      console.error('[ZegoService] Start playing failed:', e.message);
    }
  }

  async stopPlaying(streamId: string): Promise<void> {
    if (!ZegoExpressEngine || !NativeModules.RCTZegoExpressEngine) return;
    try {
      await ZegoExpressEngine.instance().stopPlayingStream(streamId);
    } catch (e: any) {
      console.error('[ZegoService] Stop playing failed:', e.message);
    }
  }

  async setMuteMicrophone(mute: boolean): Promise<void> {
    if (!ZegoExpressEngine || !NativeModules.RCTZegoExpressEngine) return;
    try {
      await ZegoExpressEngine.instance().muteMicrophone(mute);
    } catch (e: any) {
      console.error('[ZegoService] Mute mic failed:', e.message);
    }
  }

  async leaveRoom(): Promise<void> {
    if (!this.currentRoomId) return;
    if (!ZegoExpressEngine || !NativeModules.RCTZegoExpressEngine) {
      this.currentRoomId = null;
      return;
    }
    try {
      await this.stopPublishing();
      await ZegoExpressEngine.instance().logoutRoom(this.currentRoomId);
      this.currentRoomId = null;
    } catch (e: any) {
      console.error('[ZegoService] Logout room failed:', e.message);
    }
  }
}

export const zegoService = new ZegoService();
