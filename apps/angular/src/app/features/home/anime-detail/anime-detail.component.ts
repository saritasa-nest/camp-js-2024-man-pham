import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable, of } from 'rxjs';
import { AnimeDetails } from '@js-camp/core/models/anime-detail';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NoEmptyPipe } from '@js-camp/angular/core/pipes/no-empty.pipe';
import { AnimeGenre } from '@js-camp/core/models/anime-genre';
import { AnimeStudio } from '@js-camp/core/models/anime-studio';

const EMBDED_LINK = 'https://www.youtube.com/embed/';

/** Anime detail component. */
@Component({
	selector: 'camp-anime-detail',
	standalone: true,
	imports: [AsyncPipe, MatCardModule, NoEmptyPipe, MatTabsModule, DatePipe],
	templateUrl: './anime-detail.component.html',
	styleUrl: './anime-detail.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimeDetailComponent {
	private readonly route = inject(ActivatedRoute);

	private readonly animeService = inject(AnimeService);

	private readonly animeId = this.route.snapshot.paramMap.get('id');

	private readonly domSanitizer = inject(DomSanitizer);

	/** Anime detail. */
	protected readonly animeDetails$: Observable<AnimeDetails | null> = this.animeId ?
		this.animeService.getAnimeDetail(this.animeId) :
		of(null);

	/**
	 * Get anime trailer based on its id.
	 * @param id Anime id.
	 */
	protected getAnimeTrailerUrl = (id: AnimeDetails['trailerUrl']): SafeResourceUrl =>
		this.domSanitizer.bypassSecurityTrustResourceUrl(`${EMBDED_LINK}${id}`);

	/**
	 * Join array of items into a string containing the item's name.
	 * @param array Array of items.
	 */
	protected getItemNameList(array: readonly AnimeGenre[] | readonly AnimeStudio[]): string {
		return array.map((item, index) => `${item.name}${index === array.length - 1 ? '' : ', '}`).join('');
	}
}
