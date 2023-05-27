import { useSelector } from 'react-redux';
import {
	selectCurrentToken,
	selectCurrentUser,
} from '../features/auth/authSlice';

const useAuth = () => {
	const token = useSelector(selectCurrentToken);
	const user = useSelector(selectCurrentUser);

	let isAuth = false;

	if (token && user) {
		return {
			id: user.id,
			name: user.name,
			surname: user.surname,
			email: user.email,
			isAuth: true,
		};
	}

	return {
		id: '',
		name: '',
		surname: '',
		email: '',
		isAuth,
	};
};

export default useAuth;
