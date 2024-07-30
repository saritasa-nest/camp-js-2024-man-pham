
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, distinctUntilChanged, first, map, Observable, switchMap, tap } from 'rxjs';
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

	private readonly queryParamsSubject$ = new BehaviorSubject<AnimeQueryParams.Combined>({
		pageNumber: null,
		pageSize: null,
		search: null,
		sortFields: null,
		type: null,
	});

	/** Page number observable. */
	public readonly pageNumber$ = this.queryParamsSubject$.pipe(
		map(params => params.pageNumber),
		distinctUntilChanged(),
	);

	/** Page size observable. */
	public readonly pageSize$ = this.queryParamsSubject$.pipe(
		map(params => params.pageSize),
		distinctUntilChanged(),
	);

	/** Search observable. */
	public readonly search$ = this.queryParamsSubject$.pipe(
		map(params => params.search),
		distinctUntilChanged(),
	);

	/**
	 * Update query params.
	 * @param newParams The new query params.
	 */
	private updateQueryParams(newParams: Partial<AnimeQueryParams.Combined>): void {
		this.queryParamsSubject$.pipe(
			first(),
			tap(currentParams => {
				this.queryParamsSubject$.next({ ...currentParams, ...newParams });
			}),
		).subscribe();
	}

	private fetchAnimeWithParams(queryParams: AnimeQueryParams.Combined): Observable<Pagination<Anime>> {
		this.updateQueryParams(queryParams);

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

	private updateUrlParams(newParams: Partial<AnimeQueryParams.Combined>, resetPagination = false): void {
		const currentParams = this.urlParamsService.getCurrentParams();

		const combinedParams: AnimeQueryParams.Combined = {
			...currentParams,
			...(resetPagination ? { pageNumber: null, pageSize: null } : {}),
			...newParams,
		};

		this.urlParamsService.setCombinedQueryParams(combinedParams);
	}

	/**
	 * Update the url with pagination params.
	 * @param pageParams The pagination query params.
	 */
	public updatePageParams(pageParams: AnimeQueryParams.Pagination): void {
		this.updateUrlParams(pageParams);
	}

	/**
	 * Update the url with type param.
	 * @param typeParam The type param.
	 */
	public updateTypeParams(typeParam: AnimeQueryParams.Type): void {
		this.updateUrlParams(typeParam, true);
	}

	/**
	 * Update the url with type param.
	 * @param searchParam The search param.
	 */
	public updateSearchParam(searchParam: AnimeQueryParams.Search): void {
		const searchParams = {
			search: searchParam.search !== '' ? searchParam.search : null,
		};
		this.updateUrlParams(searchParams, true);
	}
}
