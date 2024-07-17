import { inject, Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { map, Observable, switchMap } from 'rxjs';

import { environment } from '@js-camp/angular/environments/environment';

import { PaginationDto } from '@js-camp/core/dtos/pagination.dto';

import { AnimeMapper } from '../mappers/anime.mapper';

import { TAnimeDto } from '../dtos/anime.dto';
import { TAnime } from '../models/anime';

/** Anime pagination Dto. */
export type AnimeResponseDto = PaginationDto<TAnimeDto>;

/** Anime pagination. */
export type AnimeResponse = PaginationDto<TAnime>;

/** Anime services. */
@Injectable({
	providedIn: 'root',
})

export class AnimeService {
	private readonly baseApiUrl = new URL('anime/', environment.api);

	private readonly httpClient = inject(HttpClient);

	private readonly animeMapper = inject(AnimeMapper);

	private mapResponseDto(responseDto: AnimeResponseDto): PaginationDto<TAnime> {
		return {
			...responseDto,
			results: responseDto.results.map(animeDto => this.animeMapper.fromDto(animeDto)),
		};
	}

	public getAllAnime(): Observable<AnimeResponse> {
		const url = new URL('anime/', this.baseApiUrl);
		return this.httpClient.get<AnimeResponseDto>(url.toString()).pipe(map(data => this.mapResponseDto(data)));
	}

}
