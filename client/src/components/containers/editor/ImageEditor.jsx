import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FileSaver from 'file-saver';
import FilerobotImageEditor, {
	TABS,
	TOOLS,
} from 'react-filerobot-image-editor';

import {
	selectImageName,
	selectImageType,
	selectImageSrc,
	selectShowEditor,
	setEditorState,
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
	// const imageRef = {};
	const preset = useSelector(selectPreset);

	// const showData = () => {
	// 	const { designState } = imageRef.current();
	// 	console.log(designState);
	// };

	return (
		<div
			style={{ width: 'calc(100%-179px)', height: 'calc(100vh - 64px)' }}
			className="editor-wr"
		>
			<CustomDrawer />
			<PresetsList />
			{/* <button onClick={showData}>show</button> */}
			{showEditor && (
				<FilerobotImageEditor
					source={imageSrc}
					onBeforeSave={(imageFileInfo) => {
						console.log(imageFileInfo);
						imageFileInfo.quality = 1;
					}}
					// onModify={(currentDesignState) => {
					// 	console.log('current design state', currentDesignState);
					// 	const savedImgData = saveFnRef.current({ name: 'Custom name ' });
					// 	console.log('image after saving', savedImgData);
					// }}
					loadableDesignState={preset}
					// getCurrentImgDataFnRef={imageRef}
					onSave={(imageData, imageDesignState) => {
						FileSaver.saveAs(imageData.imageBase64, imageData.fullName);
						console.log('saved', imageData, imageDesignState);
					}}
					defaultSavedImageType={imageType}
					defaultSavedImageName={imageName}
					onClose={() => dispatch(setEditorState(false))}
					annotationsCommon={{
						fill: '#ff0000',
					}}
					theme={styledTheme}
					Text={{ text: 'ТРУХА' }}
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
						presetsFolders: [
							{
								titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
								// icon: <Groups3SharpIcon />, // React component, string or HTML Element
								groups: [
									{
										titleKey: 'linkedIn',
										items: [
											{
												titleKey: 'profilePhoto',
												width: 400,
												height: 400,
												descriptionKey: 'liProfilePhotoSize',
												disableManualResize: false,
											},
											{
												titleKey: 'profileCoverPhoto',
												width: 1584,
												height: 396,
												descriptionKey: 'liProfileCoverPhotoSize',
											},
											{
												titleKey: 'blogPostPhoto',
												width: 1200,
												height: 627,
												descriptionKey: 'liBlogPostPhotoSize',
											},
											{
												titleKey: 'companyLogo',
												width: 300,
												height: 300,
												descriptionKey: 'liCompanyLogoSize',
											},
											{
												titleKey: 'companyPageCover',
												width: 1128,
												height: 191,
												descriptionKey: 'liCompanyPageCoverSize',
											},
										],
									},
									{
										titleKey: 'twitter',
										items: [
											{
												titleKey: 'profilePhoto',
												width: 400,
												height: 400,
												descriptionKey: 'twProfilePhotoSize',
											},
											{
												titleKey: 'headerPhoto',
												width: 1500,
												height: 500,
												descriptionKey: 'twHeaderPhotoSize',
											},
											{
												titleKey: 'inStreamPhoto',
												width: 1600,
												height: 1900,
												descriptionKey: 'twInStreamPhotoSize',
											},
										],
									},
									{
										titleKey: 'instagram',
										items: [
											{
												titleKey: 'profilePhoto',
												width: 320,
												height: 320,
												descriptionKey: 'igProfilePhotoSize',
											},
											{
												titleKey: 'feedPortraitPhoto',
												width: 1080,
												height: 1350,
												descriptionKey: 'igFeedPortraitPhotoSize',
											},
											{
												titleKey: 'feedLandscapePhoto',
												width: 1080,
												height: 566,
												descriptionKey: 'igFeedLandscapePhotoSize',
											},
											{
												titleKey: 'feedSquarePhoto',
												width: 1080,
												height: 1080,
												descriptionKey: 'igFeedSquarePhotoSize',
											},
											{
												titleKey: 'storyPhoto',
												width: 1080,
												height: 1920,
												descriptionKey: 'igStoryPhotoSize',
											},
										],
									},
									{
										titleKey: 'facebook',
										items: [
											{
												titleKey: 'profilePhoto',
												width: 170,
												height: 170,
												descriptionKey: 'fbProfilePhotoSize',
											},
											{
												titleKey: 'profileCoverPhoto',
												width: 851,
												height: 315,
												descriptionKey: 'fbProfileCoverPhotoSize',
											},
											{
												titleKey: 'eventCoverPhoto',
												width: 1200,
												height: 628,
												descriptionKey: 'fbEventCoverPhotoSize',
											},
											{
												titleKey: 'timelinePhoto',
												width: 1200,
												height: 630,
												descriptionKey: 'fbTimelinePhotoSize',
											},
											{
												titleKey: 'storyPhoto',
												width: 1080,
												height: 1920,
												descriptionKey: 'fbStoryPhotoSize',
											},
										],
									},
								],
							},
						],
					}}
					// tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
					// defaultTabId={TABS.ANNOTATE} // or 'Annotate'
					// defaultToolId={TOOLS.TEXT} // or 'Text'
				/>
			)}
		</div>
	);
};

export default ImageEditor;
