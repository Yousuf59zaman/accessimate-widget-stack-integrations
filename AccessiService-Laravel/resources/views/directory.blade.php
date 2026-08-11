@extends('layouts.app')

@section('title', 'Citizen Directory — AccessiService Laravel')

@section('content')
<div class="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mb-10 text-left">
        <span class="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
            Verification & Directory
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-3">Citizen Applications & Smart ID Directory</h1>
    </div>

    <!-- Lookup Box -->
    <div class="glass-panel p-8 rounded-3xl mb-10 border border-sky-500/30 bg-slate-900 shadow-2xl">
        <h2 class="text-lg font-bold text-white mb-3">Direct Citizen Application Lookup</h2>
        <form action="{{ route('directory') }}" method="GET" class="flex gap-3">
            <input type="text" name="search" value="{{ $search }}" placeholder="Enter Reference Code (e.g. LAR-2026-8001)" class="flex-1 px-5 py-3 rounded-2xl bg-slate-955 border border-slate-800 text-white font-mono text-sm" />
            <button type="submit" class="px-7 py-3 rounded-2xl bg-sky-500 text-slate-950 font-extrabold text-sm shadow-lg">Lookup</button>
        </form>
    </div>

    <!-- Data Table -->
    <div class="glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <table class="w-full text-left border-collapse">
            <thead class="bg-slate-900 border-b border-slate-800 text-[11px] uppercase font-bold text-slate-400">
                <tr>
                    <th class="py-4 px-6">Reference Code</th>
                    <th class="py-4 px-6">Citizen Name</th>
                    <th class="py-4 px-6">NID</th>
                    <th class="py-4 px-6">Program</th>
                    <th class="py-4 px-6">District</th>
                    <th class="py-4 px-6">Status</th>
                    <th class="py-4 px-6 text-right">Date</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-slate-800 text-sm">
                @forelse($records as $rec)
                <tr class="hover:bg-slate-900/60 transition-colors">
                    <td class="py-4 px-6 font-mono font-bold text-sky-400">{{ $rec['appNo'] }}</td>
                    <td class="py-4 px-6 font-bold text-white">{{ $rec['citizenName'] }}</td>
                    <td class="py-4 px-6 font-mono text-slate-400 text-xs">{{ $rec['nidNumber'] }}</td>
                    <td class="py-4 px-6 text-slate-300 font-medium">{{ $rec['serviceTitle'] }}</td>
                    <td class="py-4 px-6 text-slate-400 text-xs">{{ $rec['district'] }}</td>
                    <td class="py-4 px-6"><span class="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">{{ $rec['status'] }}</span></td>
                    <td class="py-4 px-6 text-right font-mono text-slate-400 text-xs">{{ $rec['date'] }}</td>
                </tr>
                @empty
                <tr><td colspan="7" class="py-12 text-center text-slate-500">No records matching search query.</td></tr>
                @endforelse
            </tbody>
        </table>
    </div>

</div>
@endsection
