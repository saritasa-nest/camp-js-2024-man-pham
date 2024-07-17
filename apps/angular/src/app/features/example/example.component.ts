
import { Component, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { TAnime } from '@js-camp/angular/core/models/anime';

import { AnimeResponse, AnimeService } from './../../../core/services/anime.service';

/** Example component. */
@Component({
	selector: 'camp-example',
	templateUrl: './example.component.html',
	styleUrls: ['./example.component.css'],
	standalone: true,
})
export class ExampleComponent {
	private readonly animeResponse$: Observable<AnimeResponse>;

	private readonly animeService: AnimeService = inject(AnimeService);

	protected animeList: TAnime[] = [];

	public constructor() {
		this.animeResponse$ = this.animeService.getAllAnime();

		this.animeResponse$.subscribe(
			response => {
				console.log(response);

				this.animeList = [...response.results];
			},
		);
	}
}
