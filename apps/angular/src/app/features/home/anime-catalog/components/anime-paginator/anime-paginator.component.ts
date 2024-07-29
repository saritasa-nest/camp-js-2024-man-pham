
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

/** Anime Paginator Component. */
@Component({
	selector: 'camp-anime-paginator',
	standalone: true,
	imports: [CommonModule, MatPaginatorModule],
	templateUrl: './anime-paginator.component.html',
	styleUrl: './anime-paginator.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimePaginatorComponent {
	/** Page size options. */
	protected pageSizeOptions: readonly number[] = [5, 10, 20];

	/** Amount of items per page. */
	@Input() public pageSize: number | null = null;

	/** Total amount of fetched items. */
	@Input() public pageNumber: number | null = null;

	/** Total amount of fetched items. */
	@Input() public totalCount = 0;

	/** Event emitter for page changing. */
	@Output() public pageChange = new EventEmitter<PageEvent>();

	/**
	 * Emit the page event.
	 * @param event The page event.
	 */
	public onPageChange(event: PageEvent): void {
		this.pageChange.emit(event);
	}

}
