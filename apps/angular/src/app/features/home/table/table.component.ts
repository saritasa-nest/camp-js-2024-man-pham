import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AnimeResponse } from '@js-camp/angular/core/services/anime.service';
import { NoEmptyStringPipe } from '@js-camp/angular/core/pipes/no-empty-string.pipe';

/** Anime Table Component. */
@Component({
	selector: 'camp-table',
	standalone: true,
	imports: [CommonModule, MatTableModule, NoEmptyStringPipe],
	templateUrl: './table.component.html',
	styleUrl: './table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** Anime data list. */
	@Input() public animeResponse$!: Observable<AnimeResponse>;

	/** Displayed columns. */
	protected readonly displayedColumns: string[] = ['image', 'title_eng', 'title_jpn', 'aired.start', 'type', 'status'];

}
