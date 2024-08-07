import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AnimeSortEventMapper } from '@js-camp/angular/core/mappers/anime-sort-event.mapper';
import { NoEmptyPipe } from '@js-camp/angular/core/pipes/no-empty.pipe';
import { TableCellContentComponent } from '@js-camp/angular/shared/components/table-cell-content/table-cell-content.component';
import { AnimeColumns } from '@js-camp/core/contants/anime-columns';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

/** Anime Table Component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [DatePipe, MatTableModule, NoEmptyPipe, MatSortModule, TableCellContentComponent],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent {
	/** Anime list.*/
	@Input()
	public set animeList(values: ReadonlyArray<Anime>) {
		this.dataSource.data = [...values];
	}

	/** Loading state. */
	@Input()
	public loading = false;

	/** Page size. */
	@Input()
	public pageSize = 0;

	/** Sort params. */
	@Input()
	public set sortParams(values: AnimeFilterParams.Sort | null) {
		if (values?.sortDirection && values.sortField) {
			this.sortEvent = this.sortEventMapper.mapToSortEvent(values);
		} else {
			this.sortEvent = {
				active: '',
				direction: '',
			};
		}

	}

	/** Event emitter for sorting. */
	@Output()
	public sortChange = new EventEmitter<AnimeFilterParams.Sort>();

	private readonly sortEventMapper = inject(AnimeSortEventMapper);

	/** Anime column ids. */
	protected readonly columns = AnimeColumns;

	/** Table data source. */
	protected dataSource = new MatTableDataSource<Anime>();

	/** Sort event values. */
	protected sortEvent!: Sort;

	/** Displayed columns. */
	protected readonly displayedColumns: AnimeColumns[] = Object.values(this.columns);

	/**
	 * Track anime by its id.
	 * @param index Item index.
	 * @param item The anime.
	 * @returns Anime id.
	 */
	protected trackAnime(index: number, item: Anime): Anime['id'] {
		return item.id;
	}

	/**
	 * Emit sort value.
	 * @param event Sort event.
	 */
	public onSortChange(event: Sort): void {
		const sortFilterParams = this.sortEventMapper.mapToSortFilterParams(event);
		this.sortChange.emit(sortFilterParams);
	}

	/** Generate number array for the template table data source. */
	protected get templateArray(): number[] {
		return Array(this.pageSize)
			.fill(null)
			.map((_, index) => index);
	}
}
