<script setup>
import { ref, onMounted } from 'vue';

const { getFaqs } = useDataService();
const faqs = ref([]);
const openIndex = ref(0);
const loading = ref(true);

onMounted(() => {
  getFaqs().then(data => {
    faqs.value = data;
    loading.value = false;
  });
});

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};
</script>

<template>
  <div class="py-12 max-w-4xl mx-auto px-4 sm:px-6">
    <div class="text-center max-w-2xl mx-auto mb-12 space-y-3">
      <span class="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">Help Center</span>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h1>
    </div>

    <div v-if="loading" class="text-center py-12 text-slate-400">Loading FAQs...</div>

    <div v-else class="space-y-4">
      <div v-for="(faq, i) in faqs" :key="faq.id" class="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        <button @click="toggleFaq(i)" class="w-full p-6 text-left font-bold text-white text-lg flex justify-between items-center">
          <span>{{ faq.question }}</span>
          <i :class="openIndex === i ? 'pi pi-chevron-up text-sky-400' : 'pi pi-chevron-down text-sky-400'"></i>
        </button>
        <div v-if="openIndex === i" class="px-6 pb-6 pt-2 text-slate-300 text-sm border-t border-slate-800 bg-slate-955">
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
