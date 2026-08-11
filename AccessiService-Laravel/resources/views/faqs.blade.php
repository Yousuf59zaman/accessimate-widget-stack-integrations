@extends('layouts.app')

@section('title', 'FAQs — AccessiService Laravel')

@section('content')
<div class="py-12 max-w-4xl mx-auto px-4 sm:px-6">
    <div class="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span class="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">Help Center</span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h1>
    </div>

    <div class="space-y-4">
        @foreach($faqs as $i => $faq)
        <details class="glass-panel rounded-2xl overflow-hidden border border-slate-800 group" {{ $i === 0 ? 'open' : '' }}>
            <summary class="w-full p-6 text-left font-bold text-white text-lg flex justify-between items-center cursor-pointer select-none">
                <span>{{ $faq['question'] }}</span>
                <i class="pi pi-chevron-down text-sky-400 group-open:rotate-180 transition-transform"></i>
            </summary>
            <div class="px-6 pb-6 pt-2 text-slate-300 text-sm border-t border-slate-800 bg-slate-955">
                <p>{{ $faq['answer'] }}</p>
            </div>
        </details>
        @endforeach
    </div>
</div>
@endsection
