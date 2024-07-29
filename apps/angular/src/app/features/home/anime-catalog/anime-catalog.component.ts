import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
export class AnimeCatalogComponent {
	/** Anime page observable. */
	protected readonly animePage$: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	public constructor() {
		this.animePage$ = this.animeService.getAnime();
	}

	/**
	 * Event handler for page changing.
	 * @param event The page event.
	 * NOTE: event.pageIndex + 1 used to bypass the initial index of the Mat Paginator which is 0.
	 */
	public onPageChange(event: PageEvent): void {
		this.animeService.updatePageParams(event.pageIndex + 1, event.pageSize);
	}
}
