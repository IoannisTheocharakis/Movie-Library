import { Component, inject, viewChild } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ToolbarModule } from 'primeng/toolbar';
import { ThemeService } from '../../../core/services/theme.service';
import { OverlayPanel, OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';

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
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  overlayPanel = viewChild<OverlayPanel>('op');
  themeService = inject(ThemeService);
  stateOptions = [
    { label: 'Light', icon: 'pi pi-moon', value: 'light-theme' },
    { label: 'Dark', icon: 'pi pi-sun', value: 'dark-theme' },
  ];
  
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
