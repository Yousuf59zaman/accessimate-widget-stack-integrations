<script setup>
import { onMounted, onUnmounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

let injectedScript = null;

onMounted(() => {
  // Dynamically inject AccessiMate Accessibility Widget script inside Vue 3 App component
  injectedScript = document.createElement('script');
  injectedScript.type = 'module';
  injectedScript.src = 'https://script.accessimate.com/js/main.js';
  injectedScript.setAttribute('data-account', 'y1kqwVdiqVZ9P2KUNwwppmyu225D8mcVSVq2ZehN');
  injectedScript.async = true;

  document.head.appendChild(injectedScript);
});

onUnmounted(() => {
  if (injectedScript && document.head.contains(injectedScript)) {
    document.head.removeChild(injectedScript);
  }
});
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-white">
    <Navbar />
    
    <main class="flex-grow">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
