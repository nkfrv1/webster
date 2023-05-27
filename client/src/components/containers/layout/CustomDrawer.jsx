import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	Drawer,
	List,
	Divider,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	IconButton,
	Button,
} from '@mui/material';

import '../../../App.scss';
import UploadFileSharpIcon from '@mui/icons-material/UploadFileSharp';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import GetAppSharpIcon from '@mui/icons-material/GetAppSharp';
import PublishSharpIcon from '@mui/icons-material/PublishSharp';
import ShareSharpIcon from '@mui/icons-material/ShareSharp';
import TelegramIcon from '@mui/icons-material/Telegram';

import {
	setImageData,
	setEditorState,
	setShareImage,
	selectShowEditor,
} from '../../../features/image/imageSlice';

import {
	setCreatePreset,
	setPresetsListState,
} from '../../../features/preset/presetSlice';

const drawerWidth = 180;
function CustomDrawer() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isEditorOpen = useSelector(selectShowEditor);
	let imageSrc = '';
	let imageName = '';
	let imageType = '';

	/**
	 * This function creates an input element that allows the user to select a file, reads the file using
	 * FileReader, and sets the image source and editor visibility based on the file data.
	 */
	const handleFile = () => {
		let input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/png, image/jpg, image/jpeg, image/webp, image/gif';
		input.onchange = () => {
			const files = Array.from(input.files);
			// dispatch(setImageFile(files[0]));
			imageName = files[0].name.split('.')[0];
			imageType = files[0].type.split('/')[1];
			dispatch(setEditorState(false));
			const reader = new FileReader();

			reader.onload = () => {
				imageSrc = reader.result;
				dispatch(setEditorState(true));
				dispatch(setImageData({ imageSrc, imageName, imageType }));
				navigate('/editor');
			};

			reader.readAsDataURL(files[0]);
		};
		input.click();
	};

	const handleClose = () => {
		setOpenShare(false);
	};
	const handleBot = () => {
		const telegramBotUrl = "https://t.me/DiveDesignBot";

		// Redirect the user to the Telegram bot URL.
		window.location.href = telegramBotUrl;
	}
	const handleShare = () => {
		dispatch(setShareImage(true));
	};

	const handleCreate = () => {
		dispatch(setCreatePreset(true));
	};

	return (
		<Drawer
			className="drawer-wr"
			variant="permanent"
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				[`& .MuiDrawer-paper`]: {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
			}}
		>
			<Toolbar />
			<Box sx={{ overflow: 'auto' }}>
				<List>
					<ListItem key="upload" disablePadding>
						<ListItemButton onClick={handleFile}>
							<ListItemIcon>
								<UploadFileSharpIcon />
							</ListItemIcon>
							<ListItemText primary={'Upload'} />
						</ListItemButton>
					</ListItem>
					<ListItem key="presets" disablePadding>
						<ListItemButton
							disabled={!isEditorOpen}
							onClick={() => dispatch(setPresetsListState(true))}
						>
							<ListItemIcon>
								<SettingsSuggestIcon />
							</ListItemIcon>
							<ListItemText primary={'Presets'} />
						</ListItemButton>
					</ListItem>
					<ListItem key="create-preset" disablePadding>
						<ListItemButton disabled={!isEditorOpen} onClick={handleCreate}>
							<ListItemIcon>
								<AddCircleOutlineSharpIcon />
							</ListItemIcon>
							<ListItemText primary={'Create Preset'} />
						</ListItemButton>
					</ListItem>
					<ListItem key="export-presets" disablePadding>
						<ListItemButton disabled={!isEditorOpen}>
							<ListItemIcon>
								<PublishSharpIcon />
							</ListItemIcon>
							<ListItemText primary={'Export Presets'} />
						</ListItemButton>
					</ListItem>
					<ListItem key="import-preset" disablePadding>
						<ListItemButton disabled={!isEditorOpen}>
							<ListItemIcon>
								<GetAppSharpIcon />
							</ListItemIcon>
							<ListItemText primary={'Import Presets'} />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
				<ListItem key="share" disablePadding>
					<ListItemButton disabled={!isEditorOpen} onClick={handleShare}>
						<ListItemIcon>
							<ShareSharpIcon />
						</ListItemIcon>
						<ListItemText primary={'Share Image'} />
					</ListItemButton>
				</ListItem>
				<ListItem key="bot" disablePadding>
					<ListItemButton onClick={handleBot}>
						<ListItemIcon>
							<TelegramIcon />
						</ListItemIcon>
						<ListItemText primary={'Telegram Bot'} />
					</ListItemButton>
				</ListItem>
			</Box>
		</Drawer>
	);
}

export default CustomDrawer;
