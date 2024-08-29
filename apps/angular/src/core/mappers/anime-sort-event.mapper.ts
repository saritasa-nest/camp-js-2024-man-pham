import { Sort as SortEvent, SortDirection as SortEventDirection } from '@angular/material/sort';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';
import { SortDirection } from '@js-camp/core/models/sort-direction';
import { inject, Injectable } from '@angular/core';
import { AnimeColumns } from '@js-camp/core/models/anime-columns';

import { assertValueInEnum } from '../guards/assert-value-in-enum';

import { AnimeSortFieldsMapper } from './anime-sort-fields.mapper';

/** Anime sort event mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeSortEventMapper {
	private readonly sortFieldsMapper = inject(AnimeSortFieldsMapper);

	/**
	 * Map sort event values to sort filter params.
	 * @param event Sort event values.
	 * @returns Sort filter params.
	 */
	public mapToSortFilterParams(event: SortEvent): AnimeFilterParams.Sort {
		if (event.active != null && event.direction != null) {
			let sortDirection: SortDirection | null;

			switch (event.direction) {
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

			assertValueInEnum(event.active, AnimeColumns);

			const field = this.sortFieldsMapper.toSortFields(event.active);
			return {
				sortField: field ?? null,
				sortDirection,
			};
		}
		return {
			sortField: null,
			sortDirection: null,
		};
	}

	/**
	 * Map sort filter params to sort event values.
	 * @param model Sort filter params.
	 * @returns Sort event values.
	 */
	public mapToSortEvent(model: Partial<AnimeFilterParams.Sort> | null): SortEvent {
		if (model != null) {
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

			if (model.sortField != null) {
				const field = this.sortFieldsMapper.toAnimeColumns(model.sortField);
				return {
					direction: sortDirection,
					active: field,
				};
			}
		}
		return {
			active: '',
			direction: '',
		};
	}
}
