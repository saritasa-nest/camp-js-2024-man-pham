import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/app-url';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';
import { AnimeQueryParams } from '@js-camp/core/models/query-params';

import { HttpParamsService } from './http-params.service';
import { UrlParamsService } from './url-params.service';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly paginationMapper = inject(PaginationMapper);

	private readonly httpParamsService = inject(HttpParamsService);

	private readonly urlParamsService = inject(UrlParamsService);

	public readonly pageNumberSubject$ = new BehaviorSubject<number | null>(1);

	public readonly pageSizeSubject$ = new BehaviorSubject<number | null>(10);

	private fetchAnimeWithParams(queryParams: AnimeQueryParams.Combined): Observable<Pagination<Anime>> {
		this.pageNumberSubject$.next(queryParams.pageNumber);
		this.pageSizeSubject$.next(queryParams.pageSize);

		const params = this.httpParamsService.getHttpParams(queryParams);
		return this.httpClient.get<PaginationDto<AnimeDto>>(this.appUrlsConfig.anime.list, { params }).pipe(
			map(responseDto => this.paginationMapper.mapPaginationFromDto(responseDto, this.animeMapper)),
		);
	}

	/**
	 * Get the anime page.
	 * @returns The anime page.
	 */
	public getAnime(): Observable<Pagination<Anime>> {
		return this.urlParamsService.getCombinedQueryParams().pipe(
			switchMap(queryParams => this.fetchAnimeWithParams(queryParams)),
		);
	}

	/**
	 * Update the url with pagination params.
	 * @param pageParams The pagination query params.
	 */
	public updatePageParams(pageParams: AnimeQueryParams.Pagination): void {
		const newParams: AnimeQueryParams.Combined = {
			...this.urlParamsService.getCurrentParams(),
			...pageParams,
		};

		this.urlParamsService.setCombinedQueryParams(newParams);
	}

}
