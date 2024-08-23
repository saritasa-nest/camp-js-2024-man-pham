import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AnimeDetail } from '@js-camp/core/models/anime-detail';
import { NoEmptyPipe } from '@js-camp/angular/core/pipes/no-empty.pipe';
import { AnimeGenre } from '@js-camp/core/models/anime-genre';
import { AnimeStudio } from '@js-camp/core/models/anime-studio';
import { DatePipe } from '@angular/common';

/** Anime information component. */
@Component({
	selector: 'camp-anime-information',
	standalone: true,
	imports: [NoEmptyPipe, DatePipe],
	templateUrl: './anime-information.component.html',
	styleUrl: './anime-information.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeInformationComponent {
	/** Anime detail. */
	@Input()
	public animeDetail!: AnimeDetail;

	/**
	 * Gets formatted list.
	 * @param array Array of items.
	 */
	protected getFormattedList(array: readonly AnimeGenre[] | readonly AnimeStudio[]): string {
		return array.map(item => item.name).join(', ');
	}
}
