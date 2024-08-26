import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { BehaviorSubject, finalize, first, map, Observable, switchMap, tap } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';

import { AnimeType } from '@js-camp/core/models/anime-type';

import {
	ANIME_FILTER_PARAMS_PROVIDERS,
	ANIME_FILTER_PARAMS_TOKEN,
} from '@js-camp/angular/core/providers/anime-filter-params.provider';

import { AnimeQueryParamsService } from '@js-camp/angular/core/services/anime-query-params.service';

import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { AnimePaginatorComponent } from './components/anime-paginator/anime-paginator.component';
import { AnimeFilterFormComponent } from './components/anime-filter-form/anime-filter-form.component';
/** Anime catalog. */
@Component({
	selector: 'camp-anime-catalog',
	standalone: true,
	imports: [AsyncPipe, AnimeTableComponent, AnimePaginatorComponent, AnimeFilterFormComponent],
	templateUrl: './anime-catalog.component.html',
	styleUrl: './anime-catalog.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [...ANIME_FILTER_PARAMS_PROVIDERS],
})
export class AnimeCatalogComponent {
	/** Loading state when fetching data. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Anime page observable. */
	protected readonly animePage$: Observable<Pagination<Anime>>;

	/** Filter params. */
	protected readonly filter$ = inject(ANIME_FILTER_PARAMS_TOKEN);

	/** Sort params. */
	protected readonly sortParams$: Observable<AnimeFilterParams.Sort>;

	private readonly animeQueryParams = inject(AnimeQueryParamsService);

	private readonly animeService = inject(AnimeService);

	public constructor() {
		this.animePage$ = this.filter$.pipe(
			tap(() => this.isLoading$.next(true)),
			switchMap(filterParams =>
				this.animeService.getAnime(filterParams).pipe(finalize(() => this.isLoading$.next(false)))),
		);

		this.sortParams$ = this.filter$.pipe(
			map(params => {
				const sortParams: AnimeFilterParams.Sort = {
					sortDirection: params?.sortDirection ?? null,
					sortField: params?.sortField ?? null,
				};
				return sortParams;
			}),
		);
	}

	/**
	 * Event handler for page changing.
	 * Navigate to the first page if the page size is changed.
	 * @param event The page event.
	 */
	protected onPageChange(event: PageEvent): void {
		this.filter$
			.pipe(
				first(),
				tap(currentParams => {
					if (event.pageSize === currentParams.pageSize) {
						this.animeQueryParams.append({ pageNumber: event.pageIndex, pageSize: event.pageSize });
					} else {
						this.animeQueryParams.appendParamsAndResetPageNumber({ pageSize: event.pageSize });
					}
				}),
			)
			.subscribe();
	}

	/**
	 * Event handler for selecting type.
	 * @param event The selected type.
	 */
	protected onSelectionChange(event: AnimeType | null): void {
		this.animeQueryParams.appendParamsAndResetPageNumber({ type: event });
	}

	/**
	 * Event handler for searching.
	 * @param event The searching input.
	 */
	protected onSearch(event: string | null): void {
		this.animeQueryParams.appendParamsAndResetPageNumber({ search: event });
	}

	/**
	 * Event handler for sorting.
	 * @param event The sorting event values.
	 */
	protected onSortChange(event: AnimeFilterParams.Sort): void {
		this.animeQueryParams.appendParamsAndResetPageNumber(event);
	}
}
