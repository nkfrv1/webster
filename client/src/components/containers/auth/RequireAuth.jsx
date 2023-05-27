import { useLocation, Navigate, Outlet, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
	const location = useLocation();
	const { isAuth } = useAuth();

	const content = isAuth ? (
		<Outlet />
	) : (
		<Navigate to="/auth#sign-in" state={{ from: location }} />
	);

	return content;
};

export default RequireAuth;
