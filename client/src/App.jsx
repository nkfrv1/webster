import { Routes, Route } from 'react-router-dom';

import './App.scss';
import './scss/editor.scss';

import ImageEditor from './components/containers/editor/ImageEditor';
import Layout from './components/containers/layout/Layout';
import Auth from './components/containers/auth/Auth';
import UserProfile from './components/containers/profile/Profile';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				{/* Public Routes*/}
				<Route index element={<ImageEditor />} />
				<Route path="auth" element={<Auth />} />
				<Route path="profile" element={<UserProfile />} />

				{/* Private Routes */}
				{/* <Route element={<RequireAuth allowedRoles={} />}>*/}
				{/*	</Route> */}
			</Route>
		</Routes>
	);
}

export default App;
