import { ChangeDetectionStrategy, Component, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/core/models/anime';
import { NoEmptyPipe } from '@js-camp/angular/core/pipes/no-empty.pipe';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { SortMapper } from '@js-camp/angular/core/mappers/sort.mapper';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

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

	private readonly sortMapper = inject(SortMapper);

	/** Table data source. */
	protected dataSource = new MatTableDataSource<Anime>();

	/** Table sort. */
	@ViewChild(MatSort) protected sort!: MatSort;

	/** Event emitter for sorting. */
	@Output() public sortChange = new EventEmitter<AnimeFilterParams.Sort>();

	public constructor() {}

	/**
	 * Side effects after initializing views.
	 * Customize the sortingDataAccessor to handle sort values related to aired.StartDate property.
	 */
	public ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;

		/* this.dataSource.sortingDataAccessor = (row: Anime, columnName: string): string | number => {
			switch (columnName) {
				case 'airedStartDate': {
					if (row.aired.startDate) {
						return row.aired.startDate.getTime();
					}
					return '';
				}
				default: return row[columnName as keyof Anime] as string;
			}
		}; */
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

	/**
	 * Emit sort value.
	 * @param event Sort event.
	 */
	public onSortChange(event: Sort): void {
		this.sortChange.emit(this.sortMapper.fromDto(event));
	}
}
