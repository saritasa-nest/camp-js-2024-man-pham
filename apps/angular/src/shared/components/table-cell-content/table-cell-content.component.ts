import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonDirective } from '../../directives/skeleton/skeleton.directive';

/** Table cell content. */
@Component({
	selector: 'camp-table-cell-content',
	standalone: true,
	imports: [CommonModule, SkeletonDirective],
	templateUrl: './table-cell-content.component.html',
	styleUrl: './table-cell-content.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellContentComponent {

	/** Whether cell is loading or not. */
	@Input()
	public isLoading: Boolean | null = false;
}
