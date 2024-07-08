import { createAsyncThunk } from '@reduxjs/toolkit';

import { GenresService } from '../../api/services/genreService';

/**
 * Redux thunk action creator for fetching genres asynchronously.
 *
 * This thunk action dispatches actions to fetch genres from the server and handles loading, success,
 * and error states using Redux Toolkit's createAsyncThunk utility.
 *
 * @constant
 */
export const fetchGenres = createAsyncThunk('genres/fetch', () => GenresService.fetchGenres());
