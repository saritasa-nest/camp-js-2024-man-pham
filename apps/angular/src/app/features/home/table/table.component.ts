import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { TAnime } from '@js-camp/core/models/anime';

export type PeriodicElement = {
	name: string;
	position: number;
	weight: number;
	symbol: string;
};

const ELEMENT_DATA: PeriodicElement[] = [
	{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
	{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
	{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
	{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
	{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
	{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
	{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
	{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
	{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
	{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

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
