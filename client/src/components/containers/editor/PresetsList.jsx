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
	setPreset,
	setPresetsListState,
	selectPresetsListState,
} from '../../../features/preset/presetSlice';

import { selectImageSrc } from '../../../features/image/imageSlice';

import '../../../scss/editor.scss';

function PresetsList() {
	const dispatch = useDispatch();
	const open = useSelector(selectPresetsListState);
	const imageSrc = useSelector(selectImageSrc);
	const presets = [
		{
			title: 'Bright Moon',
			opts: {
				filter: 'Moon',
				finetunes: ['Brighten'],
				finetunesProps: { brightness: 0.1 },
			},
		},
		{
			title: 'Bright Sepia',
			opts: {
				filter: 'Sepia',
				finetunes: ['Brighten'],
				finetunesProps: { brightness: 0.55 },
			},
		},
		{
			title: 'Black&White',
			opts: {
				filter: 'BlackAndWhite',
			},
		},
		{
			title: 'Orignal',
			opts: {
				filter: null,
			},
		},
		{
			title: 'Sepia with Crop for Twitter',
			opts: {
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
			},
		},
	];

	const drawPreview = (config, index) => {
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
		dispatch(setPreset(preset));
	};

	const list = (
		<List className="preset_list-wr">
			{presets.map((preset, index) => (
				<ListItem key={preset.title}>
					<ListItemAvatar>
						<div className="preview_image-wr" id={`preview_image_${index}`}>
							{drawPreview(
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
