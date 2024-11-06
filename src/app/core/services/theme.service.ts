import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isBrowser: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformID: Object
  ) {
    // Check if running in browser
    this.isBrowser = isPlatformBrowser(this.platformID);
    // Load theme if in browser
    this.loadTheme();
  }

  switchTheme(theme: string) {
    if (this.isBrowser) {
      const themeLink = this.document.getElementById(
        'app-theme'
      ) as HTMLLinkElement;

      if (themeLink) {
        themeLink.href = theme + '.css';
        localStorage.setItem('theme', theme); // Save selected theme to local storage
      }
    }
  }

  private loadTheme() {
    if (this.isBrowser) {
      const savedTheme = localStorage.getItem('theme') || 'saga-blue';
      this.switchTheme(savedTheme);
    }
  }
}
