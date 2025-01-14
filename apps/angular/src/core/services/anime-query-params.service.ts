import { Injectable, inject } from '@angular/core';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { DEFAULT_PAGINATION } from '@js-camp/core/models/default-pagination';

import { AnimeQueryParamsMapper } from '../mappers/anime-query-params.mapper';

import { QueryParamsService } from './query-params.service';

/** Anime query params service. */
@Injectable({ providedIn: 'root' })
export class AnimeQueryParamsService {
	private readonly animeQueryParamsMapper = inject(AnimeQueryParamsMapper);

	private readonly queryParamsService = inject(QueryParamsService);

	/**
	 * Append query params.
	 * @param params Anime filter params.
	 */
	public append(params: Partial<AnimeFilterParams.Combined>): void {
		const queryParams = this.animeQueryParamsMapper.toQueryParams(params);
		this.queryParamsService.append(queryParams);
	}

	/**
	 * Append query params and reset page number params to the URL.
	 * @param params Anime filter params to append.
	 */
	public appendParamsAndResetPageNumber(params: Partial<AnimeFilterParams.Combined>): void {
		const queryParams = this.animeQueryParamsMapper.toQueryParams({ ...params, pageNumber: DEFAULT_PAGINATION.pageNumber });
		this.queryParamsService.append(queryParams);
	}
}
