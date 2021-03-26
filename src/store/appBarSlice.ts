import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';

// Define a type for the slice state
interface appBarState {
    isVisible: boolean
}
  
// Define the initial state using that type
const initialState: appBarState = {
    isVisible: false
}

export const appBarSlice = createSlice({
  name: 'appBar',
  initialState,
  reducers: {
    setVisible: state => {
      state.isVisible = true;
    },
    setInvisible: state => {
      state.isVisible = false;
    },
    changeVisibility : (state, action : PayloadAction<boolean>) => {
        state.isVisible = action.payload
    }
  },
});

//Define the Reducers
export const { setVisible, setInvisible, changeVisibility } = appBarSlice.actions;

//Define the Selectors
export const selectVisible = (state : RootState) => state.appBar.isVisible;

export default appBarSlice.reducer;
