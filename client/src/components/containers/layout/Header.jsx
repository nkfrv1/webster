import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { LoginSharp, LogoutSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../../../scss/appbar.scss'
function Header() {
	const navigate = useNavigate()
	return (
		<AppBar
			className="appbar-wr"
			position="fixed"
			elevation={0}
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Toolbar sx={{ dipslay: 'flex', justifyContent: 'space-between' }}>
				<Typography variant="h6" noWrap component="div" sx={{cursor: 'pointer'}} onClick={()=>{navigate('/')}}>
					Webster the creator
				</Typography>
				<Box className="appbar-nav-btn">
					<Box sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={()=>{navigate('/auth#sign-in')}}>
						Login
						<IconButton>
							<LoginSharp />
						</IconButton>
					</Box>
					<Box sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center'}} onClick={()=>{navigate('/auth#sign-up')}}>
						Sign Up
						<IconButton>
							<LogoutSharp />
						</IconButton>
					</Box>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
