import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80" role="banner">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
          
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-3.5 group focus:outline-none" aria-label="AccessiPortal Home">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300">
              <div class="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-sky-400">
                <i class="pi pi-shield text-xl"></i>
              </div>
            </div>
            <div>
              <span class="text-xl font-extrabold text-gradient-sky block tracking-tight">AccessiPortal</span>
              <span class="text-[10px] font-bold text-slate-400 tracking-wider uppercase block">Citizen Services & Audit</span>
            </div>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60" role="navigation" aria-label="Main Navigation">
            <a routerLink="/" routerLinkActive="bg-sky-500/10 text-sky-400 border-sky-500/30" [routerLinkActiveOptions]="{exact: true}" 
               class="px-4 py-2 rounded-xl text-slate-300 font-semibold text-sm border border-transparent hover:text-white hover:bg-slate-800/50 transition-all">
              <i class="pi pi-home text-xs mr-1.5"></i> Home
            </a>
            <a routerLink="/apply" routerLinkActive="bg-sky-500/10 text-sky-400 border-sky-500/30"
               class="px-4 py-2 rounded-xl text-slate-300 font-semibold text-sm border border-transparent hover:text-white hover:bg-slate-800/50 transition-all">
              <i class="pi pi-file-edit text-xs mr-1.5"></i> Apply Online
            </a>
            <a routerLink="/tracking" routerLinkActive="bg-sky-500/10 text-sky-400 border-sky-500/30"
               class="px-4 py-2 rounded-xl text-slate-300 font-semibold text-sm border border-transparent hover:text-white hover:bg-slate-800/50 transition-all">
              <i class="pi pi-search text-xs mr-1.5"></i> Track & Directory
            </a>
            <a routerLink="/faqs" routerLinkActive="bg-sky-500/10 text-sky-400 border-sky-500/30"
               class="px-4 py-2 rounded-xl text-slate-300 font-semibold text-sm border border-transparent hover:text-white hover:bg-slate-800/50 transition-all">
              <i class="pi pi-question-circle text-xs mr-1.5"></i> Help & FAQs
            </a>
          </nav>

          <!-- Right Action & Theme Toggle -->
          <div class="hidden lg:flex items-center gap-3">
            
            <!-- Light / Dark Mode Toggle Button -->
            <button (click)="themeService.toggleTheme()" 
                    aria-label="Toggle Light and Dark Theme Mode"
                    class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all flex items-center gap-2 text-xs font-bold shadow-md">
              <i [class]="themeService.isDarkMode ? 'pi pi-sun text-amber-400' : 'pi pi-moon text-indigo-400'"></i>
              <span>{{ themeService.isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
            </button>

            <a routerLink="/test-suite" routerLinkActive="ring-2 ring-sky-500"
               class="relative group px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 hover:scale-[1.02] transition-all flex items-center gap-2">
              <i class="pi pi-sliders-h"></i> AccessiMate Audit Suite
              <span class="absolute -top-1 -right-1 flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
              </span>
            </a>
          </div>

          <!-- Mobile Toggle Buttons -->
          <div class="flex items-center gap-2 md:hidden">
            <button (click)="themeService.toggleTheme()" 
                    aria-label="Toggle Light/Dark Theme"
                    class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300">
              <i [class]="themeService.isDarkMode ? 'pi pi-sun text-amber-400' : 'pi pi-moon text-indigo-400'"></i>
            </button>

            <button (click)="isMenuOpen = !isMenuOpen" 
                    [attr.aria-expanded]="isMenuOpen" 
                    aria-label="Toggle navigation menu"
                    class="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none">
              <i [class]="isMenuOpen ? 'pi pi-times text-lg' : 'pi pi-bars text-lg'"></i>
            </button>
          </div>

        </div>
      </div>

      <!-- Mobile Navigation Dropdown -->
      <div *ngIf="isMenuOpen" class="md:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
        <a routerLink="/" (click)="isMenuOpen = false" class="block px-4 py-3 rounded-xl text-slate-300 font-semibold hover:bg-slate-800 hover:text-white">Home</a>
        <a routerLink="/apply" (click)="isMenuOpen = false" class="block px-4 py-3 rounded-xl text-slate-300 font-semibold hover:bg-slate-800 hover:text-white">Apply Online</a>
        <a routerLink="/tracking" (click)="isMenuOpen = false" class="block px-4 py-3 rounded-xl text-slate-300 font-semibold hover:bg-slate-800 hover:text-white">Track & Directory</a>
        <a routerLink="/faqs" (click)="isMenuOpen = false" class="block px-4 py-3 rounded-xl text-slate-300 font-semibold hover:bg-slate-800 hover:text-white">Help & FAQs</a>
        <a routerLink="/test-suite" (click)="isMenuOpen = false" class="block px-4 py-3 rounded-xl text-sky-400 font-bold bg-sky-500/10 border border-sky-500/30">AccessiMate Audit Suite</a>
      </div>
    </header>
  `
})
export class NavbarComponent {
  isMenuOpen = false;

  constructor(public themeService: ThemeService) {}
}
