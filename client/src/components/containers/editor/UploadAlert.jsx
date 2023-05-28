import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';

const UploadAlert = ({ open, setOpen, text, severity }) => {
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	return (
		<Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
				{text}
			</Alert>
		</Snackbar>
	);
};

export default UploadAlert;
