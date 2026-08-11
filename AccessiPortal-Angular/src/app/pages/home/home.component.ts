import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, ServiceCategory } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-12 pb-24 bg-grid-pattern bg-radial-gradient">
      
      <!-- Glowing background decorative blobs -->
      <div class="absolute top-10 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl animate-blob pointer-events-none"></div>
      <div class="absolute top-20 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <!-- Left Column Hero Info -->
          <div class="lg:col-span-7 space-y-8 text-left">
            
            <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg shadow-sky-500/5">
              <span class="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              Official AccessiMate Testbed Platform
            </div>

            <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Empowering Every Citizen with <span class="text-gradient-sky">Accessible Services</span>
            </h1>

            <p class="text-slate-300 text-lg leading-relaxed max-w-2xl font-normal">
              Experience the next generation of digital citizen governance. Test font magnification, contrast modes, keyboard focus halos, and text-to-speech interaction powered by the <strong class="text-sky-400">AccessiMate Accessibility Widget</strong>.
            </p>

            <!-- Dual Action Buttons -->
            <div class="flex flex-wrap gap-4 pt-2">
              <a routerLink="/apply" 
                 class="px-7 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] transition-all flex items-center gap-3">
                <i class="pi pi-send text-lg"></i> Apply for Service
              </a>
              
              <a routerLink="/test-suite" 
                 class="px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-base hover:scale-[1.02] transition-all flex items-center gap-3">
                <i class="pi pi-sliders-h text-sky-400 text-lg"></i> Open Audit Suite
              </a>
            </div>

            <!-- Key Metrics Bar -->
            <div class="pt-6 grid grid-cols-3 gap-6 border-t border-slate-800/80 max-w-xl">
              <div>
                <div class="text-2xl sm:text-3xl font-black text-white">100%</div>
                <div class="text-xs font-semibold text-slate-400">WCAG 2.1 AA Target</div>
              </div>
              <div>
                <div class="text-2xl sm:text-3xl font-black text-sky-400">Angular</div>
                <div class="text-xs font-semibold text-slate-400">Standalone Static Mode</div>
              </div>
              <div>
                <div class="text-2xl sm:text-3xl font-black text-indigo-400">Instant</div>
                <div class="text-xs font-semibold text-slate-400">Application Track</div>
              </div>
            </div>

          </div>

          <!-- Right Column Live Interactive Card -->
          <div class="lg:col-span-5">
            <div class="glass-panel p-6 rounded-3xl relative overflow-hidden border border-slate-800 shadow-2xl">
              <div class="flex items-center justify-between pb-4 mb-5 border-b border-slate-800">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-xs font-bold text-slate-200 uppercase tracking-wider">Live System Monitor</span>
                </div>
                <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  Static Engine Active
                </span>
              </div>

              <!-- Live Card Items -->
              <div class="space-y-4">
                <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between group hover:border-sky-500/40 transition-colors">
                  <div class="flex items-center gap-3.5">
                    <div class="w-11 h-11 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-lg">
                      <i class="pi pi-id-card"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-white">Smart NID Services</h3>
                      <p class="text-xs text-slate-400">Correction & Card Status</p>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-800 text-sky-300">Operational</span>
                </div>

                <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between group hover:border-emerald-500/40 transition-colors">
                  <div class="flex items-center gap-3.5">
                    <div class="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">
                      <i class="pi pi-briefcase"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-white">Trade License Center</h3>
                      <p class="text-xs text-slate-400">Business Registration</p>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-800 text-emerald-300">Fast Track</span>
                </div>

                <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between group hover:border-purple-500/40 transition-colors">
                  <div class="flex items-center gap-3.5">
                    <div class="w-11 h-11 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg">
                      <i class="pi pi-heart"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-white">Social Safety Net</h3>
                      <p class="text-xs text-slate-400">Pensions & Allowances</p>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-800 text-purple-300">Open Grants</span>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-slate-800 text-center">
                <a routerLink="/tracking" class="text-xs font-bold text-sky-400 hover:text-sky-300 inline-flex items-center gap-1.5">
                  View All Service Records <i class="pi pi-arrow-right text-[10px]"></i>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Services Grid Section -->
    <section class="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
          Digital Citizen Services
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Available Service Portals</h2>
        <p class="text-slate-400 text-base">Select any service category to open an accessible form with live validation alerts.</p>
      </div>

      <div *ngIf="loading" class="text-center py-16">
        <i class="pi pi-spin pi-spinner text-sky-400 text-3xl"></i>
        <p class="text-slate-400 mt-3 text-sm">Loading service categories...</p>
      </div>

      <div *ngIf="!loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div *ngFor="let cat of categories" 
             class="glass-panel p-7 rounded-3xl glass-panel-hover flex flex-col justify-between group">
          <div>
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 text-sky-400 flex items-center justify-center text-2xl mb-6 group-hover:from-sky-500 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300">
              <i [class]="cat.icon"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-2.5 group-hover:text-sky-300 transition-colors">{{ cat.title }}</h3>
            <p class="text-slate-400 text-sm leading-relaxed mb-6">{{ cat.description }}</p>
          </div>
          
          <a [routerLink]="['/apply']" [queryParams]="{ category: cat.id }" 
             class="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-sky-600 hover:text-white text-sky-400 font-bold text-xs flex items-center justify-between border border-slate-800 transition-all">
            <span>Apply Online</span>
            <i class="pi pi-arrow-right text-xs"></i>
          </a>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit {
  categories: ServiceCategory[] = [];
  loading = true;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
