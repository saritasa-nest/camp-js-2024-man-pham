import { Component, inject } from '@angular/core';

import { Observable } from 'rxjs';

import { TAnime } from '@js-camp/core/models/anime';

import { AnimeResponse, AnimeService } from '@js-camp/angular/core/services/anime.service';
import { CommonModule } from '@angular/common';

import { AnimeTableComponent } from './table/table.component';

/** Example component. */
@Component({
	selector: 'camp-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	imports: [AnimeTableComponent, CommonModule],
	standalone: true,
})
export class HomeComponent {
	private readonly animeResponse$: Observable<AnimeResponse>;

	private readonly animeService: AnimeService = inject(AnimeService);

	/** Anime list. */
	protected animeList: TAnime[] = [];

	public constructor() {
		this.animeResponse$ = this.animeService.getAllAnime();

		this.animeResponse$.subscribe(
			response => {
				console.log(response.items);

				this.animeList = [...response.items];
			},
		);
	}
}
