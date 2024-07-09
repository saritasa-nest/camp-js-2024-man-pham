import { Genre } from '@js-camp/core/models/genre';

/** Genres state. */
export type GenresState = {

	/** Genres list. */
	readonly genres: Genre[];

	/** Error. */
	readonly error?: string;

	/** Whether the genres are loading or not. */
	readonly isLoading: boolean;
};

/**
 * Initial state for the genres slice.
 *
 * Represents the initial state shape for managing genres,
 * including loading status and an empty array of genres.
 *
 * @type {GenresState}
 */
export const initialState: GenresState = {
	isLoading: false,
	genres: [],
};
