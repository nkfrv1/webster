import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilerobotImageEditor from 'react-filerobot-image-editor';

import {
	Drawer,
	Button,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Toolbar,
} from '@mui/material';

import {
	setPreset,
	setPresetsListState,
	selectPresetsListState,
} from '../../../features/preset/presetSlice';

import { selectImageSrc } from '../../../features/image/imageSlice';

import '../../../scss/editor.scss';

function PresetsList() {
	const dispatch = useDispatch();
	const open = useSelector(selectPresetsListState);
	const imageUrl = useSelector(selectImageSrc);
	const [preset1, setPreset1] = useState({
		filter: 'Moon',
		finetunes: ['Brighten'],
		finetunesProps: { brightness: 0.1 },
	});
	const [preset2, setPreset2] = useState({
		filter: 'Sepia',
		finetunes: ['Brighten'],
		finetunesProps: { brightness: 0.55 },
	});
	const [preset3, setPreset3] = useState({
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
	});

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
		<List className="preset_list-wr">
			<ListItem>
				<ListItemAvatar>
					<div className="preview_image-wr">
						<FilerobotImageEditor
							source={imageUrl}
							loadableDesignState={preset1}
							showCanvasOnly={true}
							disableZooming={true}
							defaultToolId=""
						/>
					</div>
				</ListItemAvatar>
				<ListItemText primary="Bright Moon" />
				<Button onClick={applyPresetA} variant="contained" color="success">
					Apply
				</Button>
			</ListItem>

			<ListItem>
				<ListItemAvatar>
					<div className="preview_image-wr">
						<FilerobotImageEditor
							source={imageUrl}
							loadableDesignState={preset2}
							showCanvasOnly={true}
							disableZooming={true}
							defaultToolId=""
						/>
					</div>
				</ListItemAvatar>
				<ListItemText primary="Bright Sepia" />
				<Button onClick={applyPresetB} variant="contained" color="success">
					Apply
				</Button>
			</ListItem>

			<ListItem>
				<ListItemAvatar>
					<div className="preview_image-wr">
						<FilerobotImageEditor
							source={imageUrl}
							loadableDesignState={preset3}
							showCanvasOnly={true}
							disableZooming={true}
							defaultToolId=""
						/>
					</div>
				</ListItemAvatar>
				<ListItemText primary="Sepia with Crop for Twitter" />
				<Button onClick={applyPresetC} variant="contained" color="success">
					Apply
				</Button>
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
