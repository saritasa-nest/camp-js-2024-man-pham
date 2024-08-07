/** Base filter params DTO. */
export namespace BaseFilterParamsDto {

	/** Search. */
	export type Search = {

		/** Search filter. */
		readonly search?: string;
	};

	/** Pagination. */
	export type Pagination = {

		/** Offset. */
		readonly offset?: number;

		/** Page size. */
		readonly limit?: number;
	};

	/** Combined params. */
	export type Combined = Search & Pagination;
}
