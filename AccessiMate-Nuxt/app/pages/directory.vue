<script setup>
import { ref, onMounted, watch } from 'vue';

const route = useRoute();
const { getRecords, lookupRecord } = useDataService();

const searchQuery = ref(route.query.search || '');
const selectedStatus = ref('All');
const records = ref([]);
const loading = ref(true);

const lookupInput = ref('');
const lookupResult = ref(undefined);
const selectedModalRecord = ref(null);

const loadRecords = () => {
  loading.value = true;
  getRecords(searchQuery.value, selectedStatus.value).then(data => {
    records.value = data;
    loading.value = false;
  });
};

onMounted(() => {
  loadRecords();
});

watch([searchQuery, selectedStatus], () => {
  loadRecords();
});

const handleLookup = () => {
  if (!lookupInput.value.trim()) return;
  lookupRecord(lookupInput.value.trim()).then(res => {
    lookupResult.value = res;
  });
};
</script>

<template>
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
      <form @submit.prevent="handleLookup" class="flex gap-3">
        <input v-model="lookupInput" type="text" placeholder="Enter Reference Code (e.g. GOV-2026-9001)" class="flex-1 px-5 py-3 rounded-2xl bg-slate-955 border border-slate-800 text-white text-sm font-mono" />
        <button type="submit" class="px-7 py-3 rounded-2xl bg-sky-500 text-slate-950 font-extrabold text-sm shadow-lg">Lookup</button>
      </form>

      <div v-if="lookupResult !== undefined" class="mt-4 p-4 rounded-xl bg-slate-955 border border-slate-800">
        <div v-if="lookupResult" class="flex justify-between items-center">
          <div>
            <span class="text-xs text-sky-400 font-mono font-bold">{{ lookupResult.appNo }}</span>
            <h3 class="text-base font-bold text-white">{{ lookupResult.citizenName }}</h3>
            <p class="text-xs text-slate-400">{{ lookupResult.serviceTitle }} • {{ lookupResult.district }}</p>
          </div>
          <button @click="selectedModalRecord = lookupResult" class="px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-bold">Details</button>
        </div>
        <div v-else class="text-amber-400 text-xs">No application matching code "{{ lookupInput }}".</div>
      </div>
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
            <th class="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-800 text-sm">
          <tr v-if="loading"><td colSpan="7" class="py-8 text-center text-slate-400">Loading directory...</td></tr>
          <tr v-else-if="records.length === 0"><td colSpan="7" class="py-12 text-center text-slate-500">No records found.</td></tr>
          <tr v-else v-for="rec in records" :key="rec.id" class="hover:bg-slate-900/60 transition-colors">
            <td class="py-4 px-6 font-mono font-bold text-sky-400">{{ rec.appNo }}</td>
            <td class="py-4 px-6 font-bold text-white">{{ rec.citizenName }}</td>
            <td class="py-4 px-6 font-mono text-slate-400 text-xs">{{ rec.nidNumber }}</td>
            <td class="py-4 px-6 text-slate-300 font-medium">{{ rec.serviceTitle }}</td>
            <td class="py-4 px-6 text-slate-400 text-xs">{{ rec.district }}</td>
            <td class="py-4 px-6"><span class="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/30">{{ rec.status }}</span></td>
            <td class="py-4 px-6 text-right">
              <button @click="selectedModalRecord = rec" class="px-3.5 py-1.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 text-xs font-semibold">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal -->
    <div v-if="selectedModalRecord" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div class="glass-panel max-w-lg w-full p-8 rounded-3xl border border-slate-800 space-y-4">
        <div class="flex justify-between items-center border-b border-slate-800 pb-3">
          <h2 class="text-xl font-bold text-white">{{ selectedModalRecord.appNo }}</h2>
          <button @click="selectedModalRecord = null" class="text-slate-400 hover:text-white"><i class="pi pi-times"></i></button>
        </div>
        <div class="space-y-2 text-sm">
          <p><strong class="text-slate-400 text-xs block">Citizen Name:</strong> <span class="text-white font-bold">{{ selectedModalRecord.citizenName }}</span></p>
          <p><strong class="text-slate-400 text-xs block">NID:</strong> <span class="text-slate-300 font-mono">{{ selectedModalRecord.nidNumber }}</span></p>
          <p><strong class="text-slate-400 text-xs block">Service:</strong> <span class="text-slate-300">{{ selectedModalRecord.serviceTitle }}</span></p>
          <p><strong class="text-slate-400 text-xs block">District:</strong> <span class="text-slate-300">{{ selectedModalRecord.district }}</span></p>
        </div>
        <div class="pt-4 flex justify-end">
          <button @click="selectedModalRecord = null" class="px-5 py-2 bg-sky-500 text-slate-950 font-bold text-xs rounded-xl">Close</button>
        </div>
      </div>
    </div>

  </div>
</template>
