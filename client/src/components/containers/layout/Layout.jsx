import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import CustomDrawer from './CustomDrawer';
import Header from './Header';

const Layout = () => {
	return (
		<Box>
			<Header />
			<CustomDrawer />
			<Box component="main" sx={{ flexGrow: 1, m: '0 0 0 179px' }}>
				<Toolbar />
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;
