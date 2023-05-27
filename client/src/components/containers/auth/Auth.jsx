import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
	useRegisterMutation,
	useLoginMutation,
} from '../../../features/auth/authApiSlice';
import { setCredentials } from '../../../features/auth/authSlice';

import SignUp from './signUp';
import SignIn from './signIn';
import './auth.scss';

function Auth() {
	const dispatch = useDispatch();
	const [hash, setHash] = useState(window.location.hash || '#sign-in');
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const navigate = useNavigate();
	const [register, { isError: registerError }] = useRegisterMutation();
	const [login, { isError: loginError }] = useLoginMutation();

	async function handleLogin(email, password) {
		try {
			const credentials = {
				email: email,
				password: password,
			};
			const userData = await login(credentials).unwrap();
			if (!loginError) {
				dispatch(setCredentials(userData));
				navigate('/');
			}
		} catch (error) {
			setError(true);
			setErrorMessage(error.data.message);
		}
	}

	async function handleRegister(name, surname, email, password, confirmation) {
		if (
			name !== '' &&
			password !== '' &&
			surname !== '' &&
			email !== '' &&
			confirmation == password
		) {
			try {
				const user = {
					name: name,
					surname: surname,
					email: email,
					password: password,
					confirmation: confirmation,
				};
				await register(user).unwrap();
				if (!registerError) {
					navigate('/auth#sign-in');
				}
			} catch (error) {
				setError(true);
				setErrorMessage(error.data.message);
			}
		}
	}

	function handleHashChange() {
		setHash(window.location.hash);
	}

	useEffect(() => {
		handleHashChange();
		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
	}, []);

	return (
		<div className="auth-container">
			{hash === '#sign-in' ? (
				<SignIn
					onSignIn={handleLogin}
					error={error}
					errorMessage={errorMessage}
				/>
			) : hash === '#sign-up' ? (
				<SignUp
					onSignUp={handleRegister}
					error={error}
					errorMessage={errorMessage}
				/>
			) : null}
		</div>
	);
}

export default Auth;
