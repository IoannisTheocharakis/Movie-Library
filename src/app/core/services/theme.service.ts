import { Inject, Injectable, signal } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme = signal<string>('');

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

    this.currentTheme.set(theme);
  }

  private loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light-theme';

    this.switchTheme(savedTheme);
  }
}
