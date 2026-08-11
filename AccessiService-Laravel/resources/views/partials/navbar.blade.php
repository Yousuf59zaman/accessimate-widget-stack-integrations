<header class="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-20">
            
            <!-- Logo -->
            <a href="{{ route('home') }}" class="flex items-center gap-3 group">
                <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
                    <i class="pi pi-server text-xl"></i>
                </div>
                <div>
                    <span class="text-xl font-black text-white tracking-tight flex items-center gap-1">
                        Accessi<span class="text-gradient-sky">Service</span>
                    </span>
                    <span class="text-[10px] font-bold tracking-wider text-sky-400 uppercase block -mt-1">
                        Laravel 12 Blade Portal
                    </span>
                </div>
            </a>

            <!-- Navigation Links -->
            <nav class="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
                <a href="{{ route('home') }}" class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 {{ request()->routeIs('home') ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/50' }}">
                    <i class="pi pi-home"></i> Home
                </a>

                <a href="{{ route('services') }}" class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 {{ request()->routeIs('services') ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/50' }}">
                    <i class="pi pi-file"></i> Apply Online
                </a>

                <a href="{{ route('directory') }}" class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 {{ request()->routeIs('directory') ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/50' }}">
                    <i class="pi pi-users"></i> Directory & Lookup
                </a>

                <a href="{{ route('faqs') }}" class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 {{ request()->routeIs('faqs') ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/50' }}">
                    <i class="pi pi-question-circle"></i> FAQs
                </a>

                <a href="{{ route('audit') }}" class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 {{ request()->routeIs('audit') ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm' : 'text-slate-300 hover:text-white hover:bg-slate-800/50' }}">
                    <i class="pi pi-sliders-h text-sky-400"></i> Audit Suite
                </a>
            </nav>

            <!-- Right Theme Toggle -->
            <div class="flex items-center gap-3">
                <button id="themeToggleBtn" onclick="toggleLaravelTheme()" class="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:text-white transition-all flex items-center gap-2 text-xs font-bold">
                    <i id="themeIcon" class="pi pi-sun text-amber-400"></i>
                    <span id="themeLabel">Light Mode</span>
                </button>
            </div>

        </div>
    </div>
</header>

<script>
function toggleLaravelTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    if (isDark) {
        html.classList.remove('dark');
        html.classList.add('light');
        document.getElementById('themeIcon').className = 'pi pi-moon text-sky-400';
        document.getElementById('themeLabel').innerText = 'Dark Mode';
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        document.getElementById('themeIcon').className = 'pi pi-sun text-amber-400';
        document.getElementById('themeLabel').innerText = 'Light Mode';
    }
}
</script>
