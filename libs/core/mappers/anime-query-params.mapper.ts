
import { Injectable } from '@angular/core';

import { AnimeFilterParams } from '../models/anime-filter-params';
import { TMapper } from '../models/mapper';
import { DEFAULT_PAGINATION } from '../contants/pagination';

export type AnimeQueryParams2 = Partial<Omit<AnimeFilterParams.Combined, 'pageNumber' | 'pageSize'> & {
	pageNumber: string | null;
	pageSize: string | null;
}>;

/** Service for handling URL query params. */
@Injectable({
	providedIn: 'root',
})
export class AnimeQueryParamsMapper2 implements TMapper<AnimeQueryParams2, AnimeFilterParams.Combined> {
/** @inheritdoc */
	public fromDto(dto: AnimeQueryParams2): AnimeFilterParams.Combined {
		return {
			type: dto.type ?? null,
			pageNumber: dto.pageNumber ? Number(dto.pageNumber) : DEFAULT_PAGINATION.pageNumber,
			pageSize: dto.pageSize ? Number(dto.pageSize) : DEFAULT_PAGINATION.pageSize,
			search: dto.search ?? null,
			sortFields: dto.sortFields ?? null,
		};
	}

	/** @inheritdoc */
	public toDto(model: Partial<AnimeFilterParams.Combined>): AnimeQueryParams2 {
		return {
			type: model.type,
			pageNumber: model.pageNumber ? model.pageNumber.toString() : undefined,
			pageSize: model.pageSize ? model.pageSize.toString() : undefined,
			search: model.search,
			sortFields: model.sortFields,
		};
	}
}
