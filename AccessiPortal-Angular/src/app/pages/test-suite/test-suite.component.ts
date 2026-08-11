import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-test-suite',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="py-16 max-w-5xl mx-auto px-4 sm:px-6">
      
      <!-- Banner Header -->
      <div class="glass-panel p-8 sm:p-10 rounded-3xl mb-12 border border-sky-500/40 bg-gradient-to-r from-sky-950/80 via-slate-900 to-indigo-950/80 shadow-2xl relative overflow-hidden">
        <div class="relative z-10 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold uppercase border border-sky-400/30">
            <i class="pi pi-shield"></i> Dedicated AccessiMate Audit Suite
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-white">AccessiMate Widget Feature Tester</h1>
          <p class="text-slate-300 text-sm max-w-3xl leading-relaxed">
            Click the floating <strong class="text-sky-400">AccessiMate Widget Icon</strong> (usually located at the bottom corner) to activate real-time DOM accessibility tools across these live benchmarks.
          </p>
        </div>
      </div>

      <!-- Test Cases Cards Grid -->
      <div class="space-y-10">
        
        <!-- Benchmark 1: Contrast & Inversion -->
        <section class="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div class="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div class="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg">1</div>
            <div>
              <h2 class="text-xl font-bold text-white">Color Contrast & Inversion Test Benchmark</h2>
              <p class="text-xs text-slate-400">Evaluate High Contrast, Dark Mode, Light Mode, and Monochrome filters.</p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span class="text-[11px] font-bold uppercase text-sky-400 block mb-2">Standard Text (High Contrast)</span>
              <p class="text-slate-200 text-sm leading-relaxed">
                Standard high legibility text on dark slate surface conforming to 4.5:1 ratio targets.
              </p>
            </div>

            <div class="p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <span class="text-[11px] font-bold uppercase text-amber-400 block mb-2">⚠️ Low Contrast Sample</span>
              <p class="text-slate-500 text-sm leading-relaxed font-light">
                Intentionally low-contrast text to test how AccessiMate Contrast enhancer boosts readability.
              </p>
            </div>

            <div class="p-6 rounded-2xl bg-sky-950/60 border border-sky-500/30">
              <span class="text-[11px] font-bold uppercase text-sky-300 block mb-2">Inverted Accent Surface</span>
              <p class="text-sky-100 text-sm leading-relaxed">
                Colored cards should retain clear boundaries when color filters or monochrome modes are triggered.
              </p>
            </div>
          </div>
        </section>

        <!-- Benchmark 2: Typography & Scaling -->
        <section class="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div class="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg">2</div>
            <div>
              <h2 class="text-xl font-bold text-white">Typography Scaling & Dyslexia Font Sandbox</h2>
              <p class="text-xs text-slate-400">Test Font Resizing (+/-), Line Spacing, and Dyslexia-Friendly font replacement.</p>
            </div>
          </div>

          <div class="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 class="text-lg font-bold text-white">Sample Article: Digital Accessibility Charter</h3>
            <p class="text-slate-300 text-sm leading-relaxed">
              Web accessibility encompasses all disabilities affecting access to the web, including visual, auditory, physical, speech, cognitive, and neurological disabilities.
            </p>
            <p class="text-slate-400 text-xs leading-relaxed">
              When sites are correctly designed and coded, all users have equal access to information and functionality.
            </p>
          </div>
        </section>

        <!-- Benchmark 3: Focus Trapping & Keyboard Nav -->
        <section class="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
          <div class="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">3</div>
            <div>
              <h2 class="text-xl font-bold text-white">Keyboard Navigation & Focus Ring Test</h2>
              <p class="text-xs text-slate-400">Press <kbd class="px-2 py-0.5 rounded bg-slate-800 text-sky-400 font-mono text-xs">Tab</kbd> to cycle keyboard focus indicators.</p>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 items-center">
            <button class="px-5 py-3 rounded-xl bg-sky-500 text-slate-950 font-extrabold text-xs shadow-lg">
              Focus Button 1
            </button>
            <button class="px-5 py-3 rounded-xl bg-slate-900 text-slate-200 border border-slate-800 font-bold text-xs">
              Focus Button 2
            </button>
            <a href="javascript:void(0)" class="text-sky-400 font-bold text-xs underline px-3 py-2 rounded-xl focus:outline-none">
              Accessible Focusable Link
            </a>
            <input type="text" placeholder="Type for focus outline..." class="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs">
          </div>
        </section>

        <!-- Benchmark 4: Live Local Audit Logger -->
        <section class="glass-panel p-8 rounded-3xl border border-sky-500/30 bg-slate-900/60 space-y-6">
          <div class="flex items-center gap-3 pb-4 border-b border-slate-800">
            <div class="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center font-black text-lg">4</div>
            <div>
              <h2 class="text-xl font-bold text-white">Save Audit Log to Session</h2>
              <p class="text-xs text-slate-400">Persist your AccessiMate widget test observations directly in local session state.</p>
            </div>
          </div>

          <form (ngSubmit)="submitAuditLog()" class="space-y-4 max-w-xl">
            <div>
              <label for="feature" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Tested Feature</label>
              <select id="feature" [(ngModel)]="logForm.feature" name="feature" 
                      class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm">
                <option value="High Contrast Mode">High Contrast Mode</option>
                <option value="Font Resize / Text Magnifier">Font Resize / Text Magnifier</option>
                <option value="Screen Reader TTS Speech">Screen Reader TTS Speech</option>
                <option value="Dyslexia Font Replacement">Dyslexia Font Replacement</option>
                <option value="Keyboard Focus Highlight">Keyboard Focus Highlight</option>
              </select>
            </div>

            <div>
              <label for="rating" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Rating Score (1-5)</label>
              <input type="number" id="rating" [(ngModel)]="logForm.rating" name="rating" min="1" max="5" 
                     class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm">
            </div>

            <div>
              <label for="comment" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Test Observations</label>
              <textarea id="comment" [(ngModel)]="logForm.comment" name="comment" rows="3" 
                        class="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm"
                        placeholder="e.g. Contrast mode rendered text elements perfectly without layout shift..."></textarea>
            </div>

            <button type="submit" [disabled]="submittingLog" 
                    class="px-7 py-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-sky-500/20 disabled:opacity-50">
              <i *ngIf="submittingLog" class="pi pi-spin pi-spinner mr-2"></i>
              <span>Save Log to Session</span>
            </button>

            <p *ngIf="logSavedSuccess" class="text-emerald-400 font-bold text-xs flex items-center gap-1.5 pt-2">
              <i class="pi pi-check-circle"></i> Audit Record saved in local session memory!
            </p>
          </form>
        </section>

      </div>

    </div>
  `
})
export class TestSuiteComponent {
  logForm = {
    feature: 'High Contrast Mode',
    rating: 5,
    comment: '',
    pageUrl: 'http://localhost:3000/test-suite'
  };

  submittingLog = false;
  logSavedSuccess = false;

  constructor(private api: ApiService) {}

  submitAuditLog(): void {
    this.submittingLog = true;
    this.api.submitAccessibilityLog(this.logForm).subscribe({
      next: () => {
        this.submittingLog = false;
        this.logSavedSuccess = true;
        this.logForm.comment = '';
        setTimeout(() => this.logSavedSuccess = false, 4000);
      },
      error: () => {
        this.submittingLog = false;
        alert('Failed to save audit log.');
      }
    });
  }
}
