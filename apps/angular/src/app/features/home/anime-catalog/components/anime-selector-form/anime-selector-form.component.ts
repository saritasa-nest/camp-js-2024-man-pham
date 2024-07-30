
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { AnimeType } from '@js-camp/core/models/anime-type';

@Component({
	selector: 'camp-anime-selector-form',
	standalone: true,
	imports: [
		CommonModule,
		MatInputModule,
		MatFormFieldModule,
		FormsModule,
		MatSelectModule,
	],
	templateUrl: './anime-selector-form.component.html',
	styleUrl: './anime-selector-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeSelectorFormComponent {
	protected readonly types = Object.values(AnimeType);

	protected selectedType: AnimeType | null = null;

	/** Event emitter for page changing. */
	@Output() public typeChange = new EventEmitter<AnimeType>();

	protected onSelectionChange(event: MatSelectChange) {
		if (event.value in AnimeType) {
			this.typeChange.emit(event.value);
		}
	}
}
