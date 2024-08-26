import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { AnimeType } from '@js-camp/core/models/anime-type';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/** Anime selector form. */
@Component({
	selector: 'camp-anime-filter-form',
	standalone: true,
	imports: [MatInputModule, MatFormFieldModule, FormsModule, MatButtonModule, MatSelectModule, MatIconModule],
	templateUrl: './anime-filter-form.component.html',
	styleUrl: './anime-filter-form.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeFilterFormComponent {
	/** Selected type by the user. */
	@Input()
	public selectedType: AnimeType | null = null;

	/** Searched result by the user. */
	@Input()
	public search: string | null = null;

	/** Loading state. */
	@Input()
	public isLoading = false;

	/** Event emitter for submitting search. */
	@Output()
	public searchSubmit = new EventEmitter<string | null>();

	/** Event emitter for type changing. */
	@Output()
	public typeChange = new EventEmitter<AnimeType | null>();

	/** Anime type values. */
	protected readonly animeTypes = Object.values(AnimeType);

	/**
	 * Emit the selected type to the parent.
	 * @param event The selected type.
	 */
	protected onSelectionChange(event: MatSelectChange): void {
		if (event.value) {
			this.typeChange.emit(event.value);
		} else {
			this.typeChange.emit(null);
		}
	}

	/**
	 * Emit the search request value to the parent.
	 * @param event The search request value.
	 */
	protected onSearch(): void {
		if (this.search && this.search.length > 0) {
			this.searchSubmit.emit(this.search);
		} else {
			this.searchSubmit.emit(null);
		}
	}
}
