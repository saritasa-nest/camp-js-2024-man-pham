import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/app-url';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

import { AnimeFilterParamsMapper } from '@js-camp/core/mappers/anime-filter-params.mapper';

import { AnimeFilterParamsDto } from '@js-camp/core/dtos/anime-filter-params.dto';

import { HttpParamsService } from './http-params.service';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly animeFilterParams = inject(AnimeFilterParamsMapper);

	private readonly paginationMapper = inject(PaginationMapper);

	private readonly httpParamsService = inject(HttpParamsService);

	private fetchAnimeWithParams(params: HttpParams): Observable<Pagination<Anime>> {
		return this.httpClient.get<PaginationDto<AnimeDto>>(this.appUrlsConfig.anime.list, { params }).pipe(
			map(responseDto => this.paginationMapper.mapPaginationFromDto(responseDto, this.animeMapper)),
		);
	}

	private getHttpParams(filterParams: AnimeFilterParams.Combined): HttpParams {
		const filterParamsDto = this.animeFilterParams.toDto(filterParams);
		return this.httpParamsService.buildHttpParamsFromDto<AnimeFilterParamsDto.Combined>(filterParamsDto);
	}

	/**
	 * Get the anime page.
	 * @param filterParams Filter params.
	 * @returns The anime page.
	 */
	public getAnime(filterParams: AnimeFilterParams.Combined): Observable<Pagination<Anime>> {
		const httpParams = this.getHttpParams(filterParams);
		return this.fetchAnimeWithParams(httpParams);
	}
}
