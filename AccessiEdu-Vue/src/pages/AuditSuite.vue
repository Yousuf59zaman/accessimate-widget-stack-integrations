<script setup>
import { ref } from 'vue';
import { dataService } from '../services/dataService';

const logForm = ref({
  feature: 'High Contrast Mode',
  rating: 5,
  comment: '',
  pageUrl: 'http://localhost:3000/audit-suite'
});

const submittingLog = ref(false);
const logSavedSuccess = ref(false);

const handleSubmitAuditLog = () => {
  submittingLog.value = true;
  dataService.saveAuditLog(logForm.value).then(() => {
    submittingLog.value = false;
    logSavedSuccess.value = true;
    logForm.value.comment = '';
    setTimeout(() => logSavedSuccess.value = false, 4000);
  });
};
</script>

<template>
  <div class="py-12 max-w-5xl mx-auto px-4 sm:px-6">
    <div class="glass-panel p-8 rounded-3xl mb-12 border border-sky-500/40 bg-slate-900 shadow-2xl">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white">Vue 3 AccessiMate Audit Suite</h1>
      <p class="text-slate-300 text-sm mt-2">Test DOM accessibility features using the floating AccessiMate icon at the bottom corner.</p>
    </div>

    <div class="space-y-8">
      <section class="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
        <h2 class="text-xl font-bold text-white">1. Color Contrast & Dyslexia Test</h2>
        <p class="text-slate-300 text-sm">High legibility sample text to test font resizing and dyslexia replacement in Vue 3 SPA.</p>
      </section>

      <section class="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4">
        <h2 class="text-xl font-bold text-white">2. Keyboard Focus Ring Test</h2>
        <div class="flex gap-4">
          <button class="px-5 py-3 rounded-xl bg-sky-500 text-slate-950 font-bold text-xs">Focus Button 1</button>
          <button class="px-5 py-3 rounded-xl bg-slate-900 text-white border border-slate-800 font-bold text-xs">Focus Button 2</button>
        </div>
      </section>

      <section class="glass-panel p-8 rounded-3xl border border-sky-500/30 bg-slate-900/60 space-y-4">
        <h2 class="text-xl font-bold text-white">3. Save Audit Log (Vue 3 Session)</h2>
        <form @submit.prevent="handleSubmitAuditLog" class="space-y-4 max-w-xl">
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1">Tested Feature</label>
            <select v-model="logForm.feature" class="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm">
              <option value="High Contrast Mode">High Contrast Mode</option>
              <option value="Font Resize / Text Magnifier">Font Resize / Text Magnifier</option>
              <option value="Screen Reader TTS Speech">Screen Reader TTS Speech</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1">Test Observation</label>
            <textarea v-model="logForm.comment" rows="3" placeholder="Enter observation..." class="w-full px-4 py-3 rounded-xl bg-slate-955 border border-slate-800 text-white text-sm"></textarea>
          </div>

          <button type="submit" :disabled="submittingLog" class="px-7 py-3 rounded-xl bg-sky-500 text-slate-950 font-extrabold text-sm">
            {{ submittingLog ? 'Saving...' : 'Save Log to Session' }}
          </button>

          <p v-if="logSavedSuccess" class="text-emerald-400 font-bold text-xs">Audit record saved in Vue 3 session memory!</p>
        </form>
      </section>
    </div>
  </div>
</template>
