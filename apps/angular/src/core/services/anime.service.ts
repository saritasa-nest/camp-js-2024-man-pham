import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AppUrlsConfig } from '@js-camp/angular/app/shared/app-url';
import { AnimeDto } from '@js-camp/core/dtos/anime.dto';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Anime } from '@js-camp/core/models/anime';
import { Pagination } from '@js-camp/core/models/pagination';

import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

import { AnimeFilterParamsDto } from '@js-camp/core/dtos/anime-filter-params.dto';

import { AnimeFilterParamsMapper } from '../mappers/anime-filter-params.mapper';
import { AnimeMapper } from '../mappers/anime.mapper';
import { PaginationMapper } from '../mappers/pagination.mapper';

import { HttpParamsService } from './http-params.service';

/** Anime service. */
@Injectable({
	providedIn: 'root',
})
export class AnimeService {
	private readonly appUrlsConfig = inject(AppUrlsConfig);

	private readonly httpClient = inject(HttpClient);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly animeFilterParamsMapper = inject(AnimeFilterParamsMapper);

	private readonly paginationMapper = inject(PaginationMapper);

	private readonly httpParamsService = inject(HttpParamsService);

	/**
	 * Get the anime page.
	 * @param filterParams Filter params.
	 * @returns The anime page.
	 */
	public getAnime(filterParams: AnimeFilterParams.Combined): Observable<Pagination<Anime>> {
		const params = this.getHttpParams(filterParams);
		return this.httpClient
			.get<PaginationDto<AnimeDto>>(this.appUrlsConfig.anime.list, { params })
			.pipe(
				map(responseDto =>
					this.paginationMapper.mapPaginationFromDto(responseDto, animeDto => this.animeMapper.fromDto(animeDto))),
			);
	}

	private getHttpParams(filterParams: AnimeFilterParams.Combined): HttpParams {
		const filterParamsDto = this.animeFilterParamsMapper.toDto(filterParams);
		return this.httpParamsService.buildHttpParamsFromDto<AnimeFilterParamsDto.Combined>(filterParamsDto);
	}
}
