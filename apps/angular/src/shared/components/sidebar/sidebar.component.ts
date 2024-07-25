import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

/** Sidebar. */
@Component({
	selector: 'camp-sidebar',
	standalone: true,
	imports: [CommonModule, MatSidenavModule],
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {}
