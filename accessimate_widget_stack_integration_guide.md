# AccessiMate Accessibility Widget — Master Integration Guide (Angular, React, Vue 3, Next.js & Nuxt 3)

Welcome to the definitive, enterprise-grade integration guide for embedding the **AccessiMate Accessibility Widget** into modern frontend web applications built with **Angular**, **React**, **Vue 3**, **Next.js**, or **Nuxt 3**.

This guide provides step-by-step implementation instructions, copy-paste ready code snippets, framework lifecycle hook integrations, multi-tenant account token handling, environment variable setups, Server-Side Rendering (SSR) safeguards, Content Security Policy (CSP) headers, and troubleshooting protocols.

---

## 📌 Executive Integration Matrix

| Integration Method | Target Frameworks | Primary File Location | Key Advantages |
| :--- | :--- | :--- | :--- |
| **Method 1: Global HTML Injection** | Angular, React & Vue 3 | `src/index.html` / `public/index.html` | Simplest setup for Vite & Angular apps, zero JS bundle overhead, loads asynchronously. *(Note: Next.js & Nuxt 3 do NOT use static `index.html`)* |
| **Method 2: Dynamic React Component** | React 18+ | `src/App.jsx` | Dynamic `data-account` token in `useEffect()`, handles component mounting, props/state, and unmount cleanup. |
| **Method 3: Dynamic Angular Component** | Angular 14+ / 17+ | `src/app/app.component.ts` | Dynamic token handling, safe for Server-Side Rendering (SSR / Angular Universal) via `isPlatformBrowser`. |
| **Method 4: Dynamic Vue 3 Component** | Vue 3 (Composition API) | `src/App.vue` | Dynamic token inside `onMounted()` hook, clean unmount cleanup in SPA routing. |
| **Method 5: Next.js Script Integration** | Next.js (App & Pages Router) | `app/layout.js`, `pages/_document.js`, `pages/_app.js` | Native Next.js script optimization via `<Script />` component or `<Head>` injection. |
| **Method 6: Nuxt 3 Head Integration** | Nuxt 3 | `nuxt.config.ts` or `app.vue` (`useHead()`) | Native Nuxt 3 SSR head management via `app.head.script` or `useHead()`. |

---

## 🚀 Method 1: Global HTML Injection (`src/index.html`) — *Angular, React & Vue 3*

> [!NOTE]
> **Important Architectural Note for Next.js & Nuxt 3 Developers**: Next.js and Nuxt 3 do **NOT** use a static `src/index.html` file! Next.js renders HTML dynamically using `app/layout.js` (App Router) or `pages/_document.js` (Pages Router). Nuxt 3 renders HTML dynamically using `nuxt.config.ts` or `app.vue`. For Next.js projects, see **Method 5**. For Nuxt 3 projects, see **Method 6**.

### Overview
Injecting the module script tag directly inside the `<head>` of your application's `index.html` file is the lightest and fastest way to enable AccessiMate globally across all routes in standard Vite, Create React App, and Angular CLI projects.

### Detailed Implementation Steps

1. Open your project's main HTML entry point (`src/index.html` for Angular / Vite React / Vue).
2. Locate the `<head>` tag.
3. Paste the AccessiMate module script tag inside `<head>`, replacing `data-account` with your valid AccessiMate Account Token.

### Code Snippet (`src/index.html`)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AccessiMate Enabled Application</title>
  
  <!-- AccessiMate Accessibility Widget Script -->
  <script type="module" 
          src="https://dev-script.accessimate.com/js/main.js" 
          data-account="yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ" 
          defer>
  </script>
</head>
<body>
  <!-- Angular Root: <app-root></app-root> -->
  <!-- React / Vue Root: <div id="root"></div> or <div id="app"></div> -->
  <div id="root"></div>
