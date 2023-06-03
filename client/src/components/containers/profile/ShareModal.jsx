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
	EmailShareButton,
	TelegramShareButton,
	RedditShareButton,
	TwitterShareButton,
	TumblrShareButton,
	ViberShareButton,
	WhatsappShareButton,
	FacebookIcon,
	EmailIcon,
	TelegramIcon,
	RedditIcon,
	TwitterIcon,
	TumblrIcon,
	ViberIcon,
	WhatsappIcon,
} from 'react-share';

const ShareModal = ({ open, setOpen, imgSrc }) => {
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{'Share this image'}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					You can share this image with your friends through this social medias.
				</DialogContentText>
				<div
					style={{
						display: 'flex',
						justifyContent: 'start',
						gap: '10px',
						marginTop: '10px',
					}}
				>
					<FacebookShareButton url={imgSrc} quote={'Created with Dive'}>
						<FacebookIcon size={48} />
					</FacebookShareButton>
					<TelegramShareButton url={imgSrc} title={'Created with Dive'}>
						<TelegramIcon size={48} />
					</TelegramShareButton>
					<TwitterShareButton url={imgSrc} title={'Created with Dive'}>
						<TwitterIcon size={48} />
					</TwitterShareButton>
					<RedditShareButton url={imgSrc} title={'Created with Dive'}>
						<RedditIcon size={48} />
					</RedditShareButton>
					<ViberShareButton url={imgSrc} title={'Created with Dive'}>
						<ViberIcon size={48} />
					</ViberShareButton>
					<WhatsappShareButton url={imgSrc} title={'Created with Dive'}>
						<WhatsappIcon size={48} />
					</WhatsappShareButton>
					<TumblrShareButton url={imgSrc} title={'Created with Dive'}>
						<TumblrIcon size={48} />
					</TumblrShareButton>
					<EmailShareButton url={imgSrc} subject={'Created with Dive'}>
						<EmailIcon size={48} />
					</EmailShareButton>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ShareModal;
