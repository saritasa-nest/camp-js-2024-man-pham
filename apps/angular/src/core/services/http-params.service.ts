import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AnimeQueryParamsDto } from '@js-camp/core/dtos/query-params.dto';
import { AnimeQueryParamsMapper } from '@js-camp/core/mappers/query-params.mapper';
import { AnimeQueryParams } from '@js-camp/core/models/query-params';

/** Http Params Service. */
@Injectable({
	providedIn: 'root',
})
export class HttpParamsService {
	private readonly animeQueryMapper = inject(AnimeQueryParamsMapper);

	private buildHttpParamsFromDto(params: AnimeQueryParamsDto.Combined): HttpParams {
		let httpParams = new HttpParams();

		if ('search' in params) {
			httpParams = httpParams.set('search', params.search);
		}
		if ('offset' in params) {
			httpParams = httpParams.set('offset', params.offset.toString());
		}
		if ('limit' in params) {
			httpParams = httpParams.set('limit', params.limit.toString());
		}
		if ('sortFields' in params) {
			httpParams = httpParams.set('ordering', params.ordering);
		}
		if ('type' in params) {
			httpParams = httpParams.set('type', params.type);
		}
		return httpParams;
	}

	/**
	 * Build HttpParams from URL query params.
	 * @param params URL query params.
	 * @returns Http params.
	 */
	public getHttpParams(params: AnimeQueryParams.Combined): HttpParams {
		const dtoQueryParams = this.animeQueryMapper.mapCombinedOptionsToDto(params);
		return this.buildHttpParamsFromDto(dtoQueryParams);
	}

}
