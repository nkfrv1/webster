import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FilerobotImageEditor from 'filerobot-image-editor';
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
	setPresets,
	setSelectedPreset,
	setPresetsListState,
	selectPresets,
	selectPresetsListState,
	deletePreset,
} from '../../../features/preset/presetSlice';

import { selectImageSrc } from '../../../features/image/imageSlice';

import '../../../scss/editor.scss';
import defaultPresets from '../../../data/presets.json';

function PresetsList() {
	const dispatch = useDispatch();
	const open = useSelector(selectPresetsListState);
	const imageSrc = useSelector(selectImageSrc);
	const presets = useSelector(selectPresets);

	useEffect(() => {
		if (!localStorage.getItem('presets')) {
			localStorage.setItem('presets', JSON.stringify(defaultPresets));
		}
		const storedPresets = localStorage.getItem('presets');
		if (storedPresets) {
			dispatch(setPresets(JSON.parse(storedPresets)));
		}
	}, []);

	const renderPreview = (config, index) => {
		if (open) {
			setTimeout(() => {
				const filerobotImageEditor = new FilerobotImageEditor(
					document.querySelector(`#preview_image_${index}`),
					config
				);

				filerobotImageEditor.render({
					onClose: (closingReason) => {
						console.log('Closing reason', closingReason);
						filerobotImageEditor.terminate();
					},
				});
			});
		}
	};

	const toggleDrawer = (open) => (event) => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		dispatch(setPresetsListState(open));
	};

	const handleApply = (preset) => {
		dispatch(setPresetsListState(false));
		dispatch(setSelectedPreset(preset));
	};

	const handleDeletePreset = (id) => {
		dispatch(deletePreset(id));
	};

	const list = (
		<List className="preset_list-wr">
			{presets.map((preset, index) => (
				<ListItem key={preset.id}>
					<ListItemAvatar>
						<div className="preview_image-wr" id={`preview_image_${index}`}>
							{renderPreview(
								{
									source: imageSrc,
									loadableDesignState: preset.opts,
									showCanvasOnly: true,
									disableZooming: true,
									defaultToolId: '',
								},
								index
							)}
						</div>
					</ListItemAvatar>
					<ListItemText primary={preset.title} />
					<Button
						onClick={() => handleApply(preset.opts)}
						variant="contained"
						color="success"
					>
						Apply
					</Button>
					<Button
						onClick={() => handleDeletePreset(preset.id)}
						variant="contained"
						color="error"
					>
						delete
					</Button>
				</ListItem>
			))}
		</List>
	);

	return (
		<div>
			<Drawer
				anchor="right"
				className="presets_drawer"
				open={open}
				onClose={toggleDrawer(false)}
			>
				<Toolbar />
				{list}
			</Drawer>
		</div>
	);
}

export default PresetsList;
