
import { Injectable } from '@angular/core';

import { AnimeFilterParams } from '../models/anime-filter-params';
import { TMapper } from '../models/mapper';
import { DEFAULT_PAGINATION } from '../contants/pagination';

/** Anime query params. */
export type AnimeQueryParams = Partial<Omit<AnimeFilterParams.Combined, 'pageNumber' | 'pageSize'> & {

	/** Page number query param. */
	pageNumber: string | null;

	/** Page size query param. */
	pageSize: string | null;
}>;

/** Service for handling URL query params. */
@Injectable({
	providedIn: 'root',
})
export class AnimeQueryParamsMapper implements TMapper<AnimeQueryParams, AnimeFilterParams.Combined> {
/** @inheritdoc */
	public fromDto(dto: AnimeQueryParams): AnimeFilterParams.Combined {
		return {
			type: dto.type ?? null,
			pageNumber: dto.pageNumber ? Number(dto.pageNumber) : DEFAULT_PAGINATION.pageNumber,
			pageSize: dto.pageSize ? Number(dto.pageSize) : DEFAULT_PAGINATION.pageSize,
			search: dto.search ?? null,
			sortFields: dto.sortFields ?? null,
		};
	}

	/** @inheritdoc */
	public toDto(model: Partial<AnimeFilterParams.Combined>): AnimeQueryParams {
		return {
			type: model.type,
			pageNumber: model.pageNumber ? model.pageNumber.toString() : undefined,
			pageSize: model.pageSize ? model.pageSize.toString() : undefined,
			search: model.search,
			sortFields: model.sortFields,
		};
	}
}
