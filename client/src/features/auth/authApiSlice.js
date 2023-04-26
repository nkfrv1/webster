import { apiSlice } from '../../app/api/apiSlice';
import { setCredentials, logOut } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (credentials) => ({
				url: '/auth/register',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		login: builder.mutation({
			query: (credentials) => ({
				url: '/auth/login',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(logOut());
				} catch (err) {
					console.log(err);
				}
			},
		}),
		refresh: builder.mutation({
			query: () => ({
				url: '/auth/refresh',
				method: 'POST',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setCredentials(data));
				} catch (err) {
					console.log(err);
				}
			},
		}),
		reset: builder.mutation({
			query: (credentials) => ({
				url: '/auth/reset',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useRefreshMutation,
	useResetMutation,
} = authApiSlice;