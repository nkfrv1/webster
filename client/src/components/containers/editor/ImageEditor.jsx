import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import FileSaver from 'file-saver';
import FilerobotImageEditor from 'react-filerobot-image-editor';

import ControlPointIcon from '@mui/icons-material/ControlPoint';
import SocialMediaCrops from '../../../app/editorCrops';
import { IconButton } from '@mui/material';

import {
	setImageData,
	setEditorState,
	setShareImage,
	selectImageSrc,
	selectImageName,
	selectImageType,
	selectShowEditor,
	selectShareImage,
} from '../../../features/image/imageSlice';

import {
	setCreatePreset,
	setPresetsListState,
	selectPresets,
	selectSelectedPreset,
	selectCreatePreset,
	setPresets,
} from '../../../features/preset/presetSlice';

import CustomDrawer from '../layout/CustomDrawer';
import PresetsList from './PresetsList';
import CreatePreset from './CreatePreset';

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
		'icons-secondary': 'rgb(231, 235, 238)',
		'icons-primary': 'rgb(231, 235, 238)',
	},
};

const ImageEditor = () => {
	const dispatch = useDispatch();
	const imageSrc = useSelector(selectImageSrc);
	const imageName = useSelector(selectImageName);
	const imageType = useSelector(selectImageType);

	const showEditor = useSelector(selectShowEditor);
	const shareImage = useSelector(selectShareImage);
	const createPreset = useSelector(selectCreatePreset);

	const presetToApply = useSelector(selectSelectedPreset);
	const presets = useSelector(selectPresets);

	const [presetModalOpen, setPresetModalOpen] = useState(false);
	const [submitTitle, setSubmitTitle] = useState(false);
	const [title, setTitle] = useState('New Custom Preset');
	const [tabAdded, setTabAdded] = useState(false);
	let imageSrcNew = '';
	let imageNameNew = '';
	let imageTypeNew = '';
	const imageRef = {};

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

	const addTab = () => {
		let tabSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		let iconPath = document.createElementNS(
			'http://www.w3.org/2000/svg',
			'path'
		);
		tabSvg.setAttribute('width', '14');
		tabSvg.setAttribute('height', '14');
		tabSvg.setAttribute('viewBox', '0 0 50 50');
		tabSvg.setAttribute('fill', 'none');
		tabSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		iconPath.setAttribute(
			'd',
			'M 37.4315 14.1685 L 32.25 11.825 l 5.1815 -2.3435 L 39.775 4.3 l 2.3435 5.1815 L 47.3 11.825 l -5.1815 2.3435 L 39.775 19.35 l -2.3435 -5.1815 z m 8.3205 13.1795 L 44.075 23.65 l -1.677 3.698 l -3.698 1.677 l 3.698 1.677 l 1.677 3.698 l 1.677 -3.698 L 49.45 29.025 l -3.698 -1.677 z m -10.836 3.5475 l 4.171 3.1605 l -5.375 9.3095 l -4.816 -2.021 c -0.43 0.2795 -0.903 0.559 -1.376 0.7955 l -0.645 5.16 h -10.75 l -0.645 -5.1815 c -0.473 -0.2365 -0.9245 -0.4945 -1.376 -0.7955 l -4.816 2.021 l -5.375 -9.3095 l 4.171 -3.1605 c -0.0215 -0.2365 -0.0215 -0.516 -0.0215 -0.774 s 0 -0.5375 0.0215 -0.7955 l -4.171 -3.1605 l 5.375 -9.3095 l 4.816 2.021 c 0.43 -0.2795 0.903 -0.559 1.376 -0.7955 L 16.125 12.9 h 10.75 l 0.645 5.1815 c 0.473 0.2365 0.9245 0.4945 1.376 0.7955 l 4.816 -2.021 l 5.375 9.3095 l -4.171 3.1605 c 0.0215 0.258 0.0215 0.516 0.0215 0.7955 s 0 0.516 -0.0215 0.774 z M 27.95 30.1 c 0 -3.569 -2.881 -6.45 -6.45 -6.45 s -6.45 2.881 -6.45 6.45 s 2.881 6.45 6.45 6.45 s 6.45 -2.881 6.45 -6.45 z'
		);
		iconPath.setAttribute('fill', 'currentColor');

		tabSvg.appendChild(iconPath);

		let tabLabel = document.createElement('label');
		tabLabel.classList.add(
			'sc-16k2ql4-0',
			'dGescJ',
			'sc-qhd6ow-2',
			'cqoMlm',
			'FIE_tab-label',
			'SfxLabel-root'
		);

		let tabSpan = document.createElement('span');
		tabSpan.classList.add('sc-16k2ql4-1', 'llQteX', 'SfxLabel-text');
		tabSpan.innerHTML = 'Presets';
		tabLabel.appendChild(tabSpan);

		let tab = document.createElement('div');
		tab.classList.add('sc-qhd6ow-1', 'bDBhuu', 'FIE_tab', 'custom');
		tab.setAttribute('aria-selected', 'false');
		tab.addEventListener('click', () => {
			const builtinTabs = Array.from(
				document.getElementsByClassName('FIE_tab')
			);
			builtinTabs.map((el) => el.setAttribute('aria-selected', 'false'));
			tab.setAttribute('aria-selected', 'true');
			dispatch(setPresetsListState(true));
		});
		tab.appendChild(tabSvg);
		tab.appendChild(tabLabel);
		return tab;
	};

	const dataURLtoFile = (dataurl, filename) => {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[arr.length - 1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], filename, { type: mime });
	};

	useEffect(() => {
		if (!tabAdded && showEditor) {
			setTimeout(() => {
				const tabsList = Array.from(
					document.getElementsByClassName('FIE_tabs')
				);
				const presetsTab = addTab();
				tabsList[0]?.append(presetsTab);

				const tabs = Array.from(tabsList[0]?.children);
				tabs.map((tab, index) => {
					if (index < 6) {
						tab.addEventListener('click', () => {
							const customTab = Array.from(
								document.getElementsByClassName('custom')
							);
							customTab.map((el) => el.setAttribute('aria-selected', 'false'));
						});
					}
				});
				setTabAdded(true);
			}, 1000);
		}
		setTabAdded(false);
	}, [showEditor]);

	useEffect(() => {
		if (shareImage) {
			const file = dataURLtoFile(
				imageRef.current().imageData.imageBase64,
				`${imageName}.${imageType}`
			);
			navigator.share({
				title: 'Share your Image',
				text: 'Created with Dive',
				files: [file],
			});
			dispatch(setShareImage(false));
		}
	}, [shareImage]);

	useEffect(() => {
		if (createPreset) {
			setPresetModalOpen(true);
			dispatch(setCreatePreset(false));
		}
	}, [createPreset]);

	useEffect(() => {
		if (submitTitle) {
			let designState = imageRef.current().designState;
			designState.id = presets[presets.length - 1].id + 1;
			const presetToAdd = {
				id: designState.id,
				title,
				opts: {
					annotations: designState.annotations,
					filter: designState.filter,
					finetunes: designState.finetunes,
					finetunesProps: designState.finetunesProps,
					resize: designState.resize,
					shownImageDimensions: designState.shownImageDimensions,
				},
			};

			dispatch(setPresets(presetToAdd));

			setSubmitTitle(false);
		}
	}, [submitTitle]);

	return (
		<div>
			<CustomDrawer />
			<PresetsList />
			<CreatePreset
				open={presetModalOpen}
				setOpen={setPresetModalOpen}
				title={title}
				setTitle={setTitle}
				setSubmit={setSubmitTitle}
			/>
			<div
				style={{ width: 'calc(100%-179px)', height: 'calc(100vh - 64px)' }}
				className="editor-wr"
			>
				{/* <button onClick={showData}>show</button> */}
				{/* <button onClick={updateData}>update</button> */}
				{showEditor ? (
					<FilerobotImageEditor
						source={imageSrc}
						loadableDesignState={presetToApply}
						getCurrentImgDataFnRef={imageRef}
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
