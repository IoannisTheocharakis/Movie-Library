import { Inject, Injectable } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.loadTheme();
  }

  switchTheme(theme: string) {
    const themeLink = this.document.getElementById(
      'app-theme'
    ) as HTMLLinkElement;

    if (themeLink) {
      themeLink.href = theme + '.css';
      localStorage.setItem('theme', theme);
    }
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'saga-blue';
    this.switchTheme(savedTheme);
  }
}
