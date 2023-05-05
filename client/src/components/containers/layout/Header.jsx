import React from 'react';
import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { LoginSharp, LogoutSharp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
function Header() {
	return (
		<AppBar
			className="appbar-wr"
			position="fixed"
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Toolbar sx={{ dipslay: 'flex', justifyContent: 'space-between' }}>
				<Typography variant="h6" noWrap component="div">
					Webster the creator
				</Typography>
				<Box className="appbar-nav-btn">
					<Link to="auth#sign-in">
						Login
						<IconButton>
							<LoginSharp />
						</IconButton>
					</Link>
					<Link to="auth#sign-up">
						Sign Up
						<IconButton>
							<LogoutSharp />
						</IconButton>
					</Link>
				</Box>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
