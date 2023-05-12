import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google'
import { store } from './app/store';
import App from './App.jsx';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_CLIENT_ID}>
			<BrowserRouter>
				<Routes>
					<Route path="/*" element={<App />} />
				</Routes>
			</BrowserRouter>
		</GoogleOAuthProvider>
	</Provider>
);
