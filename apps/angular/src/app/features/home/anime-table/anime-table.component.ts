import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';
import { NoEmptyPipe } from '@js-camp/angular/core/pipes/no-empty.pipe';
import { AnimeColumns } from '@js-camp/core/contants/anime-columns';

/** Anime table component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [MatTableModule, NoEmptyPipe, AsyncPipe, DatePipe],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** Anime page observable. */
	protected readonly animePage$: Observable<Pagination<Anime>>;

	private readonly animeService = inject(AnimeService);

	/** Anime column ids. */
	protected readonly animeColumns = AnimeColumns;

	public constructor() {
		this.animePage$ = this.animeService.getAllAnime();
	}

	/** Displayed columns. */
	protected readonly displayedColumns = Object.values(this.animeColumns);

	/**
	 * Track anime by its id.
	 * @param _index Item index.
	 * @param item The anime.
	 * @returns Anime id.
	 */
	protected trackAnimeById(_index: number, item: Anime): Anime['id'] {
		return item.id;
	}
}
