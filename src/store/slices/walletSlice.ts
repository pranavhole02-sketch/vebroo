import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WalletBalance, RechargeOffer } from '../../types';

interface WalletState {
  balance: WalletBalance;
  rechargeOffers: RechargeOffer[];
  isLoading: boolean;
}

const initialState: WalletState = {
  balance: {
    diamonds: 0,
    coins: 0,
    beans: 0,
    isFrozen: false,
  },
  rechargeOffers: [],
  isLoading: false,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setBalance(state, action: PayloadAction<WalletBalance>) {
      state.balance = action.payload;
    },
    deductDiamonds(state, action: PayloadAction<number>) {
      state.balance.diamonds = Math.max(0, state.balance.diamonds - action.payload);
    },
    addDiamonds(state, action: PayloadAction<number>) {
      state.balance.diamonds += action.payload;
    },
    setRechargeOffers(state, action: PayloadAction<RechargeOffer[]>) {
      state.rechargeOffers = action.payload;
    },
  },
});

export const { setBalance, deductDiamonds, addDiamonds, setRechargeOffers } = walletSlice.actions;
export default walletSlice.reducer;
