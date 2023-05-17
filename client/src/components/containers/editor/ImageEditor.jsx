import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileSaver from 'file-saver';
import FilerobotImageEditor, {
	TABS,
	TOOLS,
} from 'react-filerobot-image-editor';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SocialMediaCrops from '../../../app/editorCrops';
import { Button, TextField, IconButton } from '@mui/material';

import {
	selectImageName,
	selectImageType,
	selectImageSrc,
	selectShowEditor,
	setEditorState,
	setImageData,
} from '../../../features/image/imageSlice';
import { selectPreset } from '../../../features/preset/presetSlice';

import CustomDrawer from '../layout/CustomDrawer';
import PresetsList from './PresetsList';

import '../../../scss/editor.scss';
const styledTheme = {
	palette: {
		'bg-secondary': 'rgba(69,80,89, 1)',
		'bg-primary': 'rgba(12,12,12, 1)',
		'bg-primary-active': 'rgba(109,128,140, 1)',
		'txt-primary': 'rgba(199,208,216, 1)',
		'txt-secondary': 'rgba(199,208,216, 1)',
		'txt-secondary-invert': 'red',
		'btn-primary-text': 'rgba(199,208,216, 1)',
		'accent-primary-active': 'rgba(231, 235, 238, 1)',
	},
};

const ImageEditor = () => {
	const dispatch = useDispatch();
	const showEditor = useSelector(selectShowEditor);
	const imageSrc = useSelector(selectImageSrc);
	const imageName = useSelector(selectImageName);
	const imageType = useSelector(selectImageType);
	const preset = useSelector(selectPreset);
	const imageRef = {};
	let imageSrcNew = '';
	let imageNameNew = '';
	let imageTypeNew = '';

	// const preset = {
	// 	filter: 'Moon',
	// 	finetunes: ['Brighten'],
	// 	finetunesProps: { brightness: 0.1 },
	// };

	function handleDropFile(event) {
		event.preventDefault();
		if (event.dataTransfer.items[0].kind === 'file') {
			const file = event.dataTransfer.items[0].getAsFile();
			imageNameNew = file.name.split('.')[0];
			imageTypeNew = file.type.split('/')[1];
			dispatch(setEditorState(true));
			const reader = new FileReader();

			reader.onload = () => {
				imageSrcNew = reader.result;
				dispatchEvent(imageSrcNew, imageNameNew, imageTypeNew);
			};

			reader.readAsDataURL(file);
		}
	}

	function dragOverHandler(event) {
		event.preventDefault();
	}

	function dispatchEvent(imageSrc, imageName, imageType) {
		dispatch(setImageData({ imageSrc, imageName, imageType }));
		dispatch(setEditorState(true));
	}

	function handleFile(ev) {
		ev.preventDefault();
		let input = document.createElement('input');
		input.type = 'file';

		input.onchange = () => {
			const files = Array.from(input.files);
			imageNameNew = files[0].name.split('.')[0];
			imageTypeNew = files[0].type.split('/')[1];
			dispatch(setEditorState(false));
			const reader = new FileReader();

			reader.onload = () => {
				imageSrcNew = reader.result;
				dispatchEvent(imageSrcNew, imageNameNew, imageTypeNew);
			};

			reader.readAsDataURL(files[0]);
		};
		input.click();
	}

	return (
		<div>
			<CustomDrawer />
			<PresetsList />
			<div
				style={{ width: 'calc(100%-179px)', height: 'calc(100vh - 64px)' }}
				className="editor-wr"
			>
				{/* <button onClick={showData}>show</button> */}
				{/* <button onClick={updateData}>update</button> */}
				{showEditor ? (
					<FilerobotImageEditor
						source={imageSrc}
						loadableDesignState={preset}
						// getCurrentImgDataFnRef={imageRef}
						// updateStateFnRef={imageRef}
						onSave={(imageData, imageDesignState) => {
							FileSaver.saveAs(imageData.imageBase64, imageData.fullName);
							console.log('saved', imageData, imageDesignState);
						}}
						defaultSavedImageType={imageType}
						defaultSavedImageName={imageName}
						defaultSavedImageQuality={1}
						onClose={() => dispatch(setEditorState(false))}
						annotationsCommon={{
							fill: '#ff0000',
						}}
						theme={styledTheme}
						Text={{ text: 'ТРУХА⚡' }}
						Rotate={{ angle: 90, componentType: 'slider' }}
						Crop={{
							presetsItems: [
								{
									titleKey: 'classicTv',
									descriptionKey: '4:3',
									ratio: 4 / 3,
									//icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
								},
								{
									titleKey: 'cinemascope',
									descriptionKey: '21:9',
									ratio: 21 / 9,
									//icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
								},
							],
							presetsFolders: [SocialMediaCrops],
						}}
					/>
				) : (
					<div
						className="btn-add-photo-wr"
						onDrop={(event) => {
							handleDropFile(event);
						}}
						onDragOver={(event) => {
							dragOverHandler(event);
						}}
					>
						<IconButton onClick={handleFile} className="btn-add-photo">
							<ControlPointIcon />
						</IconButton>
					</div>
				)}
			</div>
		</div>
	);
};

export default ImageEditor;
