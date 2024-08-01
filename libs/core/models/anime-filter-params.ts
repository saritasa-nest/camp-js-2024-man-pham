import { AnimeSortFields } from './anime-sort-fields';
import { AnimeType } from './anime-type';
import { SortDirection } from './sort-direction';

/** Anime query params . */
export namespace AnimeFilterParams {

	/** Search. */
	export type Search = {

		/** Search filter. */
		search: string | null;
	};

	/** Pagination. */
	export type Pagination = {

		/** Offset. */
		pageNumber: number | null;

		/** Page size. */
		pageSize: number | null;
	};

	/** Sort. */
	export type Sort = {

		/** Field. */
		sortField: AnimeSortFields | null;

		/** Direction. */
		sortDirection: SortDirection | null;
	};

	/** Anime Type. */
	export type Type = {

		/** Order. */
		type: AnimeType | null;
	};

	/** Anime query params. */
	export type Combined = Search & Pagination & Sort & Type;
}
