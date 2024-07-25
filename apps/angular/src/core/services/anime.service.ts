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
import { AnimeQueryParams } from '@js-camp/core/models/query-params';

import { HttpParamsService } from './http-params.service';

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

	/** Return an observable containing the list of anime. */
	public getAllAnime(): Observable<Pagination<Anime>> {
		return this.httpClient.get<PaginationDto<AnimeDto>>(this.appUrlsConfig.anime.list).pipe(
			map(responseDto => this.paginationMapper.mapPaginationFromDto(responseDto, this.animeMapper)),
		);
	}

	public getAllAnimeWithParam(queryParams: AnimeQueryParams.Combined): Observable<Pagination<Anime>> {
		const params = this.httpParamsService.getHttpParams(queryParams);
		return this.httpClient.get<PaginationDto<AnimeDto>>(this.appUrlsConfig.anime.list, { params }).pipe(
			map(responseDto => this.paginationMapper.mapPaginationFromDto(responseDto, this.animeMapper)),
		);
	}
}
