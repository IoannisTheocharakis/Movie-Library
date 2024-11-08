import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ToolbarModule } from 'primeng/toolbar';
import { ThemeService } from '../../../core/services/theme.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, AvatarModule, OverlayPanelModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  themeService = inject(ThemeService);

  changeTheme(theme: string) {
    this.themeService.switchTheme(theme);
  }
  
  navigateToCollections() {
    this.router.navigate(['./collections']);
  }

  navigateToDashboard() {
    this.router.navigate(['']);
  }
}
