import { apiSlice } from '../../app/api/apiSlice';

export const imageApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		saveImage: builder.mutation({
			query: (credentials) => {
				const formData = new FormData();
				formData.append('image', credentials.file, credentials.file.name);
				formData.append('name', credentials.name);
				formData.append('userId', credentials.userId);

				const config = {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				};

				return {
					url: `/images`,
					method: 'POST',
					body: formData,
					config,
				};
			},
		}),
		getImages: builder.query({
			query: () => ({
				url: '/images',
				method: 'GET',
			}),
		}),
		getImage: builder.query({
			query: (id) => ({
				url: `/images/${id}`,
				method: 'GET',
			}),
		}),
		patchImage: builder.mutation({
			query: (credentials) => {
				const formData = new FormData();
				formData.append('image', credentials.file, credentials.file.name);

				const config = {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				};

				return {
					url: `/images/${credentials.id}`,
					method: 'POST',
					body: formData,
					config,
				};
			},
		}),
		deleteImage: builder.mutation({
			query: (id) => ({
				url: `/images/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useSaveImageMutation,
	useGetImagesQuery,
	useGetImageQuery,
	usePatchImageMutation,
	useDeleteImageMutation,
} = imageApiSlice;
