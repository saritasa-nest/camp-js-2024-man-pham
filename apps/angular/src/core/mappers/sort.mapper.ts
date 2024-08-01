import { TMapperFromDto } from '@js-camp/core/models/mapper';
import { Sort } from '@angular/material/sort';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeSortFields } from '@js-camp/core/models/anime-sort-fields';
import { SortDirection } from '@js-camp/core/models/sort-direction';
import { Injectable } from '@angular/core';

/** Sort Mapper. */
@Injectable({
	providedIn: 'root',
})
export class SortMapper implements TMapperFromDto<Sort, AnimeFilterParams.Sort> {
	private fieldMapping: Record<string, AnimeSortFields> = {
		titleEng: AnimeSortFields.TitleEng,
		airedStartDate: AnimeSortFields.StartDate,
		status: AnimeSortFields.Status,
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
		return {
			sortField: sortDirection != null ? this.fieldMapping[dto.active] : null,
			sortDirection,
		};
	}
}
