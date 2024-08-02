import { TMapperFromDto } from '@js-camp/core/models/mapper';
import { Sort } from '@angular/material/sort';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeSortFields } from '@js-camp/core/models/anime-sort-fields';
import { SortDirection } from '@js-camp/core/models/sort-direction';
import { Injectable } from '@angular/core';
import { AnimeColumns } from '@js-camp/core/contants/anime-columns';

/** Sort Mapper. */
@Injectable({
	providedIn: 'root',
})
export class SortMapper implements TMapperFromDto<Sort, AnimeFilterParams.Sort> {
	private readonly MAP_SORT_COLUMNS_TO_SORT_FIELDS: Partial<Record<AnimeColumns, AnimeSortFields>> = {
		[AnimeColumns.TitleEng]: AnimeSortFields.TitleEng,
		[AnimeColumns.StartDate]: AnimeSortFields.StartDate,
		[AnimeColumns.Status]: AnimeSortFields.Status,
	};

	/** @inheritdoc */
	public fromDto(dto: Sort): AnimeFilterParams.Sort {
		let sortDirection: SortDirection | null;

		switch (dto.direction) {
			case 'asc':
				sortDirection = SortDirection.Ascending;
				break;
			case 'desc':
				sortDirection = SortDirection.Descending;
				break;
			default:
				sortDirection = null;
				break;
		}
		const field = this.MAP_SORT_COLUMNS_TO_SORT_FIELDS[dto.active as AnimeColumns];
		return {
			sortField: sortDirection != null && field ? field : null,
			sortDirection,
		};
	}
}
