<script setup>
import { ref, onMounted } from 'vue';

const route = useRoute();
const { applyService, getServices } = useDataService();

const initialService = route.query.id || '';
const servicesList = ref([]);

onMounted(() => {
  getServices().then(data => {
    servicesList.value = data;
  });
});

const formData = ref({
  citizenName: '',
  nidNumber: '',
  district: 'Dhaka',
  serviceId: initialService,
  agreeTerms: false
});

const errors = ref({});
const submitting = ref(false);
const submittedResult = ref(null);

const handleSubmit = () => {
  const errs = {};
  if (!formData.value.citizenName || formData.value.citizenName.length < 3) {
    errs.citizenName = 'Citizen Name required (min 3 chars).';
  }
  if (!formData.value.nidNumber || !/^[0-9]{10,17}$/.test(formData.value.nidNumber)) {
    errs.nidNumber = 'Valid 10 or 17 digit NID required.';
  }
  if (!formData.value.serviceId) {
    errs.serviceId = 'Please select a government service.';
  }
  if (!formData.value.agreeTerms) {
    errs.agreeTerms = 'You must accept terms.';
  }

  errors.value = errs;
  if (Object.keys(errs).length > 0) return;

  submitting.value = true;
  applyService(formData.value).then(res => {
    submitting.value = false;
    submittedResult.value = res;
  });
};

const handleReset = () => {
  formData.value = {
    citizenName: '',
    nidNumber: '',
    district: 'Dhaka',
    serviceId: '',
    agreeTerms: false
  };
  errors.value = {};
  submittedResult.value = null;
};
</script>

<template>
  <div class="py-12 max-w-4xl mx-auto px-4 sm:px-6">
    <div class="mb-10 text-left">
      <NuxtLink to="/" class="text-sky-400 font-semibold text-xs inline-flex items-center gap-1.5 mb-3 hover:text-sky-300">
        <i class="pi pi-arrow-left"></i> Back to Home
      </NuxtLink>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Citizen E-Services Online Application</h1>
      <p class="text-slate-400 text-sm mt-1">WCAG 2.1 AA Accessible Form. Tested in Nuxt 3 for screen reader accessibility.</p>
    </div>

    <div v-if="submittedResult" role="alert" class="mb-10 p-8 bg-emerald-950/80 border border-emerald-500/40 rounded-3xl backdrop-blur-xl flex items-start gap-5 shadow-2xl">
      <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl flex-shrink-0">
        <i class="pi pi-check-circle"></i>
      </div>
      <div class="space-y-3">
        <h2 class="text-2xl font-bold text-white">Application Submitted Successfully!</h2>
        <p class="text-slate-300 text-sm">
          Application Reference Code: <strong class="text-emerald-400 font-mono text-xl block sm:inline mt-1 sm:mt-0 underline">{{ submittedResult.appNo }}</strong>
        </p>
        <div class="pt-4 flex flex-wrap gap-4">
          <NuxtLink :to="`/directory?search=${submittedResult.appNo}`" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg">
            Track Application Status
          </NuxtLink>
          <button @click="handleReset" class="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-xs hover:text-white">
            Apply for Another Service
          </button>
        </div>
      </div>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="glass-panel p-8 sm:p-10 rounded-3xl space-y-8 border border-slate-800 shadow-2xl">
      <fieldset class="space-y-6">
        <legend class="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-bold">1</span>
          Citizen Personal & NID Data
        </legend>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="citizenName" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Citizen Full Name *</label>
            <input v-model="formData.citizenName" type="text" id="citizenName" placeholder="e.g. Kabir Uddin" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
            <p v-if="errors.citizenName" class="text-rose-400 text-xs mt-1">{{ errors.citizenName }}</p>
          </div>

          <div>
            <label htmlFor="nidNumber" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">National ID (NID) *</label>
            <input v-model="formData.nidNumber" type="text" id="nidNumber" placeholder="1985123456789012" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm" />
            <p v-if="errors.nidNumber" class="text-rose-400 text-xs mt-1">{{ errors.nidNumber }}</p>
          </div>
        </div>
      </fieldset>

      <fieldset class="space-y-6">
        <legend class="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">2</span>
          E-Service Program Selection
        </legend>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="serviceId" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Government Program *</label>
            <select v-model="formData.serviceId" id="serviceId" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm">
              <option value="">-- Select Service --</option>
              <option v-for="s in servicesList" :key="s.id" :value="s.id">{{ s.title }}</option>
            </select>
            <p v-if="errors.serviceId" class="text-rose-400 text-xs mt-1">{{ errors.serviceId }}</p>
          </div>

          <div>
            <label htmlFor="district" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">District Jurisdiction</label>
            <input v-model="formData.district" type="text" id="district" placeholder="e.g. Dhaka" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
          </div>
        </div>
      </fieldset>

      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
        <input v-model="formData.agreeTerms" type="checkbox" id="agreeTerms" class="w-5 h-5 text-sky-500 rounded" />
        <label htmlFor="agreeTerms" class="text-xs text-slate-300">I declare all provided citizen information is authentic.</label>
      </div>

      <div class="flex justify-end gap-4 pt-4 border-t border-slate-800">
        <button type="button" @click="handleReset" class="px-6 py-3 rounded-xl bg-slate-900 text-slate-300 text-xs border border-slate-800 font-bold">Reset</button>
        <button type="submit" :disabled="submitting" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-sm shadow-xl">
          {{ submitting ? 'Submitting...' : 'Submit Application' }}
        </button>
      </div>
    </form>
  </div>
</template>
