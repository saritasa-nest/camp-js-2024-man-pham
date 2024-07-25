import { Component } from '@angular/core';

import { SidebarComponent } from '@js-camp/angular/shared/components/sidebar/sidebar.component';

import { AnimeTableComponent } from './anime-table/anime-table.component';

/** Home component. */
@Component({
	selector: 'camp-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	imports: [AnimeTableComponent, SidebarComponent],
	standalone: true,
})
export class HomeComponent {}
