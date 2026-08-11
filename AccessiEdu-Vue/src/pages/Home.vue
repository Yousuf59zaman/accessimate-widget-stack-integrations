<script setup>
import { ref, onMounted } from 'vue';
import { dataService } from '../services/dataService';

const courses = ref([]);
const loading = ref(true);

onMounted(() => {
  dataService.getCourses().then(data => {
    courses.value = data;
    loading.value = false;
  });
});
</script>

<template>
  <div class="space-y-16 py-8">
    
    <!-- Hero Section -->
    <section class="relative overflow-hidden pt-8 pb-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div class="lg:col-span-7 space-y-8 text-left">
            <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg">
              <span class="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              Official Vue 3 AccessiMate Testbed
            </div>

            <h1 class="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              Accessible Vue 3 <span class="text-gradient-sky">E-Learning & Academic Portal</span>
            </h1>

            <p class="text-slate-300 text-lg leading-relaxed max-w-2xl font-normal">
              Enroll in academic courses, verify student certification records, and experience inclusive educational digital tools powered by the <strong class="text-sky-400">AccessiMate Accessibility Widget</strong>.
            </p>

            <div class="flex flex-wrap gap-4 pt-2">
              <router-link
                to="/enrollment"
                class="px-7 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600 text-white font-extrabold text-base shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02] transition-all flex items-center gap-3"
              >
                <i class="pi pi-user-plus text-lg"></i> Enroll in Course
              </router-link>

              <router-link
                to="/audit-suite"
                class="px-7 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-base hover:scale-[1.02] transition-all flex items-center gap-3"
              >
                <i class="pi pi-sliders-h text-sky-400 text-lg"></i> Audit Sandbox
              </router-link>
            </div>
          </div>

          <!-- Right Monitor Card -->
          <div class="lg:col-span-5">
            <div class="glass-panel p-6 rounded-3xl relative overflow-hidden border border-slate-800 shadow-2xl space-y-4">
              <div class="flex items-center justify-between pb-4 border-b border-slate-800">
                <div class="flex items-center gap-2">
                  <span class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span class="text-xs font-bold text-slate-200 uppercase tracking-wider">Vue 3 Engine Active</span>
                </div>
                <span class="px-3 py-1 rounded-full text-[11px] font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  Vue 3 + Vite
                </span>
              </div>

              <div class="space-y-3">
                <div v-for="c in courses.slice(0, 3)" :key="c.id" class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center text-lg font-bold">
                      <i :class="c.icon"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-white">{{ c.title }}</h3>
                      <p class="text-xs text-slate-400">{{ c.students }} Students Enrolled</p>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-800 text-emerald-300">Open</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Courses Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <span class="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
          Academic Courses
        </span>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white">Featured Accessible Programs</h2>
      </div>

      <div v-if="loading" class="text-center py-12 text-slate-400">Loading courses...</div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="c in courses" :key="c.id" class="glass-panel p-7 rounded-3xl glass-panel-hover flex flex-col justify-between group">
          <div>
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500/20 to-indigo-500/20 text-sky-400 flex items-center justify-center text-2xl mb-6 group-hover:from-sky-500 group-hover:to-indigo-600 group-hover:text-white transition-all">
              <i :class="c.icon"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">{{ c.title }}</h3>
            <p class="text-slate-400 text-xs mb-4">Instructor: {{ c.instructor }} • {{ c.duration }}</p>
          </div>

          <router-link
            :to="`/enrollment?course=${c.id}`"
            class="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-sky-600 hover:text-white text-sky-400 font-bold text-xs flex items-center justify-between border border-slate-800 transition-all"
          >
            <span>Enroll Now</span>
            <i class="pi pi-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

  </div>
</template>
