<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const isDark = ref(true);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  if (isDark.value) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
};

const isActive = (path) => route.path === path;
</script>

<template>
  <header class="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group">
          <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <i class="pi pi-book text-xl"></i>
          </div>
          <div>
            <span class="text-xl font-black text-white tracking-tight flex items-center gap-1">
              Accessi<span class="text-gradient-sky">Edu</span>
            </span>
            <span class="text-[10px] font-bold tracking-wider text-sky-400 uppercase block -mt-1">
              Accessible Vue 3 Student Portal
            </span>
          </div>
        </router-link>

        <!-- Navigation Links -->
        <nav class="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
          <router-link
            to="/"
            :class="`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              isActive('/')
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`"
          >
            <i class="pi pi-home"></i> Home
          </router-link>

          <router-link
            to="/enrollment"
            :class="`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              isActive('/enrollment')
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`"
          >
            <i class="pi pi-user-plus"></i> Course Enrollment
          </router-link>

          <router-link
            to="/directory"
            :class="`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              isActive('/directory')
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`"
          >
            <i class="pi pi-users"></i> Student Directory
          </router-link>

          <router-link
            to="/faqs"
            :class="`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              isActive('/faqs')
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`"
          >
            <i class="pi pi-question-circle"></i> FAQs
          </router-link>

          <router-link
            to="/audit-suite"
            :class="`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              isActive('/audit-suite')
                ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`"
          >
            <i class="pi pi-sliders-h text-sky-400"></i> Audit Suite
          </router-link>
        </nav>

        <!-- Right Theme Toggle -->
        <div class="flex items-center gap-3">
          <button
            @click="toggleTheme"
            class="p-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 hover:text-white transition-all flex items-center gap-2 text-xs font-bold"
          >
            <i :class="isDark ? 'pi pi-sun text-amber-400' : 'pi pi-moon text-sky-400'"></i>
            <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
          </button>
        </div>

      </div>
    </div>
  </header>
</template>