</body>
</html>
```

---

## ⚛️ Method 2: Dynamic React Component Injection (`src/App.jsx`)

### Overview
For React Single Page Applications (SPAs) that need to dynamically bind the `data-account` token from an environment variable (`import.meta.env.VITE_ACCESIMATE_KEY`), user authentication context, or API response.

### Detailed Implementation Steps

1. Open `src/App.jsx` (or your root layout component).
2. Import `useEffect` from `'react'`.
3. Create a `<script>` DOM element dynamically inside `useEffect()`, set `script.type = 'module'`, `script.src = 'https://dev-script.accessimate.com/js/main.js'`, and set `script.setAttribute('data-account', token)`.
4. Append the script to `document.head`.
5. Return a cleanup function to remove the script when the component unmounts.

### Code Snippet (`src/App.jsx`)

```jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  useEffect(() => {
    // 1. Create Script element dynamically
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://dev-script.accessimate.com/js/main.js';
    
    // 2. Set AccessiMate Account Token (Uses Vite env variable or fallback token)
    const token = import.meta.env.VITE_ACCESIMATE_KEY || 'yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ';
    script.setAttribute('data-account', token);
    script.async = true;

    // 3. Append to document head
    document.head.appendChild(script);

    // 4. Cleanup on component unmount
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures script loads once on mount

  return (
    <Router>
      <div className="app-container">
        {/* Your React Components & Routes */}
      </div>
    </Router>
  );
}
```

---

## 🅰️ Method 3: Dynamic Angular Component Injection (`src/app/app.component.ts`)

### Overview
For Angular SPAs or Angular Universal (SSR) applications requiring client-side guard checks to prevent Node.js server-side execution crashes during pre-rendering.

### Detailed Implementation Steps

1. Open `src/app/app.component.ts`.
2. Inject `PLATFORM_ID` into the component constructor.
3. Implement `OnInit` interface.
4. Inside `ngOnInit()`, wrap DOM manipulation logic with `isPlatformBrowser(this.platformId)` to ensure execution occurs exclusively on the client browser.
5. Create and append the script element to `document.head`.

### Code Snippet (`src/app/app.component.ts`)

```typescript
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // SSR Safe Check: Ensure code executes only in client browser
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://dev-script.accessimate.com/js/main.js';
      
      const accountToken = 'yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ';
      script.setAttribute('data-account', accountToken);
      script.async = true;

      document.head.appendChild(script);
    }
  }
}
```

---

## 💚 Method 4: Dynamic Vue 3 Component Injection (`src/App.vue`)

### Overview
For Vue 3 applications using Composition API (`<script setup>`) to load the widget during the `onMounted()` lifecycle hook.

### Detailed Implementation Steps

1. Open `src/App.vue`.
2. Import `onMounted` and `onUnmounted` from `'vue'`.
3. Inside `onMounted()`, create the script element, set `data-account`, and append to `document.head`.
4. Inside `onUnmounted()`, remove the script from `document.head`.

### Code Snippet (`src/App.vue`)

```vue
<!-- src/App.vue -->
<script setup>
import { onMounted, onUnmounted } from 'vue';

let injectedScript = null;

onMounted(() => {
  // 1. Create Script element
  injectedScript = document.createElement('script');
  injectedScript.type = 'module';
  injectedScript.src = 'https://dev-script.accessimate.com/js/main.js';
  
  // 2. Set AccessiMate Account Token
  const token = import.meta.env.VITE_ACCESIMATE_KEY || 'yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ';
  injectedScript.setAttribute('data-account', token);
  injectedScript.async = true;

  // 3. Append to head
  document.head.appendChild(injectedScript);
});

onUnmounted(() => {
  // Cleanup script when root component unmounts
  if (injectedScript && document.head.contains(injectedScript)) {
    document.head.removeChild(injectedScript);
  }
});
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>
```

---

## 🖤 Method 5: Next.js Integration Options (*Empirically Tested & Verified*)

Next.js does **NOT** use a traditional `index.html` file. Below are the verified integration options for both **App Router** and **Pages Router**.

---

### Option A: Next.js App Router (`app/layout.js`) — *Recommended*

Inject Next.js's native `next/script` `<Script />` component inside `app/layout.js`:

```jsx
// app/layout.js
import Script from 'next/script';
import './globals.css';

export const metadata = {
  title: 'AccessiFin — Accessible Next.js Portal',
  description: 'Powered by AccessiMate Accessibility Engine',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* AccessiMate Accessibility Widget Script injected via Next.js Script component */}
        <Script
          src="https://dev-script.accessimate.com/js/main.js"
          data-account="yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ"
          type="module"
          strategy="afterInteractive"
        />
      </head>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased min-h-screen flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
```

---

### Option B: Next.js Pages Router via `<Head>` (`pages/_document.js`) — *Verified Working*

Inject standard HTML `<script>` tag directly inside `<Head>` in `pages/_document.js`:

```jsx
// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        {/* AccessiMate Accessibility Widget Script injected in Pages Router _document.js */}
        <script
          type="module"
          src="https://dev-script.accessimate.com/js/main.js"
          data-account="yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ"
        ></script>
      </Head>
      <body className="antialiased bg-slate-950 text-slate-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

