import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';

import Header from './Header';

const Layout = () => {
	return (
		<Box sx={{height: '100%'}}>
			<Header />
			{/* <CustomDrawer /> */}
			<Box component="main" sx={{ flexGrow: 1, marginTop: '64px', height: 'calc(100% - 64px)'}}>
				{/* <Toolbar /> */}
				<Outlet />
			</Box>
		</Box>
	);
};

export default Layout;
