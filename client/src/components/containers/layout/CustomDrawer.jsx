import { useDispatch } from 'react-redux';
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

import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import UploadFileSharpIcon from '@mui/icons-material/UploadFileSharp';
import {
	setImageData,
	setEditorState,
} from '../../../features/image/imageSlice';

const drawerWidth = 180;
function CustomDrawer({ onImageUpload }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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

		input.onchange = () => {
			const files = Array.from(input.files);
			imageName = files[0].name.split('.')[0];
			imageType = files[0].type.split('/')[1];
			dispatch(setEditorState(false));
			const reader = new FileReader();

			reader.onload = () => {
				imageSrc = reader.result;
				dispatch(setEditorState(true));
				dispatch(setImageData({ imageSrc, imageName, imageType }));
				navigate('/');
			};

			reader.readAsDataURL(files[0]);
		};
		input.click();
	};

	return (
		<Drawer
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
					{/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))} */}
					<ListItem key="upload" disablePadding>
						<ListItemButton onClick={handleFile}>
							<ListItemIcon>
								<UploadFileSharpIcon />
							</ListItemIcon>
							<ListItemText primary={'Upload'} />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Box>
		</Drawer>
	);
}

export default CustomDrawer;