---

### Option C: Next.js Pages Router via `<Script />` (`pages/_app.js`) — *Verified Working*

Inject Next.js `<Script />` component inside `pages/_app.js`:

```jsx
// pages/_app.js
import Script from 'next/script';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Script
        src="https://dev-script.accessimate.com/js/main.js"
        data-account="yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ"
        type="module"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}
```

---

## 💚 Method 6: Nuxt 3 Integration Options (*Empirically Tested & Verified*)

Nuxt 3 uses a universal SSR/SSG engine and does **NOT** rely on a static `index.html` file. Below are the verified ways to inject AccessiMate in Nuxt 3.

---

### Option A: Global Configuration via `nuxt.config.ts` — *Recommended*

Inject the script globally into Nuxt 3's SSR head configuration inside `nuxt.config.ts`:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      title: 'AccessiGov — Accessible Citizen Services Portal (Nuxt 3)',
      script: [
        {
          type: 'module',
          src: 'https://dev-script.accessimate.com/js/main.js',
          'data-account': 'yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ'
        }
      ]
    }
  }
})
```

---

### Option B: Dynamic Composition API via `useHead()` (`app.vue`) — *Verified Working*

For Nuxt 3 applications needing dynamic environment tokens or page-level conditional loading:

```vue
<!-- app/app.vue -->
<script setup>
const config = useRuntimeConfig();

useHead({
  script: [
    {
      type: 'module',
      src: 'https://dev-script.accessimate.com/js/main.js',
      'data-account': config.public.accessiMateToken || 'yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ',
      defer: true
    }
  ]
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

---

## 🔑 Environment Variables Setup Across Frameworks

Store your AccessiMate Account Key inside project environment files to prevent hardcoding tokens in source code repository commits:

### Vite (React & Vue 3) — `.env`
```env
VITE_ACCESIMATE_SCRIPT_URL=https://dev-script.accessimate.com/js/main.js
VITE_ACCESIMATE_KEY=yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ
```

### Next.js — `.env.local`
```env
NEXT_PUBLIC_ACCESIMATE_SCRIPT_URL=https://dev-script.accessimate.com/js/main.js
NEXT_PUBLIC_ACCESIMATE_KEY=yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ
```

### Nuxt 3 — `nuxt.config.ts` & `.env`
```env
NUXT_PUBLIC_ACCESIMATE_KEY=yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ
```

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      accessiMateToken: process.env.NUXT_PUBLIC_ACCESIMATE_KEY
    }
  }
})
```

### Angular — `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  accessiMate: {
    scriptUrl: 'https://dev-script.accessimate.com/js/main.js',
    accountToken: 'yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ'
  }
};
```

---

## 🛡️ Security, Domain Whitelisting & CSP Directives

AccessiMate validates both the `data-account` key and the requesting domain origin.

### 1. Domain Whitelisting (AccessiMate Admin Dashboard)
Ensure local development origins are Whitelisted in your AccessiMate Admin Account:
- `http://localhost:3000`
- `http://localhost:4200`
- `http://localhost:5173`

### 2. Content Security Policy (CSP) Headers
If your client site enforces CSP policies, allow AccessiMate scripts and API domains:

```http
Content-Security-Policy: 
  script-src 'self' https://dev-script.accessimate.com https://cdn.accessimate.com;
  connect-src 'self' https://dev-api.accessimate.com https://api.accessimate.com;
```

---

## 🔍 Comprehensive Troubleshooting & Verification Checklist

> [!CHECKLIST]
> - [ ] **DOM Verification**: Open browser DevTools (`F12`), check `<head>` to verify `<script type="module" src="..." data-account="...">` is present and active.
> - [ ] **Console Inspection**: Check browser Console tab. Ensure no `Failed to validate token` error alerts occur.
> - [ ] **Token Validation**: Confirm `data-account="..."` matches your active account key in the AccessiMate Admin portal.
> - [ ] **Origin Matching**: Ensure your current domain (e.g. `http://localhost:3000` or `http://localhost:4200`) is whitelisted in AccessiMate Admin settings.
> - [ ] **Network Tab**: In browser DevTools Network tab, check requests to `https://dev-api.accessimate.com/api/customer/validete`. It should return HTTP 200 OK.
