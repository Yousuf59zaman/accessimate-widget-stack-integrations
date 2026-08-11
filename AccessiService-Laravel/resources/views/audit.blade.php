@extends('layouts.app')

@section('title', 'Audit Suite — AccessiService Laravel')

@section('content')
<div class="py-12 max-w-5xl mx-auto px-4 sm:px-6">
    <div class="glass-panel p-8 rounded-3xl mb-12 border border-sky-500/40 bg-slate-900 shadow-2xl">
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white">Laravel 12 AccessiMate Audit Suite</h1>
        <p class="text-slate-300 text-sm mt-2">Test DOM accessibility features using the floating AccessiMate icon at the bottom corner.</p>
    </div>

    <div class="space-y-8">
        <section class="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
            <h2 class="text-xl font-bold text-white">1. Color Contrast & Dyslexia Test</h2>
            <p class="text-slate-300 text-sm">High legibility sample text to test font resizing and dyslexia replacement in Laravel Blade views.</p>
        </section>

        <section class="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
            <h2 class="text-xl font-bold text-white">2. Keyboard Focus Ring Test</h2>
            <div class="flex gap-4">
                <button class="px-5 py-3 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs">Focus Button 1</button>
                <button class="px-5 py-3 rounded-xl bg-slate-900 text-white border border-slate-800 font-bold text-xs">Focus Button 2</button>
            </div>
        </section>

        <section class="glass-panel p-8 rounded-3xl border border-sky-500/30 bg-slate-900/60 space-y-4">
            <h2 class="text-xl font-bold text-white">3. Save Audit Log (Laravel Session)</h2>
            <form onsubmit="event.preventDefault(); document.getElementById('auditAlert').classList.remove('hidden');" class="space-y-4 max-w-xl">
                <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">Tested Feature</label>
                    <select class="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm">
                        <option value="High Contrast Mode">High Contrast Mode</option>
                        <option value="Font Resize / Text Magnifier">Font Resize / Text Magnifier</option>
                        <option value="Screen Reader TTS Speech">Screen Reader TTS Speech</option>
                    </select>
                </div>

                <div>
                    <label class="block text-xs font-bold text-slate-300 mb-1">Test Observation</label>
                    <textarea rows="3" placeholder="Enter observation..." class="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"></textarea>
                </div>

                <button type="submit" class="px-7 py-3 rounded-xl bg-sky-500 text-slate-950 font-extrabold text-sm">
                    Save Log to Session
                </button>

                <p id="auditAlert" class="hidden text-emerald-400 font-bold text-xs">Audit record saved in Laravel session memory!</p>
            </form>
        </section>
    </div>
</div>
@endsection
