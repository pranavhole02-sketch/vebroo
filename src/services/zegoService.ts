import ZegoExpressEngine, {
  ZegoScenario,
  ZegoUser,
  ZegoRoomConfig,
} from 'zego-express-engine-reactnative';
import { Config } from '../constants/Config';

class ZegoService {
  private isInitialized = false;
  private currentRoomId: string | null = null;

  async init() {
    if (this.isInitialized) return;
    if (!Config.ZEGO_APP_ID || !Config.ZEGO_APP_SIGN) {
      console.warn('[ZegoService] AppID or AppSign not configured yet in src/constants/Config.ts');
      return;
    }

    try {
      const profile = {
        appID: Config.ZEGO_APP_ID,
        appSign: Config.ZEGO_APP_SIGN,
        scenario: ZegoScenario.General,
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
      const zegoUser: ZegoUser = {
        userID: user.userId,
        userName: user.userName,
      };
      const config: ZegoRoomConfig = {
        maxMemberCount: 0,
        isUserStatusNotify: true,
      };

      await ZegoExpressEngine.instance().loginRoom(roomId, zegoUser, config);
      this.currentRoomId = roomId;
      console.log(`[ZegoService] Joined room: ${roomId}`);
      return true;
    } catch (e: any) {
      console.error('[ZegoService] Login room failed:', e.message);
      return false;
    }
  }

  async startPublishing(streamId: string): Promise<void> {
    try {
      await ZegoExpressEngine.instance().startPublishingStream(streamId);
      console.log(`[ZegoService] Publishing stream: ${streamId}`);
    } catch (e: any) {
      console.error('[ZegoService] Start publishing failed:', e.message);
    }
  }

  async stopPublishing(): Promise<void> {
    try {
      await ZegoExpressEngine.instance().stopPublishingStream();
    } catch (e: any) {
      console.error('[ZegoService] Stop publishing failed:', e.message);
    }
  }

  async startPlaying(streamId: string, view?: any): Promise<void> {
    try {
      await ZegoExpressEngine.instance().startPlayingStream(streamId, view);
    } catch (e: any) {
      console.error('[ZegoService] Start playing failed:', e.message);
    }
  }

  async stopPlaying(streamId: string): Promise<void> {
    try {
      await ZegoExpressEngine.instance().stopPlayingStream(streamId);
    } catch (e: any) {
      console.error('[ZegoService] Stop playing failed:', e.message);
    }
  }

  async setMuteMicrophone(mute: boolean): Promise<void> {
    try {
      await ZegoExpressEngine.instance().muteMicrophone(mute);
    } catch (e: any) {
      console.error('[ZegoService] Mute mic failed:', e.message);
    }
  }

  async leaveRoom(): Promise<void> {
    if (!this.currentRoomId) return;
    try {
      await this.stopPublishing();
      await ZegoExpressEngine.instance().logoutRoom(this.currentRoomId);
      this.currentRoomId = null;
      console.log('[ZegoService] Left room successfully');
    } catch (e: any) {
      console.error('[ZegoService] Logout room failed:', e.message);
    }
  }
}

export const zegoService = new ZegoService();
