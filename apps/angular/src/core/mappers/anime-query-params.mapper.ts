import { Injectable } from '@angular/core';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { DEFAULT_PAGINATION } from '@js-camp/core/models/default-pagination';
import { StrictOmit } from '@js-camp/core/utils/types/strict-omit';

/** Anime query params. */
export type AnimeQueryParams = Partial<
StrictOmit<AnimeFilterParams.Combined, 'pageNumber' | 'pageSize'> & {

	/** Page number query param. */
	readonly pageNumber: string | null;

	/** Page size query param. */
	readonly pageSize: string | null;
}
>;

/** Service for handling URL query params. */
@Injectable({
	providedIn: 'root',
})
export class AnimeQueryParamsMapper {
	/**
	 * Map query params to filter params.
	 * @param queryParams Query params.
	 */
	public toFilterParams(queryParams: AnimeQueryParams): AnimeFilterParams.Combined {
		return {
			type: queryParams.type ?? null,
			pageNumber: queryParams.pageNumber ? Number(queryParams.pageNumber) : DEFAULT_PAGINATION.pageNumber,
			pageSize: queryParams.pageSize ? Number(queryParams.pageSize) : DEFAULT_PAGINATION.pageSize,
			search: queryParams.search ?? null,
			sortField: queryParams.sortField ?? null,
			sortDirection: queryParams.sortDirection ?? null,
		};
	}

	/**
	 * Map filter params to query params.
	 * @param filterParams Filter params.
	 */
	public toQueryParams(filterParams: Partial<AnimeFilterParams.Combined>): AnimeQueryParams {
		return {
			type: filterParams.type ?? null,
			pageNumber:
				filterParams.pageNumber != null && filterParams.pageNumber >= 0 ? filterParams.pageNumber.toString() : null,
			pageSize: filterParams.pageSize != null ? filterParams.pageSize.toString() : null,
			search: filterParams.search ?? null,
			sortField: filterParams.sortField && filterParams.sortDirection ? filterParams.sortField : null,
			sortDirection: filterParams.sortDirection ?? null,
		};
	}
}
