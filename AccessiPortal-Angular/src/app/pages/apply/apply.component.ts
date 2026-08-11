import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, ServiceCategory } from '../../services/api.service';

@Component({
  selector: 'app-apply',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="py-16 max-w-4xl mx-auto px-4 sm:px-6">
      
      <!-- Page Header -->
      <div class="mb-10 text-left">
        <a routerLink="/" class="text-sky-400 font-semibold text-xs inline-flex items-center gap-1.5 mb-3 hover:text-sky-300 transition-colors">
          <i class="pi pi-arrow-left text-[10px]"></i> Back to Home
        </a>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Citizen Service Application</h1>
        <p class="text-slate-400 text-sm mt-1">WCAG 2.1 AA Compliant Form. Tested for text scaling, high-contrast, and screen reader compatibility.</p>
      </div>

      <!-- Success Notification Alert -->
      <div *ngIf="submittedSuccess" role="alert" aria-live="assertive" 
           class="mb-10 p-8 bg-emerald-950/80 border border-emerald-500/40 rounded-3xl backdrop-blur-xl flex items-start gap-5 shadow-2xl">
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl flex-shrink-0">
          <i class="pi pi-check-circle"></i>
        </div>
        <div class="space-y-2">
          <h2 class="text-2xl font-bold text-white">Application Submitted Successfully!</h2>
          <p class="text-slate-300 text-sm">
            Your Tracking Number is: <strong class="text-emerald-400 font-mono text-xl block sm:inline mt-1 sm:mt-0 underline">{{ trackingNo }}</strong>
          </p>
          <p class="text-slate-400 text-xs pt-1">
            Store this code to check real-time status in the application directory.
          </p>
          <div class="pt-4 flex flex-wrap gap-4">
            <a routerLink="/tracking" [queryParams]="{ trackingNo: trackingNo }" 
               class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg">
              Track Application Status
            </a>
            <button (click)="resetForm()" class="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-xs hover:text-white">
              Submit Another Request
            </button>
          </div>
        </div>
      </div>

      <!-- Main Accessible Form -->
      <form *ngIf="!submittedSuccess" [formGroup]="applyForm" (ngSubmit)="onSubmit()" 
            class="glass-panel p-8 sm:p-10 rounded-3xl space-y-10 border border-slate-800 shadow-2xl" role="form">
        
        <!-- Step 1: Personal Info -->
        <fieldset class="space-y-6">
          <legend class="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-bold">1</span>
            Applicant Personal Information
          </legend>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="applicantName" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Full Name (English) <span class="text-rose-500">*</span>
              </label>
              <input type="text" id="applicantName" formControlName="applicantName"
                     class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm"
                     placeholder="e.g. Rahim Uddin"
                     [attr.aria-invalid]="isFieldInvalid('applicantName')">
              <p *ngIf="isFieldInvalid('applicantName')" class="text-rose-400 text-xs mt-1.5 font-semibold" role="alert">
                Full Name is required (minimum 3 characters).
              </p>
            </div>

            <div>
              <label for="nidNumber" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                National ID (NID) <span class="text-rose-500">*</span>
              </label>
              <input type="text" id="nidNumber" formControlName="nidNumber"
                     class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white font-mono focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm"
                     placeholder="1987345678901234"
                     [attr.aria-invalid]="isFieldInvalid('nidNumber')">
              <p *ngIf="isFieldInvalid('nidNumber')" class="text-rose-400 text-xs mt-1.5 font-semibold" role="alert">
                Valid 10 or 17 digit NID required.
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="email" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Email Address <span class="text-rose-500">*</span>
              </label>
              <input type="email" id="email" formControlName="email"
                     class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm"
                     placeholder="applicant@domain.gov.bd"
                     [attr.aria-invalid]="isFieldInvalid('email')">
              <p *ngIf="isFieldInvalid('email')" class="text-rose-400 text-xs mt-1.5 font-semibold" role="alert">
                Please enter a valid email address.
              </p>
            </div>

            <div>
              <label for="phone" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Mobile Number <span class="text-rose-500">*</span>
              </label>
              <input type="tel" id="phone" formControlName="phone"
                     class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white font-mono focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-sm"
                     placeholder="01711002233"
                     [attr.aria-invalid]="isFieldInvalid('phone')">
              <p *ngIf="isFieldInvalid('phone')" class="text-rose-400 text-xs mt-1.5 font-semibold" role="alert">
                Valid 11-digit mobile number required.
              </p>
            </div>
          </div>
        </fieldset>

        <!-- Step 2: Service Details -->
        <fieldset class="space-y-6">
          <legend class="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">2</span>
            Service Specification & Priority
          </legend>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label for="categoryId" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Service Category <span class="text-rose-500">*</span>
              </label>
              <select id="categoryId" formControlName="categoryId"
                      class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-sky-500 text-sm">
                <option value="">-- Select Category --</option>
                <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.title }}</option>
              </select>
            </div>

            <div>
              <label for="serviceType" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Specific Service Title <span class="text-rose-500">*</span>
              </label>
              <input type="text" id="serviceType" formControlName="serviceType"
                     class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white focus:border-sky-500 text-sm"
                     placeholder="e.g. Smart Card Re-issuance">
            </div>
          </div>

          <!-- Priority Radio Cards -->
          <div>
            <span class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Processing Priority Level:</span>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-sky-500/40 transition-all flex items-center gap-3">
                <input type="radio" formControlName="priority" value="Normal" class="text-sky-500 focus:ring-sky-500">
                <div>
                  <span class="block text-sm font-bold text-white">Normal</span>
                  <span class="text-[11px] text-slate-400">5-7 Business Days</span>
                </div>
              </label>

              <label class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-sky-500/40 transition-all flex items-center gap-3">
                <input type="radio" formControlName="priority" value="High" class="text-sky-500 focus:ring-sky-500">
                <div>
                  <span class="block text-sm font-bold text-amber-400">High</span>
                  <span class="text-[11px] text-slate-400">2-3 Business Days</span>
                </div>
              </label>

              <label class="p-4 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:border-sky-500/40 transition-all flex items-center gap-3">
                <input type="radio" formControlName="priority" value="Urgent" class="text-sky-500 focus:ring-sky-500">
                <div>
                  <span class="block text-sm font-bold text-rose-400">Urgent</span>
                  <span class="text-[11px] text-slate-400">24-Hour Express</span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label for="address" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Present Postal Address <span class="text-rose-500">*</span>
            </label>
            <textarea id="address" formControlName="address" rows="2"
                      class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white focus:border-sky-500 text-sm"
                      placeholder="House/Flat No, Ward, Upazila, District, Zip Code"></textarea>
          </div>

          <div>
            <label for="description" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Reason / Detailed Application Statement <span class="text-rose-500">*</span>
            </label>
            <textarea id="description" formControlName="description" rows="4"
                      class="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white focus:border-sky-500 text-sm"
                      placeholder="Explain the background details or correction requirements..."></textarea>
          </div>
        </fieldset>

        <!-- Terms Agreement -->
        <div class="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 flex items-start gap-3.5">
          <input type="checkbox" id="agreeTerms" formControlName="agreeTerms" class="w-5 h-5 mt-0.5 text-sky-500 rounded bg-slate-800 border-slate-700">
          <label for="agreeTerms" class="text-xs text-slate-300 leading-relaxed cursor-pointer">
            I hereby declare that all provided statements are true and authentic. Misrepresentation is punishable under Digital Citizen Charter regulations.
          </label>
        </div>

        <!-- Submit Actions -->
        <div class="flex items-center justify-end gap-4 pt-4 border-t border-slate-800">
          <button type="button" (click)="resetForm()" 
                  class="px-6 py-3 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-xs hover:text-white">
            Reset
          </button>
          <button type="submit" [disabled]="applyForm.invalid || submitting" 
                  class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-xl shadow-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed">
            <i *ngIf="submitting" class="pi pi-spin pi-spinner mr-2"></i>
            <span *ngIf="!submitting">Submit Application</span>
          </button>
        </div>

      </form>

    </div>
  `
})
export class ApplyComponent implements OnInit {
  applyForm: FormGroup;
  categories: ServiceCategory[] = [];
  submitting = false;
  submittedSuccess = false;
  trackingNo = '';

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute
  ) {
    this.applyForm = this.fb.group({
      applicantName: ['', [Validators.required, Validators.minLength(3)]],
      nidNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10,17}$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{11}$')]],
      categoryId: ['', Validators.required],
      serviceType: ['', Validators.required],
      priority: ['Normal', Validators.required],
      address: ['', Validators.required],
      description: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.api.getCategories().subscribe(res => {
      this.categories = res.data;
      this.route.queryParams.subscribe(params => {
        if (params['category']) {
          this.applyForm.patchValue({ categoryId: params['category'] });
        }
      });
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.applyForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.applyForm.invalid) {
      this.applyForm.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.api.createApplication(this.applyForm.value).subscribe({
      next: (res) => {
        this.submitting = false;
        this.submittedSuccess = true;
        this.trackingNo = res.data.trackingNo;
      },
      error: () => {
        this.submitting = false;
        alert('Submission failed. Check backend connection.');
      }
    });
  }

  resetForm(): void {
    this.applyForm.reset({ priority: 'Normal', agreeTerms: false });
    this.submittedSuccess = false;
    this.trackingNo = '';
  }
}
