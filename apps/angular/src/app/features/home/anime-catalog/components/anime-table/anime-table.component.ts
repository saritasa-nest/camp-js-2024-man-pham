import {
	ChangeDetectionStrategy,
	Component,
	Input,
	ViewChild,
	AfterViewInit,
	OnChanges,
	SimpleChanges,
	Output,
	EventEmitter,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Anime } from '@js-camp/core/models/anime';
import { NoEmptyPipe } from '@js-camp/angular/core/pipes/no-empty.pipe';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { AnimeColumns } from '@js-camp/core/contants/anime-columns';
import { TableCellContentComponent } from '@js-camp/angular/shared/components/table-cell-content/table-cell-content.component';

/** Anime Table Component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [DatePipe, MatTableModule, NoEmptyPipe, MatSortModule, TableCellContentComponent],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements AfterViewInit, OnChanges {
	/** Anime list.*/
	@Input() public animeList: ReadonlyArray<Anime> = [];

	/** Loading state. */
	@Input() public loading = false;

	/** Page size. */
	@Input() public pageSize = 0;

	/** Sort params. */
	@Input() public sortParams: Sort | null = {
		active: '',
		direction: '',
	};

	private readonly columns = AnimeColumns;

	/** Table data source. */
	protected dataSource = new MatTableDataSource<Anime>();

	/** Table sort. */
	@ViewChild(MatSort) protected sort!: MatSort;

	/** Event emitter for sorting. */
	@Output() public sortChange = new EventEmitter<Sort>();

	public constructor() {}

	/**
	 * Side effects after initializing views.
	 * Customize the sortingDataAccessor to handle sort values related to aired.StartDate property.
	 */
	public ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
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
	protected readonly displayedColumns: string[] = Object.values(this.columns);

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
		this.sortChange.emit(event);
	}

	/** Generate number array for the template table data source. */
	protected get templateArray(): number[] {
		return Array(this.pageSize)
			.fill(null)
			.map((_, index) => index);
	}
}
