import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TAnime } from '@js-camp/core/models/anime';

/** Anime Table Component. */
@Component({
	selector: 'camp-table',
	standalone: true,
	imports: [CommonModule, MatTableModule],
	templateUrl: './table.component.html',
	styleUrl: './table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** Anime data list. */
	@Input() public animeList!: TAnime[];

	protected readonly displayedColumns: string[] = ['image', 'title_eng', 'title_jpn', 'aired.start', 'type', 'status'];

}
