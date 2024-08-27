import { DatePipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	inject,
	Input,
	Output,
	TrackByFunction,
	OnInit,
} from '@angular/core';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NoEmptyPipe } from '@js-camp/angular/core/pipes/no-empty.pipe';
import { TableCellContentComponent } from '@js-camp/angular/shared/components/table-cell-content/table-cell-content.component';
import { AnimeColumns } from '@js-camp/core/models/anime-columns';
import { Anime } from '@js-camp/core/models/anime';
import { AnimeFilterParams } from '@js-camp/core/models/anime-filter-params';

import { AnimeSortEventMapper } from '@js-camp/angular/core/mappers/anime-sort-event.mapper';

import { DEFAULT_PAGINATION } from '@js-camp/core/models/default-pagination';

import { AnimeNotFoundComponent } from './../anime-not-found/anime-not-found.component';

/** Anime table component. */
@Component({
	selector: 'camp-anime-table',
	standalone: true,
	imports: [AnimeNotFoundComponent, DatePipe, MatTableModule, NoEmptyPipe, MatSortModule, TableCellContentComponent],
	templateUrl: './anime-table.component.html',
	styleUrl: './anime-table.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeTableComponent implements OnInit {
	/** Anime list.*/
	@Input({ required: true })
	public set animeList(values: ReadonlyArray<Anime>) {
		this.dataSource = [...values];
	}

	/** Loading state. */
	@Input({ required: true })
	public isLoading = false;

	/** Page size. */
	@Input({ required: true })
	public pageSize = DEFAULT_PAGINATION.pageSize;

	/** Sort params test. */
	@Input({ required: true })
	public sortParams: AnimeFilterParams.Sort | null = null;

	/** Event emitter for sorting. */
	@Output()
	public readonly sortChange = new EventEmitter<AnimeFilterParams.Sort>();

	/** Anime column ids. */
	protected readonly columns = AnimeColumns;

	/** Table data source. */
	protected dataSource: ReadonlyArray<Anime> = [];

	/** Sort event values. */
	protected sortEvent: Sort = {
		active: '',
		direction: '',
	};

	/** Displayed columns. */
	protected readonly displayedColumns: AnimeColumns[] = Object.values(this.columns);

	private readonly sortEventMapper = inject(AnimeSortEventMapper);

	/** Side effects when initialize component. */
	public ngOnInit(): void {
		if (this.sortParams?.sortDirection && this.sortParams.sortField) {
			this.sortEvent = this.sortEventMapper.mapToSortEvent(this.sortParams);
		}
	}

	/**
	 *  Track element by a given key.
	 *  @param key Key of element.
	 */
	protected trackBy<T>(key: keyof T): TrackByFunction<T> {
		return function(_index: number, item: T): T[keyof T] {
			return item[key];
		};
	}

	/**
	 * Emit sort value.
	 * @param event Sort event.
	 */
	protected onSortChange(event: Sort): void {
		const sortFilterParams = this.sortEventMapper.mapToSortFilterParams(event);
		this.sortChange.emit(sortFilterParams);
	}

	/** Generate number array for the template table data source. */
	protected get templateArray(): readonly object[] {
		return Array(this.pageSize)
			.fill(null)
			.map(_ => ({}));
	}
}
