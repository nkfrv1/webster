import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	Box,
	AppBar,
	Toolbar,
	Typography,
	Divider,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material';
import { LoginSharp, LogoutSharp } from '@mui/icons-material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { useLogoutMutation } from '../../../features/auth/authApiSlice';
import useAuth from '../../../hooks/useAuth';
import '../../../scss/appbar.scss';

function Header() {
	const navigate = useNavigate();
	const { isAuth, name, surname } = useAuth();
	const [logout, { isSuccess: logoutSuccess }] = useLogoutMutation();

	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		handleClose();
		logout();
		if (logoutSuccess) {
			navigate('/');
		}
	};

	const handleNavigate = (path) => {
		handleClose();
		navigate(path);
	};

	return (
		<AppBar
			className="appbar-wr"
			position="fixed"
			elevation={0}
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Toolbar sx={{ dipslay: 'flex', justifyContent: 'space-between' }}>
				{/* <Typography variant="h6" noWrap component="div" sx={{cursor: 'pointer'}} onClick={()=>{navigate('/')}}>
					Dive
				
				</Typography> */}
				<img
					onClick={() => {
						navigate('/');
					}}
					src="logo/svg/logo-white-transparent.svg"
					className="logo"
				></img>
				<Box className="appbar-nav-btn">
					{isAuth ? (
						<>
							<Box
								sx={{
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								{name} {surname}
							</Box>
							<IconButton onClick={handleClick}>
								<MoreVertIcon />
							</IconButton>
							<Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
								<MenuItem onClick={() => handleNavigate('/profile')}>
									My Profile
								</MenuItem>
								<MenuItem onClick={() => handleNavigate('/editor')}>
									Editor
								</MenuItem>
								<Divider />
								<MenuItem onClick={handleLogout}>Logout</MenuItem>
							</Menu>
						</>
					) : (
						<>
							<Box
								sx={{
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
								onClick={() => {
									navigate('/auth#sign-in');
								}}
							>
								Login
								<IconButton>
									<LoginSharp />
								</IconButton>
							</Box>
							<Box
								sx={{
									cursor: 'pointer',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
								onClick={() => {
									navigate('/auth#sign-up');
								}}
							>
								Sign Up
								<IconButton>
									<LogoutSharp />
								</IconButton>
							</Box>
						</>
					)}
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
