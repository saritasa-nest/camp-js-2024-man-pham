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
	export type AnimeType = {

		/** Order. */
		readonly animeType: string;
	};

	/** Anime query params dto. */
	export type Combined = Search & Pagination & Sort & AnimeType;
}
