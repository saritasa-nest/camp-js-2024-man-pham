import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { Observable } from 'rxjs';

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
	imports: [CommonModule, AnimeTableComponent, AnimePaginatorComponent, AnimeSelectorFormComponent],
	templateUrl: './anime-catalog.component.html',
	styleUrl: './anime-catalog.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [...ANIME_FILTER_PARAMS_PROVIDERS],
})
export class AnimeCatalogComponent implements OnInit {
	/** Anime page observable. */
	protected readonly animePage$: Observable<Pagination<Anime>>;

	private readonly filter$ = inject(ANIME_FILTER_PARAMS_TOKEN);

	private readonly animeQueryParams = inject(AnimeQueryParamsService);

	protected filterParams: AnimeFilterParams.Combined | null = null;

	private readonly animeService = inject(AnimeService);

	public constructor() {
		this.animePage$ = this.animeService.getAnime2(this.filter$);
	}

	/** Subscribe the page number and page size to pass them to the paginator. */
	public ngOnInit(): void {
		this.filter$.subscribe(params => {
			this.filterParams = params;
		});
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
	protected onSelectionChange(event: AnimeType): void {
		this.animeQueryParams.appendParamsAndResetPageNumber({ type: event });
	}

	/**
	 * Event handler for searching.
	 * @param event The searching input.
	 */
	protected onSearch(event: string): void {
		this.animeQueryParams.appendParamsAndResetPageNumber({ search: event });
	}
}
