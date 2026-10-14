import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LiveRoom, ChatMessage } from '../../types';

interface RoomState {
  activeRoom: LiveRoom | null;
  roomsList: LiveRoom[];
  messages: ChatMessage[];
  isMuted: boolean;
  isInRoom: boolean;
  role: 'host' | 'audience' | null;
}

const initialState: RoomState = {
  activeRoom: null,
  roomsList: [],
  messages: [],
  isMuted: false,
  isInRoom: false,
  role: null,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoomsList(state, action: PayloadAction<LiveRoom[]>) {
      state.roomsList = action.payload;
    },
    enterRoom(state, action: PayloadAction<{ room: LiveRoom; role: 'host' | 'audience' }>) {
      state.activeRoom = action.payload.room;
      state.role = action.payload.role;
      state.isInRoom = true;
      state.messages = [];
      state.isMuted = false;
    },
    leaveRoomState(state) {
      state.activeRoom = null;
      state.role = null;
      state.isInRoom = false;
      state.messages = [];
    },
    addMessage(state, action: PayloadAction<ChatMessage>) {
      state.messages.push(action.payload);
      if (state.messages.length > 100) {
        state.messages.shift();
      }
    },
    toggleMute(state) {
      state.isMuted = !state.isMuted;
    },
  },
});

export const { setRoomsList, enterRoom, leaveRoomState, addMessage, toggleMute } = roomSlice.actions;
export default roomSlice.reducer;
