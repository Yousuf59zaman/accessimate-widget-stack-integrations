@extends('layouts.app')

@section('title', 'Apply for E-Services — AccessiService Laravel')

@section('content')
<div class="py-12 max-w-4xl mx-auto px-4 sm:px-6">
    <div class="mb-10 text-left">
        <a href="{{ route('home') }}" class="text-sky-400 font-semibold text-xs inline-flex items-center gap-1.5 mb-3 hover:text-sky-300">
            <i class="pi pi-arrow-left"></i> Back to Home
        </a>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Citizen E-Services Application Form</h1>
        <p class="text-slate-400 text-sm mt-1">WCAG 2.1 AA Accessible Form. Built with Laravel Blade templates.</p>
    </div>

    <form action="{{ route('directory') }}" method="GET" class="glass-panel p-8 sm:p-10 rounded-3xl space-y-8 border border-slate-800 shadow-2xl">
        <fieldset class="space-y-6">
            <legend class="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
                <span class="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-bold">1</span>
                Citizen Personal & NID Data
            </legend>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="citizenName" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Citizen Full Name *</label>
                    <input type="text" id="citizenName" name="citizenName" required placeholder="e.g. Tariqul Islam" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
                </div>

                <div>
                    <label for="nidNumber" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">National ID (NID) *</label>
                    <input type="text" id="nidNumber" name="nidNumber" required placeholder="1987123456789012" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm" />
                </div>
            </div>
        </fieldset>

        <fieldset class="space-y-6">
            <legend class="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
                <span class="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">2</span>
                Service Selection
            </legend>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label for="serviceId" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Government Program *</label>
                    <select id="serviceId" name="serviceId" required class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm">
                        <option value="">-- Select Service --</option>
                        @foreach($services as $s)
                        <option value="{{ $s['id'] }}" {{ $selectedId == $s['id'] ? 'selected' : '' }}>{{ $s['title'] }}</option>
                        @endforeach
                    </select>
                </div>

                <div>
                    <label for="district" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">District Jurisdiction</label>
                    <input type="text" id="district" name="district" placeholder="e.g. Dhaka" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
                </div>
            </div>
        </fieldset>

        <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
            <input type="checkbox" id="agreeTerms" required class="w-5 h-5 text-sky-500 rounded bg-slate-800" />
            <label for="agreeTerms" class="text-xs text-slate-300">I declare all provided citizen information is authentic.</label>
        </div>

        <div class="flex justify-end gap-4 pt-4 border-t border-slate-800">
            <button type="submit" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-sm shadow-xl">
                Submit Application
            </button>
        </div>
    </form>
</div>
@endsection
