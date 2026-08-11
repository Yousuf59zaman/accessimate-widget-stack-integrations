<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { dataService, COURSES } from '../services/dataService';

const route = useRoute();
const initialCourse = route.query.course || '';

const formData = ref({
  studentName: '',
  nidNumber: '',
  email: '',
  phone: '',
  courseId: initialCourse,
  enrollmentType: 'Regular Self-Paced',
  agreeTerms: false
});

const errors = ref({});
const submitting = ref(false);
const submittedResult = ref(null);

const handleSubmit = () => {
  const errs = {};
  if (!formData.value.studentName || formData.value.studentName.length < 3) {
    errs.studentName = 'Student Name required (min 3 chars).';
  }
  if (!formData.value.nidNumber || !/^[0-9]{10,17}$/.test(formData.value.nidNumber)) {
    errs.nidNumber = 'Valid 10 or 17 digit NID required.';
  }
  if (!formData.value.courseId) {
    errs.courseId = 'Please select a course.';
  }
  if (!formData.value.agreeTerms) {
    errs.agreeTerms = 'You must accept terms.';
  }

  errors.value = errs;
  if (Object.keys(errs).length > 0) return;

  submitting.value = true;
  dataService.enrollStudent(formData.value).then(res => {
    submitting.value = false;
    submittedResult.value = res;
  });
};

const handleReset = () => {
  formData.value = {
    studentName: '',
    nidNumber: '',
    email: '',
    phone: '',
    courseId: '',
    enrollmentType: 'Regular Self-Paced',
    agreeTerms: false
  };
  errors.value = {};
  submittedResult.value = null;
};
</script>

<template>
  <div class="py-12 max-w-4xl mx-auto px-4 sm:px-6">
    <div class="mb-10 text-left">
      <router-link to="/" class="text-sky-400 font-semibold text-xs inline-flex items-center gap-1.5 mb-3 hover:text-sky-300">
        <i class="pi pi-arrow-left"></i> Back to Home
      </router-link>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Student Academic Course Enrollment</h1>
      <p class="text-slate-400 text-sm mt-1">WCAG 2.1 AA Accessible Form. Tested in Vue 3 for screen reader accessibility.</p>
    </div>

    <div v-if="submittedResult" role="alert" class="mb-10 p-8 bg-emerald-950/80 border border-emerald-500/40 rounded-3xl backdrop-blur-xl flex items-start gap-5 shadow-2xl">
      <div class="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl flex-shrink-0">
        <i class="pi pi-check-circle"></i>
      </div>
      <div class="space-y-3">
        <h2 class="text-2xl font-bold text-white">Enrollment Application Submitted!</h2>
        <p class="text-slate-300 text-sm">
          Student Reference ID: <strong class="text-emerald-400 font-mono text-xl block sm:inline mt-1 sm:mt-0 underline">{{ submittedResult.studentId }}</strong>
        </p>
        <div class="pt-4 flex flex-wrap gap-4">
          <router-link :to="`/directory?search=${submittedResult.studentId}`" class="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg">
            Track Enrollment Status
          </router-link>
          <button @click="handleReset" class="px-5 py-2.5 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-semibold text-xs hover:text-white">
            Enroll Another Student
          </button>
        </div>
      </div>
    </div>

    <form v-else @submit.prevent="handleSubmit" class="glass-panel p-8 sm:p-10 rounded-3xl space-y-8 border border-slate-800 shadow-2xl">
      
      <fieldset class="space-y-6">
        <legend class="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center text-sm font-bold">1</span>
          Student Personal Data
        </legend>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="studentName" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Student Full Name *</label>
            <input v-model="formData.studentName" type="text" id="studentName" placeholder="e.g. Sajid Hossain" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm" />
            <p v-if="errors.studentName" class="text-rose-400 text-xs mt-1">{{ errors.studentName }}</p>
          </div>

          <div>
            <label htmlFor="nidNumber" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">National ID (NID) *</label>
            <input v-model="formData.nidNumber" type="text" id="nidNumber" placeholder="1990345678901234" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono text-sm" />
            <p v-if="errors.nidNumber" class="text-rose-400 text-xs mt-1">{{ errors.nidNumber }}</p>
          </div>
        </div>
      </fieldset>

      <fieldset class="space-y-6">
        <legend class="text-xl font-bold text-white pb-3 border-b border-slate-800 w-full flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-sm font-bold">2</span>
          Course Selection
        </legend>

        <div>
          <label htmlFor="courseId" class="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Academic Program *</label>
          <select v-model="formData.courseId" id="courseId" class="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm">
            <option value="">-- Select Course --</option>
            <option v-for="c in COURSES" :key="c.id" :value="c.id">{{ c.title }}</option>
          </select>
          <p v-if="errors.courseId" class="text-rose-400 text-xs mt-1">{{ errors.courseId }}</p>
        </div>
      </fieldset>

      <div class="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-3">
        <input v-model="formData.agreeTerms" type="checkbox" id="agreeTerms" class="w-5 h-5 text-sky-500 rounded" />
        <label htmlFor="agreeTerms" class="text-xs text-slate-300">I declare that all submitted information is authentic.</label>
      </div>

      <div class="flex justify-end gap-4 pt-4 border-t border-slate-800">
        <button type="button" @click="handleReset" class="px-6 py-3 rounded-xl bg-slate-900 text-slate-300 text-xs border border-slate-800 font-bold">Reset</button>
        <button type="submit" :disabled="submitting" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold text-sm shadow-xl">
          {{ submitting ? 'Enrolling...' : 'Submit Enrollment' }}
        </button>
      </div>

    </form>
  </div>
</template>
