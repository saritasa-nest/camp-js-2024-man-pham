import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { NoEmptyStringPipe } from '@js-camp/angular/core/pipes/no-empty-string.pipe';
import { Pagination } from '@js-camp/core/models/pagination';
import { Anime } from '@js-camp/core/models/anime';

/** Anime Table Component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [CommonModule, MatTableModule, NoEmptyStringPipe],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** Anime response observable. */
	protected readonly animePage$: Observable<Pagination<Anime>>;

	private readonly animeService: AnimeService = inject(AnimeService);

	public constructor() {
		this.animePage$ = this.animeService.getAllAnime();
	}

	/** Displayed columns. */
	protected readonly displayedColumns: string[] = ['image', 'title_eng', 'title_jpn', 'aired.start', 'type', 'status'];
}
