import { apiSlice } from '../../app/api/apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createUser: builder.mutation({
			query: (credentials) => ({
				url: '/users',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		getUsers: builder.query({
			query: () => ({
				url: '/users',
				method: 'GET',
			}),
		}),
		getUser: builder.query({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'GET',
			}),
		}),
		patchUser: builder.mutation({
			query: (credentials) => ({
				url: `/users/${credentials.id}`,
				method: 'PATCH',
				body: credentials.body,
			}),
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/users/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useCreateUserMutation,
	useGetUsersQuery,
	useGetUserQuery,
	usePatchUserMutation,
	useDeleteUserMutation,
} = userApiSlice;
