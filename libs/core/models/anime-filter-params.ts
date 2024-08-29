import { AnimeSortFields } from './anime-sort-fields';
import { AnimeType } from './anime-type';
import { BaseFilterParams } from './base-filter-params';
import { SortDirection } from './sort-direction';

/** Anime query params . */
export namespace AnimeFilterParams {

	/** Sort. */
	export type Sort = {

		/** Field. */
		readonly sortField: AnimeSortFields | null;

		/** Direction. */
		readonly sortDirection: SortDirection | null;
	};

	/** Anime Type. */
	export type Type = {

		/** Order. */
		readonly type: AnimeType | null;
	};

	/** Anime query params. */
	export type Combined = BaseFilterParams.Combined & Sort & Type;
}
