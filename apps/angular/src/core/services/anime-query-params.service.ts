import { Injectable, inject } from '@angular/core';

import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/anime-query-params.mapper';

import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

import { DEFAULT_PAGINATION } from '@js-camp/core/contants/pagination';

import { QueryParamsService } from './query-params.service';

/** Jobs query params service. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsService {

	private readonly animeQueryParams = inject(AnimeQueryParamsMapper);

	private readonly queryParamsService = inject(QueryParamsService);

	/**
	 * Append query params.
	 * @param params Job filter params.
	 */
	public append(params: Partial<AnimeFilterParams.Combined>): void {
		const queryParams = this.animeQueryParams.toDto(params);
		this.queryParamsService.append(queryParams);
	}

	/**
	 * Append provide query params and reset page number params to the URL.
	 * @param params Job filter params to append.
	 */
	public appendParamsAndResetPageNumber(params: Partial<AnimeFilterParams.Combined>): void {
		const queryParams = this.animeQueryParams.toDto(params);
		return this.queryParamsService.appendParamsAndResetPageNumber(queryParams, DEFAULT_PAGINATION.pageNumber);
	}
}
