import {
  Component,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ToolbarModule } from 'primeng/toolbar';
import { ThemeService } from '../../../core/services/theme.service';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { THEME_OPTIONS } from '../../../core/public-variables';
import { BurgerMenuComponent } from '../burger-menu/burger-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ToolbarModule,
    AvatarModule,
    OverlayPanelModule,
    ButtonModule,
    SelectButtonModule,
    FormsModule,
    BurgerMenuComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  overlayPanel = viewChild<OverlayPanel>('op');
  themeService = inject(ThemeService);

  themeOptions = THEME_OPTIONS;
  value = this.themeService.currentTheme();

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }

  navigateToCollections() {
    this.router.navigate(['./collections']);
    this.overlayPanel()!.hide();
  }

  navigateToDashboard() {
    this.router.navigate(['']);
  }
}
