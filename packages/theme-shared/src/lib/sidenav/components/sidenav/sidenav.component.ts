import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  HostListener,
  inject,
  computed,
  Signal,
} from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { SublevelMenuComponent } from './sublevel-menu.component';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { SidenavService } from '../../services';
import { TranslateModule } from '@ngx-translate/core';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ]),
        ),
      ]),
    ]),
  ],
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    SublevelMenuComponent,
    TranslateModule,
    NgClass,
    NgIf,
    NgFor,
  ],
})
export class SidenavComponent implements OnInit {
  sidenavService = inject(SidenavService);
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData: Signal<INavbarData[]>;
  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  constructor(public router: Router) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.navData = computed(() => this.sidenavService.navdata());
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  handleClick(item: INavbarData): void {
    item.expanded = !item.expanded;

    if (item.items?.length && !this.collapsed) {
      this.toggleCollapse();
      item.expanded = true;
    }
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  logout() {
    this.onLogout.emit();
  }
}
