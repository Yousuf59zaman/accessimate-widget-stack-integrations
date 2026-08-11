import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService, Faq } from '../../services/api.service';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-16 max-w-4xl mx-auto px-4 sm:px-6">
      
      <div class="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <span class="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
          Help & Support Center
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h1>
        <p class="text-slate-400 text-base">Find answers regarding digital citizen services and WCAG accessibility standards.</p>
      </div>

      <div *ngIf="loading" class="text-center py-12">
        <i class="pi pi-spin pi-spinner text-sky-400 text-3xl"></i>
        <p class="text-slate-400 mt-2 text-sm">Loading FAQs...</p>
      </div>

      <div *ngIf="!loading" class="space-y-4" role="region">
        <div *ngFor="let faq of faqs; let i = index" 
             class="glass-panel rounded-2xl overflow-hidden border border-slate-800 transition-all duration-300">
          
          <button (click)="toggleFaq(i)"
                  [attr.aria-expanded]="openIndex === i"
                  class="w-full p-6 text-left font-bold text-white text-lg flex justify-between items-center gap-4 hover:bg-slate-900/60 focus:outline-none">
            <span>{{ faq.question }}</span>
            <div class="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center flex-shrink-0 text-sky-400">
              <i [class]="openIndex === i ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"></i>
            </div>
          </button>

          <div *ngIf="openIndex === i" 
               class="px-6 pb-6 pt-2 text-slate-300 text-sm leading-relaxed border-t border-slate-800/80 bg-slate-950/60">
            <p class="text-slate-300 leading-relaxed">{{ faq.answer }}</p>
            <span class="inline-block mt-4 px-3 py-1 rounded-lg text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Category: {{ faq.category }}
            </span>
          </div>
        </div>
      </div>

    </div>
  `
})
export class FaqsComponent implements OnInit {
  faqs: Faq[] = [];
  loading = true;
  openIndex: number | null = 0;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getFaqs().subscribe({
      next: (res) => {
        this.faqs = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  toggleFaq(index: number): void {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
