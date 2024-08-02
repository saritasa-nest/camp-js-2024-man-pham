import { TMapper } from '@js-camp/core/models/mapper';
import { Sort, SortDirection as SortEventDirection } from '@angular/material/sort';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeSortFields } from '@js-camp/core/models/anime-sort-fields';
import { SortDirection } from '@js-camp/core/models/sort-direction';
import { Injectable } from '@angular/core';
import { AnimeColumns } from '@js-camp/core/contants/anime-columns';

/** Sort Mapper. */
@Injectable({
	providedIn: 'root',
})
export class SortMapper implements TMapper<Sort, AnimeFilterParams.Sort> {
	private readonly MAP_SORT_COLUMNS_TO_SORT_FIELDS: Partial<Record<AnimeColumns, AnimeSortFields>> = {
		[AnimeColumns.TitleEng]: AnimeSortFields.TitleEng,
		[AnimeColumns.StartDate]: AnimeSortFields.StartDate,
		[AnimeColumns.Status]: AnimeSortFields.Status,
	};

	private readonly MAP_SORT_FIELDS_TO_SORT_COLUMN: Record<AnimeSortFields, AnimeColumns> = {
		[AnimeSortFields.TitleEng]: AnimeColumns.TitleEng,
		[AnimeSortFields.StartDate]: AnimeColumns.StartDate,
		[AnimeSortFields.Status]: AnimeColumns.Status,
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

	/** @inheritdoc */
	public toDto(model: Partial<AnimeFilterParams.Sort>): Sort {
		let sortDirection: SortEventDirection;
		switch (model.sortDirection) {
			case SortDirection.Ascending:
				sortDirection = 'asc';
				break;
			case SortDirection.Descending:
				sortDirection = 'desc';
				break;
			default:
				sortDirection = '';
				break;
		}
		const field = this.MAP_SORT_FIELDS_TO_SORT_COLUMN[model.sortField as AnimeSortFields];
		return {
			direction: sortDirection,
			active: field,
		};
	}
}
