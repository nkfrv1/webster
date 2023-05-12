import { useState, useEffect, useRef, useCallback, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Konva from 'konva';
import { Image } from 'react-konva';
import FilerobotImageEditor, {
	TABS,
	TOOLS,
} from 'react-filerobot-image-editor';

import {
	Drawer,
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemButton,
	ListItemAvatar,
	Toolbar,
	Avatar
} from '@mui/material';

import {
	setPresetsListState,
	selectPresetsListState,
	setPreset,
} from '../../../features/preset/presetSlice';

import { selectImageSrc, selectImageName } from '../../../features/image/imageSlice'

function PresetsList() {
	const dispatch = useDispatch();
	const open = useSelector(selectPresetsListState);
	const image = useSelector(selectImageSrc);
	const imageName = useSelector(selectImageName);
	const imageRef = useRef();
	const [imageProps, setImageProps] = useState({
		filter: 'Sepia',
		finetunes: ['Brighten'],
		finetunesProps: { brightness: 0.55 },
	});

	const cacheImageNode = useCallback(() => {
		if (imageRef.current) {
			imageRef.current.cache();
		} else {
		  setTimeout(cacheImageNode, 0);
		}
	  }, []);
	
	  useEffect(() => {
		if (image) {
		  cacheImageNode();
		}
	
		return () => {
			imageRef.current?.clearCache();
		};
	  }, [image]);
	const toggleDrawer = (open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		dispatch(setPresetsListState(open));
	};

	const applyPresetA = () => {
		dispatch(
			setPreset({
				// adjustments: {
				// 	crop: {
				// 		height: null,
				// 		ratio: 'original',
				// 		ratioTitleKey: 'original',
				// 		width: null,
				// 		x: 0,
				// 		y: 0,
				// 	},
				// 	isFlippedX: false,
				// 	isFlippedY: false,
				// 	rotation: 0,
				// },
				filter: 'Moon',
				finetunes: ['Brighten'],
				finetunesProps: { brightness: 0.1 },
			})
		);
	};

	const applyPresetB = () => {
		dispatch(
			setPreset({
				filter: 'Sepia',
				finetunes: ['Brighten'],
				finetunesProps: { brightness: 0.55 },
			})
		);
	};

	const applyPresetC = () => {
		dispatch(
			setPreset({
				adjustments: {
					crop: {
						isFlippedX: false,
						isFlippedY: false,
						ratio: 0.84211,
						ratioFolderKey: 'socialMedia',
						ratioGroupKey: 'twitter',
						ratioTitleKey: 'profilePhoto',
						rotation: 0,
					},
				},
				annotations: {},
				filter: 'Sepia',
				finetunes: ['Brighten'],
				finetunesProps: { brightness: 0 },
				resize: { ratioUnlocked: true, manualChangeDisabled: false },
			})
		);
	};

	const list = (
		<List sx={{ width: '100%', minWidth: 350, display: 'flex', gap: '30px', flexDirection: 'column' }}>
			<ListItem
				secondaryAction={
					<Button onClick={applyPresetA} variant="contained" color="success">
						Apply
					</Button>
				}
			>
				<ListItemAvatar>
					<Image
						ref={imageRef}
						image={image}
						width={'50px'}
						height={'50px'}
					/>
					{/* <Avatar
						variant="square"
						alt={imageName}
						src={image}
					/> */}
				</ListItemAvatar>
				<ListItemText primary="Bright Moon" />
			</ListItem>
			<ListItem
				secondaryAction={
					<Button onClick={applyPresetB} variant="contained" color="success">
						Apply
					</Button>
				}
			>
				<ListItemAvatar>
					<Image
						image={"https://picsum.photos/id/237/200/300"}
						filters={[Konva.Filters[imageProps.filter]]}
						{...imageProps.finetunesProps}
					/>
				</ListItemAvatar>
				<ListItemText primary="Bright Sepia" />
			</ListItem>
			<ListItem
				secondaryAction={
					<Button onClick={applyPresetC} variant="contained" color="success">
						Apply
					</Button>
				}
			>
				<ListItemText primary="Sepia with Crop for Twitter" />
			</ListItem>
		</List>
	);

	return (
		<div>
			<Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
				<Toolbar />
				{list}
			</Drawer>
		</div>
	);
}

export default PresetsList;
