import React, { useState, useEffect } from 'react';
import FilerobotImageEditor, {
	TABS,
	TOOLS,
} from 'react-filerobot-image-editor';
import FileSaver from 'file-saver';
import Groups3SharpIcon from '@mui/icons-material/Groups3Sharp';

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
		'bg-stateless': 'red',
	},
	
}

const ImageEditor = ({ imageData }) => {
	
	const [isImgEditorShown, setIsImgEditorShown] = useState(true);
	const [imagesrc, setImagesrc] = useState(imageData.imgSrc);
	const [imageName, setImageName] = useState(imageData.imgName);
	const [imageType, setImageType] = useState(imageData.imgType);

	const openImgEditor = (event) => {
		// create a new FileReader object
		setIsImgEditorShown(true);


	};

	const closeImgEditor = () => {
		setIsImgEditorShown(false);
	};

	return (
		<div style={{ width: '100%', height: 'calc(100vh - 64px)' }} className='editor-wr'>
			{/* <input type="file" onChange={openImgEditor} /> */}
			{isImgEditorShown && (

				<FilerobotImageEditor
					source={imagesrc}
					
					onSave={(editedImageObject, designState) => {
						FileSaver.saveAs(
							editedImageObject.imageBase64,
							editedImageObject.fullName
						);
						console.log('saved', editedImageObject, designState);
					}}
					defaultSavedImageType={imageType}
					defaultSavedImageName={imageName}
					onClose={closeImgEditor}
					annotationsCommon={{
						fill: '#ff0000',
					}}
					theme={styledTheme}
					Text={{ text: 'Filerobot...' }}
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
						]
					}}
					
				// tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
				// defaultTabId={TABS.ANNOTATE} // or 'Annotate'
				// defaultToolId={TOOLS.TEXT} // or 'Text'
				/>
				
			)}
			{console.log(<ImageEditor />)}
		</div>
	);
};

export default ImageEditor;
