import { Component, inject } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { THEME_OPTIONS } from '../../../core/public-variables';
import { ThemeService } from '../../../core/services/theme.service';
import { Router } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-burger-menu',
  standalone: true,
  imports: [
    SidebarModule,
    AvatarModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
  ],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.scss',
})
export class BurgerMenuComponent {
  private router = inject(Router);

  themeService = inject(ThemeService);
  themeOptions = THEME_OPTIONS;
  sidebarVisible: boolean = false;
  themeValue = this.themeService.currentTheme();

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }
  navigateToCollections() {
    this.router.navigate(['./collections']);
    this.sidebarVisible = false;
  }
}
