import { Injectable } from '@angular/core';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { DEFAULT_PAGINATION } from '@js-camp/core/models/default-pagination';
import { TMapper } from '@js-camp/core/models/mapper';
import { StrictOmit } from '@js-camp/core/utils/types/strict-omit';

/** Anime query params. */
export type AnimeQueryParams = Partial<
StrictOmit<AnimeFilterParams.Combined, 'pageNumber' | 'pageSize'> & {

	/** Page number query param. */
	readonly pageNumber: string | null;

	/** Page size query param. */
	readonly pageSize: string | null;
}
>;

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
			sortField: dto.sortField ?? null,
			sortDirection: dto.sortDirection ?? null,
		};
	}

	/** @inheritdoc */
	public toDto(model: Partial<AnimeFilterParams.Combined>): AnimeQueryParams {
		return {
			type: model.type !== undefined ? model.type : undefined,
			pageNumber: model.pageNumber != null && model.pageNumber >= 0 ? model.pageNumber.toString() : undefined,
			pageSize: model.pageSize != null ? model.pageSize.toString() : undefined,
			search: model.search !== undefined ? model.search : undefined,
			sortField: model.sortField !== undefined ? model.sortField : undefined,
			sortDirection: model.sortDirection !== undefined ? model.sortDirection : undefined,
		};
	}
}
