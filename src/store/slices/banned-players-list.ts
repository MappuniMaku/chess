import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBannedPlayer } from '@/types';

export interface IBannedPlayersListState {
  bannedPlayers: IBannedPlayer[];
}

const initialState: IBannedPlayersListState = {
  bannedPlayers: [],
};

export const bannedPlayersListSlice = createSlice({
  name: 'bannedPlayersList',
  initialState,
  reducers: {
    updateBannedPlayers(state, action: PayloadAction<IBannedPlayer[]>) {
      state.bannedPlayers = action.payload;
    },
  },
});

export const { updateBannedPlayers } = bannedPlayersListSlice.actions;

export const bannedPlayersListReducer = bannedPlayersListSlice.reducer;
