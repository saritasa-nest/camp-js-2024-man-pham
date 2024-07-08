import { createSlice } from '@reduxjs/toolkit';

import { fetchGenres } from './dispatchers';
import { initialState } from './state';

/**
 * Redux slice for managing genres state.
 *
 * Manages state related to genres including loading status, fetched data, and error handling.
 * Uses Redux Toolkit's createSlice utility for defining reducers and extra reducers.
 *
 * @constant
 */
export const genresSlice = createSlice({
	name: 'genres',
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(fetchGenres.pending, state => {
				state.isLoading = true;
			})
			.addCase(fetchGenres.fulfilled, (state, action) => {
				state.genres = action.payload;
				state.isLoading = false;
			})
			.addCase(fetchGenres.rejected, (state, action) => {
				if (action.error.message) {
					state.error = action.error.message;
				}
				state.isLoading = false;
			}),
});
