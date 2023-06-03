import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import { useDeleteImageMutation } from '../../../features/image/imageApiSlice';

const DeleteModal = ({ open, setOpen, imageId }) => {
	const [deleteImage, { isError }] = useDeleteImageMutation();
	const handleClose = () => {
		setOpen(false);
	};
	const handleDelete = async () => {
		await deleteImage(imageId).unwrap();
		if (!isError) {
			setOpen(false);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{'Are you sure you want to delete this image?'}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					This image will be permanently deleted
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
				<Button onClick={handleDelete}>Delete</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteModal;
