import { AnimeType } from './anime-type';

/** Anime query params . */
export namespace AnimeQueryParams {

	/** Search. */
	export type Search = {

		/** Search filter. */
		readonly search: string;
	};

	/** Pagination. */
	export type Pagination = {

		/** Offset. */
		readonly pageNumber: number;

		/** Page size. */
		readonly pageSize: number;
	};

	/** Sort. */
	export type Sort = {

		/** Order. */
		readonly sortFields: string[];
	};

	/** Anime Type. */
	export type Type = {

		/** Order. */
		readonly type: string;
	};

	/** Anime query params dto. */
	export type Combined = Search & Pagination & Sort & Type;
}
