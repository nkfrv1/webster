import { createSlice } from '@reduxjs/toolkit';

const presetSlice = createSlice({
	name: 'preset',
	initialState: {
		presets: JSON.parse(localStorage.getItem('presets')) || [],
		selctedPreset: {},
		presetsListState: false,
		createPreset: false,
	},
	reducers: {
		setPresets: (state, action) => {
			if (action.payload.length > 1) {
				state.presets = action.payload;
			} else {
				state.presets.push(action.payload);
				localStorage.setItem('presets', JSON.stringify(state.presets));
			}
		},
		setSelectedPreset: (state, action) => {
			state.selctedPreset = action.payload;
		},
		setPresetsListState: (state, action) => {
			state.presetsListState = action.payload;
		},
		setCreatePreset: (state, action) => {
			state.createPreset = action.payload;
		},
		deletePreset: (state, action) => {
			state.presets = state.presets.filter(
				(preset) => preset.id !== action.payload
			);
			localStorage.setItem('presets', JSON.stringify(state.presets));
		},
	},
});

export const {
	setPresets,
	setSelectedPreset,
	setPresetsListState,
	setCreatePreset,
	deletePreset,
} = presetSlice.actions;

export default presetSlice.reducer;

export const selectPresets = (state) => state.preset.presets;
export const selectSelectedPreset = (state) => state.preset.selctedPreset;
export const selectCreatePreset = (state) => state.preset.createPreset;
export const selectPresetsListState = (state) => state.preset.presetsListState;
