import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Drawer,
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemButton,
	Toolbar,
} from '@mui/material';

import {
	setPresetsListState,
	selectPresetsListState,
	setPreset,
} from '../../../features/preset/presetSlice';

function PresetsList() {
	const dispatch = useDispatch();
	const open = useSelector(selectPresetsListState);

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
		<List sx={{ width: '100%', minWidth: 350 }}>
			<ListItem
				secondaryAction={
					<Button onClick={applyPresetA} variant="contained" color="success">
						Apply
					</Button>
				}
			>
				<ListItemText primary="Bright Moon" />
			</ListItem>
			<ListItem
				secondaryAction={
					<Button onClick={applyPresetB} variant="contained" color="success">
						Apply
					</Button>
				}
			>
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
