<template>
  <footer class="bg-slate-950 border-t border-slate-900 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-900 pb-8 mb-8">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold">
            <i class="pi pi-building"></i>
          </div>
          <div>
            <span class="text-lg font-black text-white">AccessiGov</span>
            <p class="text-xs text-slate-400">Official AccessiMate Widget Testbed (Nuxt 3 Edition)</p>
          </div>
        </div>

        <div class="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <i class="pi pi-shield"></i> WCAG 2.1 Level AA Target
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
            Nuxt 3 Standalone
          </span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 AccessiGov Public Services Portal. Powered by AccessiMate Accessibility Engine.</p>
        <p class="flex items-center gap-1">
          Crafted for accessible government e-services.
        </p>
      </div>
    </div>
  </footer>
</template>
