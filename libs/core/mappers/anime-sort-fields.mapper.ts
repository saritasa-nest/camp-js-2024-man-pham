import { Injectable } from '@angular/core';

import { AnimeColumns } from '../contants/anime-columns';
import { AnimeSortFields } from '../models/anime-sort-fields';

/** Anime sort fields mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeSortFieldsMapper {
	/** Map DTO to model. */
	public readonly MAP_SORT_COLUMNS_TO_SORT_FIELDS: Partial<Record<AnimeColumns, AnimeSortFields>> = {
		[AnimeColumns.TitleEng]: AnimeSortFields.TitleEng,
		[AnimeColumns.StartDate]: AnimeSortFields.StartDate,
		[AnimeColumns.Status]: AnimeSortFields.Status,
	};

	/** Map model to DTO. */
	public readonly MAP_SORT_FIELDS_TO_SORT_COLUMN: Record<AnimeSortFields, AnimeColumns> = {
		[AnimeSortFields.TitleEng]: AnimeColumns.TitleEng,
		[AnimeSortFields.StartDate]: AnimeColumns.StartDate,
		[AnimeSortFields.Status]: AnimeColumns.Status,
	};
}
