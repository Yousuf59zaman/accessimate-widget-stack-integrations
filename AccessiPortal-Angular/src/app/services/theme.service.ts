import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDark = true;

  constructor() {
    const savedTheme = localStorage.getItem('accessi-theme');
    if (savedTheme === 'light') {
      this.setTheme(false);
    } else {
      this.setTheme(true);
    }
  }

  get isDarkMode(): boolean {
    return this.isDark;
  }

  toggleTheme(): void {
    this.setTheme(!this.isDark);
  }

  setTheme(isDark: boolean): void {
    this.isDark = isDark;
    const htmlEl = document.documentElement;
    if (isDark) {
      htmlEl.classList.add('dark');
      htmlEl.classList.remove('light');
      localStorage.setItem('accessi-theme', 'dark');
    } else {
      htmlEl.classList.remove('dark');
      htmlEl.classList.add('light');
      localStorage.setItem('accessi-theme', 'light');
    }
  }
}
