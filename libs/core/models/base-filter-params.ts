/** Base filter params. */
export namespace BaseFilterParams {

	/** Search. */
	export type Search = {

		/** Search filter. */
		readonly search: string | null;
	};

	/** Pagination. */
	export type Pagination = {

		/** Offset. */
		readonly pageNumber: number | null;

		/** Page size. */
		readonly pageSize: number | null;
	};

	/** Combined params. */
	export type Combined = Search & Pagination;
}
