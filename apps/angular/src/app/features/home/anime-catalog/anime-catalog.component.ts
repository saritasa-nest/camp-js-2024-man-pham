import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';

import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { BehaviorSubject, finalize, ignoreElements, map, Observable, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PageEvent } from '@angular/material/paginator';

import { AnimeType } from '@js-camp/core/models/anime-type';

import { ANIME_FILTER_PARAMS_PROVIDERS, ANIME_FILTER_PARAMS_TOKEN } from '@js-camp/angular/core/providers/anime-filter-params.provider';

import { AnimeQueryParamsService } from '@js-camp/angular/core/services/anime-query-params.service';

import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { AnimePaginatorComponent } from './components/anime-paginator/anime-paginator.component';
import { AnimeSelectorFormComponent } from './components/anime-selector-form/anime-selector-form.component';

/** Anime catalog. */
@Component({
	selector: 'camp-anime-catalog',
	standalone: true,
	imports: [NgIf, AsyncPipe, AnimeTableComponent, AnimePaginatorComponent, AnimeSelectorFormComponent],
	templateUrl: './anime-catalog.component.html',
	styleUrl: './anime-catalog.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [...ANIME_FILTER_PARAMS_PROVIDERS],
})
export class AnimeCatalogComponent implements OnInit {
	private readonly filter$ = inject(ANIME_FILTER_PARAMS_TOKEN);

	private readonly animeQueryParams = inject(AnimeQueryParamsService);

	private readonly animeService = inject(AnimeService);

	private readonly destroyRef = inject(DestroyRef);

	/** Loading state when fetching data. */
	protected readonly isLoading$ = new BehaviorSubject(false);

	/** Anime page observable. */
	protected readonly animePage$: Observable<Pagination<Anime>>;

	/** Filter params. */
	protected filterParams$ = new BehaviorSubject<AnimeFilterParams.Combined | null>(null);

	public constructor() {
		this.animePage$ = this.filter$.pipe(
			tap(() => this.isLoading$.next(true)),
			switchMap(filterParams =>
				this.animeService.getAnime(filterParams).pipe(finalize(() => this.isLoading$.next(false)))),
		);
	}

	/** Get the filter params. */
	public ngOnInit(): void {
		// Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
		// Add 'implements AfterViewInit' to the class.

		this.initializeFilterParamsSideEffects()
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe();
	}

	private initializeFilterParamsSideEffects(): Observable<void> {
		return this.filter$.pipe(
			tap(params => {
				this.filterParams$.next(params);
			}),
			ignoreElements(),
		);
	}

	/** Get sort params. */
	protected get sortParams$(): Observable<AnimeFilterParams.Sort> {
		return this.filterParams$.pipe(
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
	 * @param event The page event.
	 */
	public onPageChange(event: PageEvent): void {
		this.animeQueryParams.append({ pageNumber: event.pageIndex, pageSize: event.pageSize });
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
