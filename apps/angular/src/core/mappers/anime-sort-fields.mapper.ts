import { Injectable } from '@angular/core';
import { AnimeSortFieldsDto } from '@js-camp/core/dtos/anime-sort-fields.dto';
import { AnimeColumns } from '@js-camp/core/models/anime-columns';
import { AnimeSortFields } from '@js-camp/core/models/anime-sort-fields';
import { TMapperToDto } from '@js-camp/core/models/mapper';

/** Anime sort fields mapper. */
@Injectable({
	providedIn: 'root',
})
export class AnimeSortFieldsMapper implements TMapperToDto<AnimeSortFieldsDto, AnimeSortFields> {
	private readonly MAP_ANIME_SORT_FIELDS_TO_DTO: Record<AnimeSortFields, AnimeSortFieldsDto> = {
		[AnimeSortFields.StartDate]: AnimeSortFieldsDto.StartDate,
		[AnimeSortFields.Status]: AnimeSortFieldsDto.Status,
		[AnimeSortFields.TitleEng]: AnimeSortFieldsDto.TitleEng,
	};

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
	public toDto(model: AnimeSortFields): AnimeSortFieldsDto {
		return this.MAP_ANIME_SORT_FIELDS_TO_DTO[model];
	}

	/**
	 *  Map sort field to anime column.
	 * @param field Sort fields.
	 */
	public toAnimeColumns(field: AnimeSortFields): AnimeColumns {
		return this.MAP_SORT_FIELDS_TO_SORT_COLUMN[field];
	}

	/**
	 *  Map anime column to sort field.
	 * @param column Column.
	 */
	public toSortFields(column: AnimeColumns): AnimeSortFields | undefined {
		return this.MAP_SORT_COLUMNS_TO_SORT_FIELDS[column];
	}
}
