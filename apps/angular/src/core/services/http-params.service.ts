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

		if (params.search !== undefined) {
			httpParams = httpParams.set('search', params.search);
		}
		if (params.offset !== undefined) {
			httpParams = httpParams.set('offset', params.offset.toString());
		}
		if (params.limit !== undefined) {
			httpParams = httpParams.set('limit', params.limit.toString());
		}
		if (params.ordering !== undefined) {
			httpParams = httpParams.set('ordering', params.ordering);
		}
		if (params.type !== undefined) {
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
