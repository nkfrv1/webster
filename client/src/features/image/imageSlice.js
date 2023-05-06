import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
	name: 'image',
	initialState: {
		imageSrc: '',
		imageName: '',
		imageType: '',
		showEditor: false,
	},
	reducers: {
		setImageData: (state, action) => {
			state.imageSrc = action.payload.imageSrc;
			state.imageName = action.payload.imageName;
			state.imageType = action.payload.imageType;
		},
		setEditorState: (state, action) => {
			state.showEditor = action.payload;
		},
	},
});

export const { setImageData, setEditorState } = imageSlice.actions;

export default imageSlice.reducer;

export const selectImageSrc = (state) => state.image.imageSrc;
export const selectImageName = (state) => state.image.imageName;
export const selectImageType = (state) => state.image.imageType;
export const selectShowEditor = (state) => state.image.showEditor;
