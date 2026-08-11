import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="bg-slate-950 text-slate-400 mt-24 border-t border-slate-800/80 relative overflow-hidden" role="contentinfo">
      <!-- Background glow -->
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-sky-500/5 blur-3xl rounded-full pointer-events-none"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-sky-500/20">
                <i class="pi pi-shield"></i>
              </div>
              <span class="text-xl font-extrabold text-white tracking-tight">AccessiPortal</span>
            </div>
            <p class="text-slate-400 text-sm leading-relaxed">
              Official testing environment built for OrangeBD to evaluate WCAG 2.1 AA accessibility standards with the AccessiMate widget.
            </p>
          </div>

          <div>
            <h3 class="text-slate-200 font-bold text-sm uppercase tracking-wider mb-4">Quick Navigation</h3>
            <ul class="space-y-2.5 text-sm">
              <li><a href="/" class="hover:text-sky-400 transition-colors">Citizen Home</a></li>
              <li><a href="/apply" class="hover:text-sky-400 transition-colors">Submit Application</a></li>
              <li><a href="/tracking" class="hover:text-sky-400 transition-colors">Track Status & Directory</a></li>
              <li><a href="/faqs" class="hover:text-sky-400 transition-colors">Help Center & FAQs</a></li>
              <li><a href="/test-suite" class="hover:text-sky-400 transition-colors">AccessiMate Test Suite</a></li>
            </ul>
          </div>

          <div>
            <h3 class="text-slate-200 font-bold text-sm uppercase tracking-wider mb-4">Widget Capabilities</h3>
            <ul class="space-y-2.5 text-sm">
              <li class="flex items-center gap-2"><i class="pi pi-check-circle text-sky-400"></i> High Contrast & Dark Mode</li>
              <li class="flex items-center gap-2"><i class="pi pi-check-circle text-sky-400"></i> Text Magnification & Line Height</li>
              <li class="flex items-center gap-2"><i class="pi pi-check-circle text-sky-400"></i> Screen Reader TTS Reader</li>
              <li class="flex items-center gap-2"><i class="pi pi-check-circle text-sky-400"></i> Dyslexia Friendly Fonts</li>
              <li class="flex items-center gap-2"><i class="pi pi-check-circle text-sky-400"></i> Keyboard Focus Trapping</li>
            </ul>
          </div>

          <div>
            <h3 class="text-slate-200 font-bold text-sm uppercase tracking-wider mb-4">Integration Telemetry</h3>
            <div class="glass-panel p-4 rounded-2xl space-y-3">
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-400">AccessiMate Widget</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">● Connected</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-400">Backend API</span>
                <span class="text-sky-400 font-mono">NestJS + Prisma</span>
              </div>
              <div class="flex items-center justify-between text-xs">
                <span class="text-slate-400">Database</span>
                <span class="text-indigo-400 font-mono">PostgreSQL (Docker)</span>
              </div>
            </div>
          </div>

        </div>

        <div class="border-t border-slate-800/80 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© 2026 AccessiPortal. Crafted for OrangeBD Web Accessibility Suite Testing.</p>
          <div class="flex gap-6">
            <span class="text-slate-400">WCAG 2.1 Level AA Ready</span>
            <span class="text-slate-400">Angular 17+ Standalone</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {}
