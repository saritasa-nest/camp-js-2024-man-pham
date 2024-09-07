import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DEFAULT_PAGINATION } from '@js-camp/core/models/default-pagination';

/** Anime Paginator Component. */
@Component({
	selector: 'camp-anime-paginator',
	standalone: true,
	imports: [MatPaginatorModule],
	templateUrl: './anime-paginator.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePaginatorComponent {
	/** Amount of items per page. */
	@Input({ required: true })
	public pageSize = DEFAULT_PAGINATION.pageSize;

	/** Total amount of fetched items. */
	@Input({ required: true })
	public pageNumber = DEFAULT_PAGINATION.pageNumber;

	/** Total amount of fetched items. */
	@Input({ required: true })
	public totalCount = 0;

	/** Loading state. */
	@Input({ required: true })
	public isLoading = false;

	/** Event emitter for page changing. */
	@Output()
	public readonly pageChange = new EventEmitter<PageEvent>();

	/** Page size options. */
	protected pageSizeOptions = [5, 10, 20] as const;

	/**
	 * Emit the page event.
	 * @param event The page event.
	 */
	public onPageChange(event: PageEvent): void {
		this.pageChange.emit(event);
	}
}
