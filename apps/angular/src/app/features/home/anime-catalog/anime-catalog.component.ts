import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';

import { Observable } from 'rxjs';

import { PageEvent } from '@angular/material/paginator';

import { AnimeTableComponent } from './components/anime-table/anime-table.component';
import { AnimePaginatorComponent } from './components/anime-paginator/anime-paginator.component';

/** Anime catalog. */
@Component({
	selector: 'camp-anime-catalog',
	standalone: true,
	imports: [CommonModule, AnimeTableComponent, AnimePaginatorComponent],
	templateUrl: './anime-catalog.component.html',
	styleUrl: './anime-catalog.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeCatalogComponent implements OnInit {
	/** Anime page observable. */
	protected readonly animePage$: Observable<Pagination<Anime>>;

	/** Page size. */
	protected pageSize: number | null = null;

	/** Page number. */
	protected pageNumber: number | null = null;

	private readonly animeService = inject(AnimeService);

	public constructor() {
		this.animePage$ = this.animeService.getAnime();
	}

	/** Subscribe the page number and page size to pass them to the paginator. */
	public ngOnInit(): void {
		this.animeService.pageNumber$.subscribe(pageNumber => {
			this.pageNumber = pageNumber;
		});
		this.animeService.pageSize$.subscribe(pageSize => {
			this.pageSize = pageSize;
		});
	}

	/**
	 * Event handler for page changing.
	 * @param event The page event.
	 */
	public onPageChange(event: PageEvent): void {
		this.animeService.updatePageParams({ pageNumber: event.pageIndex, pageSize: event.pageSize });
	}
}
