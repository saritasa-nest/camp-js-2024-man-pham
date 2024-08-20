import { Sort as SortEvent, SortDirection as SortEventDirection } from '@angular/material/sort';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { AnimeSortFields } from '@js-camp/core/models/anime-sort-fields';
import { SortDirection } from '@js-camp/core/models/sort-direction';
import { inject, Injectable } from '@angular/core';
import { AnimeColumns } from '@js-camp/core/models/anime-columns';

import { AnimeSortFieldsMapper } from './anime-sort-fields.mapper';

/** Anime sort event mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeSortEventMapper {
	private readonly sortFieldsMapper = inject(AnimeSortFieldsMapper);

	/**
	 * Map sort event values to sort filter params.
	 * @param dto Sort event values.
	 * @returns Sort filter params.
	 */
	public mapToSortFilterParams(dto: SortEvent): AnimeFilterParams.Sort {
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
		const field = this.sortFieldsMapper.MAP_SORT_COLUMNS_TO_SORT_FIELDS[dto.active as AnimeColumns];
		return {
			sortField: sortDirection != null && field ? field : null,
			sortDirection,
		};
	}

	/**
	 * Map sort filter params to sort event values.
	 * @param model Sort filter params.
	 * @returns Sort event values.
	 */
	public mapToSortEvent(model: Partial<AnimeFilterParams.Sort>): SortEvent {
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
		const field = this.sortFieldsMapper.MAP_SORT_FIELDS_TO_SORT_COLUMN[model.sortField as AnimeSortFields];
		return {
			direction: sortDirection,
			active: field,
		};
	}
}
