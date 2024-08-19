import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AnimeService } from '@js-camp/angular/core/services/anime.service';
import { Observable, of } from 'rxjs';
import { AnimeDetails } from '@js-camp/core/models/anime-detail';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

const EMBDED_LINK = 'https://www.youtube.com/embed/';

/** Anime detail component. */
@Component({
	selector: 'camp-anime-detail',
	standalone: true,
	imports: [AsyncPipe],
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
	protected getAnimeTrailerUrl = (id: AnimeDetails['id']): SafeResourceUrl =>
		this.domSanitizer.bypassSecurityTrustResourceUrl(`${EMBDED_LINK}${id}`);
}
