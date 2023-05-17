import { createSlice } from '@reduxjs/toolkit';

const presetSlice = createSlice({
	name: 'preset',
	initialState: {
		preset: '',
		presetsListState: false,
	},
	reducers: {
		setPreset: (state, action) => {
			state.preset = action.payload;
		},
		setPresetsListState: (state, action) => {
			state.presetsListState = action.payload;
		},
	},
});

export const { setPreset, setPresetsListState } = presetSlice.actions;

export default presetSlice.reducer;

export const selectPreset = (state) => state.preset.preset;
export const selectPresetsListState = (state) => state.preset.presetsListState;
