import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, CitizenApplication } from '../../services/api.service';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Page Title -->
      <div class="mb-10 text-left">
        <span class="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
          Public Records & Tracking
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">Application Directory & Lookup</h1>
        <p class="text-slate-400 text-sm mt-1">Track application status or search citizen service application records.</p>
      </div>

      <!-- Quick Track Search Card -->
      <div class="glass-panel p-8 rounded-3xl mb-10 border border-sky-500/30 bg-gradient-to-r from-slate-900 via-sky-950/40 to-slate-900 shadow-2xl relative overflow-hidden">
        <div class="relative z-10 space-y-4">
          <h2 class="text-lg font-bold text-white flex items-center gap-2">
            <i class="pi pi-search text-sky-400"></i> Direct Application Lookup
          </h2>
          <form (ngSubmit)="onDirectTrack()" class="flex flex-col sm:flex-row gap-3">
            <input type="text" [(ngModel)]="trackInput" name="trackInput"
                   placeholder="Enter Tracking No (e.g. APP-2026-8901)"
                   class="flex-1 px-5 py-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-white font-mono text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500">
            <button type="submit" 
                    class="px-7 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-sky-500/20">
              Lookup Code
            </button>
          </form>

          <!-- Direct Result Banner -->
          <div *ngIf="trackedResult !== undefined" class="mt-4 p-5 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div *ngIf="trackedResult" class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span class="text-xs uppercase font-mono text-sky-400 font-bold">Record Found: {{ trackedResult.trackingNo }}</span>
                <h3 class="text-lg font-bold text-white mt-0.5">{{ trackedResult.applicantName }}</h3>
                <p class="text-xs text-slate-400">{{ trackedResult.serviceType }} • Submitted: {{ trackedResult.submittedAt | date:'mediumDate' }}</p>
              </div>
              <div class="flex items-center gap-3">
                <span [class]="getBadgeClass(trackedResult.status)">{{ trackedResult.status }}</span>
                <button (click)="openDetailModal(trackedResult)" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs">
                  Full Details
                </button>
              </div>
            </div>
            <div *ngIf="trackedResult === null" class="text-amber-400 font-medium text-xs flex items-center gap-2">
              <i class="pi pi-exclamation-triangle"></i> No record matching tracking code "{{ trackInput }}".
            </div>
          </div>
        </div>
      </div>

      <!-- Filters Bar -->
      <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <!-- Search Input -->
        <div class="relative w-full md:w-96">
          <i class="pi pi-search absolute left-4 top-3.5 text-slate-500"></i>
          <input type="text" [(ngModel)]="searchQuery" (input)="loadApplications()"
                 placeholder="Search Name, NID, or Service..."
                 class="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white text-sm focus:border-sky-500">
        </div>

        <!-- Status Filter Pills -->
        <div class="flex flex-wrap gap-2 w-full md:w-auto" role="tablist">
          <button *ngFor="let s of statuses"
                  (click)="selectStatus(s)"
                  [class]="selectedStatus === s ? 'bg-sky-500/20 text-sky-400 border-sky-500/50 font-bold' : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'"
                  class="px-4 py-2 rounded-xl text-xs border transition-colors" role="tab">
            {{ s }}
          </button>
        </div>
      </div>

      <!-- Data Table Card -->
      <div class="glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse" role="table">
            <caption class="sr-only">Applications Directory Table</caption>
            <thead class="bg-slate-900/90 border-b border-slate-800 text-[11px] uppercase font-bold text-slate-400 tracking-wider">
              <tr>
                <th scope="col" class="py-4 px-6">Tracking No</th>
                <th scope="col" class="py-4 px-6">Applicant Name</th>
                <th scope="col" class="py-4 px-6">NID Number</th>
                <th scope="col" class="py-4 px-6">Service Title</th>
                <th scope="col" class="py-4 px-6">Priority</th>
                <th scope="col" class="py-4 px-6">Status</th>
                <th scope="col" class="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-800/80 text-sm">
              <tr *ngIf="loading" class="text-center">
                <td colspan="7" class="py-12 text-slate-400">
                  <i class="pi pi-spin pi-spinner text-sky-400 text-2xl mr-2"></i> Loading applications...
                </td>
              </tr>

              <tr *ngIf="!loading && applications.length === 0">
                <td colspan="7" class="py-16 text-center text-slate-500">
                  <i class="pi pi-inbox text-4xl text-slate-600 block mb-3"></i>
                  No records match your query.
                </td>
              </tr>

              <tr *ngFor="let app of applications" class="hover:bg-slate-900/60 transition-colors">
                <td class="py-4 px-6 font-mono font-bold text-sky-400">
                  {{ app.trackingNo }}
                </td>
                <td class="py-4 px-6 font-bold text-white">
                  {{ app.applicantName }}
                </td>
                <td class="py-4 px-6 font-mono text-slate-400 text-xs">
                  {{ app.nidNumber }}
                </td>
                <td class="py-4 px-6 text-slate-300 font-medium">
                  {{ app.serviceType }}
                </td>
                <td class="py-4 px-6">
                  <span [class]="getPriorityClass(app.priority)">{{ app.priority }}</span>
                </td>
                <td class="py-4 px-6">
                  <span [class]="getBadgeClass(app.status)">{{ app.status }}</span>
                </td>
                <td class="py-4 px-6 text-right">
                  <button (click)="openDetailModal(app)" 
                          class="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-sky-500/20 hover:text-sky-300 text-slate-300 border border-slate-800 text-xs font-semibold">
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>

    <!-- Application Details Popup Modal -->
    <div *ngIf="selectedAppModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md" role="dialog">
      <div class="glass-panel max-w-xl w-full p-8 space-y-6 rounded-3xl border border-slate-800 shadow-2xl relative">
        <div class="flex justify-between items-center border-b border-slate-800 pb-4">
          <div>
            <span class="text-xs uppercase font-mono text-sky-400 font-bold">Reference Application</span>
            <h2 class="text-2xl font-bold text-white mt-0.5">{{ selectedAppModal.trackingNo }}</h2>
          </div>
          <button (click)="selectedAppModal = null" class="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800">
            <i class="pi pi-times text-lg"></i>
          </button>
        </div>

        <div class="space-y-4 text-sm">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <span class="text-xs text-slate-400 uppercase font-bold block mb-1">Applicant Name</span>
              <span class="font-bold text-white text-base">{{ selectedAppModal.applicantName }}</span>
            </div>
            <div>
              <span class="text-xs text-slate-400 uppercase font-bold block mb-1">NID Number</span>
              <span class="font-mono text-slate-300">{{ selectedAppModal.nidNumber }}</span>
            </div>
            <div>
              <span class="text-xs text-slate-400 uppercase font-bold block mb-1">Email Address</span>
              <span class="text-slate-300">{{ selectedAppModal.email }}</span>
            </div>
            <div>
              <span class="text-xs text-slate-400 uppercase font-bold block mb-1">Mobile Phone</span>
              <span class="font-mono text-slate-300">{{ selectedAppModal.phone }}</span>
            </div>
          </div>

          <div class="border-t border-slate-800 pt-3">
            <span class="text-xs text-slate-400 uppercase font-bold block mb-1">Postal Address</span>
            <p class="text-slate-300">{{ selectedAppModal.address }}</p>
          </div>

          <div class="border-t border-slate-800 pt-3">
            <span class="text-xs text-slate-400 uppercase font-bold block mb-1">Application Statement</span>
            <p class="text-slate-300 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs leading-relaxed">{{ selectedAppModal.description }}</p>
          </div>
        </div>

        <div class="border-t border-slate-800 pt-4 flex justify-end">
          <button (click)="selectedAppModal = null" class="px-6 py-2.5 rounded-xl bg-sky-500 text-slate-950 font-extrabold text-xs">
            Close Modal
          </button>
        </div>
      </div>
    </div>
  `
})
export class TrackingComponent implements OnInit {
  applications: CitizenApplication[] = [];
  statuses = ['All', 'Pending', 'In Progress', 'Approved', 'Rejected'];
  selectedStatus = 'All';
  searchQuery = '';
  loading = true;

  trackInput = '';
  trackedResult: CitizenApplication | null | undefined = undefined;

  selectedAppModal: CitizenApplication | null = null;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['trackingNo']) {
        this.trackInput = params['trackingNo'];
        this.onDirectTrack();
      }
    });
    this.loadApplications();
  }

  loadApplications(): void {
    this.loading = true;
    this.api.getApplications(this.searchQuery, this.selectedStatus).subscribe({
      next: (res) => {
        this.applications = res.data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  selectStatus(status: string): void {
    this.selectedStatus = status;
    this.loadApplications();
  }

  onDirectTrack(): void {
    if (!this.trackInput.trim()) return;
    this.api.trackApplication(this.trackInput.trim()).subscribe({
      next: (res) => {
        this.trackedResult = res.data || null;
      },
      error: () => {
        this.trackedResult = null;
      }
    });
  }

  openDetailModal(app: CitizenApplication): void {
    this.selectedAppModal = app;
  }

  getBadgeClass(status: string): string {
    switch (status) {
      case 'Approved': return 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
      case 'In Progress': return 'px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30';
      case 'Pending': return 'px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30';
      case 'Rejected': return 'px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30';
      default: return 'px-3 py-1 rounded-full text-xs font-bold bg-slate-800 text-slate-300';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'Urgent': return 'text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-md border border-rose-500/30';
      case 'High': return 'text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-md border border-amber-500/30';
      default: return 'text-[11px] font-semibold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded-md border border-slate-800';
    }
  }
}
