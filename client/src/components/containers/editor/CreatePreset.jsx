import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CreatePreset = ({ open, setOpen, title, setTitle, setSubmit }) => {
	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = () => {
		setSubmit(true);
		setOpen(false);
	};
	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Create Preset</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Preset with current image setting will be created. To complete
						creation enter 'Title' for preset and enter Create
					</DialogContentText>
					<TextField
						id="title"
						label="Preset Title"
						variant="outlined"
						margin="dense"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						autoFocus
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSubmit}>Create</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default CreatePreset;
