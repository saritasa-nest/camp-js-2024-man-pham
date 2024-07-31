import { Injectable, inject } from '@angular/core';

import { AnimeQueryParamsMapper2 } from '@js-camp/core/mappers/anime-query-params.mapper';

import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

import { QueryParamsService } from './query-params.service';

/** Jobs query params service. */
@Injectable({ providedIn: 'root' })
export class JobsQueryParamsService {

	private readonly animeQueryParams = inject(AnimeQueryParamsMapper2);

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
		return this.queryParamsService.appendParamsAndResetPageNumber(queryParams);
	}
}
