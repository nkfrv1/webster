import { Routes, Route } from 'react-router-dom';

import './App.scss';
import './scss/editor.scss';

import { ThemeProvider } from '@mui/material';
import theme from './components/containers/theme/theme';

import ImageEditor from './components/containers/editor/ImageEditor';
import Layout from './components/containers/layout/Layout';
import Auth from './components/containers/auth/Auth';
import UserProfile from './components/containers/profile/Profile';
import Landing from './components/containers/landing/Landing';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* Public Routes*/}
					<Route index element={<Landing />} />
					<Route path="auth" element={<Auth />} />
					<Route path="profile" element={<UserProfile />} />
					<Route path="editor" element={<ImageEditor />} />
					{/* Private Routes */}
					{/* <Route element={<RequireAuth allowedRoles={} />}>*/}
					{/*	</Route> */}
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
