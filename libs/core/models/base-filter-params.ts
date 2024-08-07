/** Base filter params. */
export namespace BaseFilterParams {

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

	/** Combined params. */
	export type Combined = Search & Pagination;
}
