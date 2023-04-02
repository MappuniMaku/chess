import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGame } from '@/types';

export interface IActiveGameState {
  value?: IGame;
}

const initialState: IActiveGameState = {
  value: undefined,
};

export const activeGameSlice = createSlice({
  name: 'activeGame',
  initialState,
  reducers: {
    updateActiveGame(state, action: PayloadAction<IGame | undefined>) {
      state.value = action.payload;
    },
  },
});

export const { updateActiveGame } = activeGameSlice.actions;

export const activeGameReducer = activeGameSlice.reducer;
