import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

type ImageDialogData = {

	/** Source. */
	readonly source: string | null;

	/** Title. */
	readonly title: string;
};

/** Image dialog component. */
@Component({
	selector: 'camp-image-dialog',
	standalone: true,
	imports: [],
	templateUrl: './image-dialog.component.html',
	styleUrl: './image-dialog.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageDialogComponent {
	/** Image dialog data. */
	protected readonly dialogData = inject<ImageDialogData>(MAT_DIALOG_DATA);
}
