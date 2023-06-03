import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

import usePersist from '../../../hooks/usePersist';
import { selectCurrentToken } from '../../../features/auth/authSlice';
import { useRefreshMutation } from '../../../features/auth/authApiSlice';

const PersistLogin = () => {
	const [persist] = usePersist();
	const token = useSelector(selectCurrentToken);

	const [refresh, { isLoading, isError, error }] = useRefreshMutation();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				await refresh();
			} catch (err) {
				console.error(err);
			}
		};

		if (!token && persist) verifyRefreshToken();

		// eslint-disable-next-line
	}, []);

	let content;
	if (!persist) {
		content = <Outlet />;
	} else if (isLoading) {
		<CircularProgress />;
	} else if (!isError) {
		content = <Outlet />;
	} else if (isError) {
		console.log(error?.data?.message);
		content = <Outlet />;
	}
	return content;
};

export default PersistLogin;
