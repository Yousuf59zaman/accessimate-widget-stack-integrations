<template>
  <div class="min-h-screen flex flex-col justify-between bg-slate-950 text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
    <Navbar />
    <main class="flex-grow">
      <slot />
    </main>
    <Footer />
  </div>
</template>
