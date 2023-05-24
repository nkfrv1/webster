import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import {
	FacebookShareButton,
	TwitterShareButton,
	FacebookIcon,
	TwitterIcon,
} from 'react-share';

const ShareModal = ({ open, handleClose }) => {
	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">Share you image</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						You can share your image with your friends through different social
						media.
					</DialogContentText>
					<FacebookShareButton url="https://picsum.photos/200/300">
						<FacebookIcon />
					</FacebookShareButton>
					<TwitterShareButton url="https://picsum.photos/200/300">
						<TwitterIcon />
					</TwitterShareButton>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default ShareModal;
