import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';

import { AnimeMapper } from '@js-camp/core/mappers/anime.mapper';
import { TAnime } from '@js-camp/core/models/anime';
import { PaginationMapper } from '@js-camp/core/mappers/pagination.mapper';
import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';
import { Pagination } from '@js-camp/core/models/pagination';
import { TAnimeDto } from '@js-camp/core/dtos/anime.dto';

/** Anime pagination Dto. */
type AnimeResponseDto = PaginationDto<TAnimeDto>;

/** Anime pagination. */
export type AnimeResponse = Pagination<TAnime>;

/** Anime services. */
@Injectable({
	providedIn: 'root',
})

export class AnimeService {
	private readonly baseApiUrl = new URL('anime/', environment.api);

	private readonly httpClient = inject(HttpClient);

	private readonly animeMapper = inject(AnimeMapper);

	private readonly paginationMapper = inject(PaginationMapper);

	public getAllAnime(): Observable<AnimeResponse> {
		const url = new URL('anime/', this.baseApiUrl);
		return this.httpClient.get<AnimeResponseDto>(url.toString()).pipe(
			map(responseDto => this.paginationMapper.mapPaginationFromDto(responseDto, this.animeMapper)),
		);
	}

}
