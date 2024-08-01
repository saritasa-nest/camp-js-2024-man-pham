import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/app-url';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeQueryParams } from '@js-camp/core/models/query-params';

import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

import { AnimeHttpParamsService } from './anime-http-params.service';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly paginationMapper = inject(PaginationMapper);

	private readonly httpParamsService = inject(AnimeHttpParamsService);

	private fetchAnimeWithParams(queryParams: AnimeQueryParams.Combined): Observable<Pagination<Anime>> {
		const params = this.httpParamsService.getHttpParams(queryParams);
		return this.httpClient.get<PaginationDto<AnimeDto>>(this.appUrlsConfig.anime.list, { params }).pipe(
			map(responseDto => this.paginationMapper.mapPaginationFromDto(responseDto, this.animeMapper)),
		);
	}

	/**
	 * Get the anime page.
	 * @param filters$ Filter params observable.
	 * @returns The anime page.
	 */
	public getAnime2(filters$: Observable<AnimeFilterParams.Combined>): Observable<Pagination<Anime>> {
		return filters$.pipe(
			switchMap(queryParams => this.fetchAnimeWithParams(queryParams)),
		);
	}
}
