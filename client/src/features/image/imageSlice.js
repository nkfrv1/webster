import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
	name: 'image',
	initialState: {
		imageSrc: '',
		imageName: '',
		imageType: '',
		showEditor: false,
		shareImage: false,
		saveImage: false,
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
		setShareImage: (state, action) => {
			state.shareImage = action.payload;
		},
		setSaveImage: (state, action) => {
			state.saveImage = action.payload;
		},
	},
});

export const { setImageData, setEditorState, setShareImage, setSaveImage } =
	imageSlice.actions;

export default imageSlice.reducer;

export const selectImageSrc = (state) => state.image.imageSrc;
export const selectImageName = (state) => state.image.imageName;
export const selectImageType = (state) => state.image.imageType;
export const selectShowEditor = (state) => state.image.showEditor;
export const selectShareImage = (state) => state.image.shareImage;
export const selectSaveImage = (state) => state.image.saveImage;
