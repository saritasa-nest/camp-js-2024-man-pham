import { ChangeDetectionStrategy, Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/core/models/anime';
import { NoEmptyPipe } from '@js-camp/angular/core/pipes/no-empty.pipe';
import { MatSort, MatSortModule } from '@angular/material/sort';

/** Anime Table Component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [CommonModule, MatTableModule, NoEmptyPipe, MatSortModule],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements AfterViewInit, OnChanges {
	/** Anime list.*/
	@Input() public animeList: ReadonlyArray<Anime> = [];

	/** Table data source. */
	protected dataSource = new MatTableDataSource<Anime>();

	/** Table sort. */
	@ViewChild(MatSort) protected sort!: MatSort;

	public constructor() {}

	/**
	 * Side effects after initializing views.
	 * Customize the sortingDataAccessor to handle sort values related to aired.StartDate property.
	 */
	public ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.sortingDataAccessor = (row: Anime, columnName: string): string | number => {
			switch (columnName) {
				case 'airedStartDate': {
					if (row.aired.startDate) {
						return row.aired.startDate.getTime();
					}
					return '';
				}
				default: return row[columnName as keyof Anime] as string;
			}
		};
	}

	/**
	 * Update changes to the data source when the input is updated.
	 * @param changes Changes.
	 */
	public ngOnChanges(changes: SimpleChanges): void {
		if (changes['animeList']) {
			this.dataSource.data = [...this.animeList];
		}
	}

	/** Displayed columns. */
	protected readonly displayedColumns: string[] = ['image', 'titleEng', 'titleJpn', 'airedStartDate', 'type', 'status'];

	/**
	 * Track anime by its id.
	 * @param index Item index.
	 * @param item The anime.
	 * @returns Anime id.
	 */
	protected trackAnimeById(index: number, item: Anime): Anime['id'] {
		return item.id;
	}
}
