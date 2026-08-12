# AccessiMate Accessibility Widget — Master Integration Guide (Angular, React, Vue 3, Next.js, Nuxt 3, Laravel & ASP.NET Core)

Welcome to the definitive, enterprise-grade integration guide for embedding the **AccessiMate Accessibility Widget** into modern web applications built with **Angular**, **React**, **Vue 3**, **Next.js**, **Nuxt 3**, **Laravel**, or **ASP.NET Core**.

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
| **Method 7: Laravel Blade Master Layout** | Laravel (v9 to v12+) | `resources/views/layouts/app.blade.php` | Native Blade layout injection, dynamic environment variable binding via `config/services.php`. |
| **Method 8: ASP.NET Core Razor Layout** | ASP.NET Core (v6/v8/v9) | `Views/Shared/_Layout.cshtml` | Native C# Razor layout injection, appsettings.json binding via `@inject IConfiguration`. |

---

## 🚀 Method 1: Global HTML Injection (`src/index.html`) — *Angular, React, Vue 3 & Static HTML*

> [!NOTE]
> **Important Architectural Note**: Next.js, Nuxt 3, Laravel, and ASP.NET Core do **NOT** use a static `src/index.html` file! Next.js uses `app/layout.js` (App Router) or `pages/_document.js` (Pages Router). Nuxt 3 uses `nuxt.config.ts` or `app.vue`. Laravel uses Blade layout files (`resources/views/layouts/app.blade.php`). ASP.NET Core uses Razor layout files (`Views/Shared/_Layout.cshtml`). For Next.js see **Method 5**. For Nuxt 3 see **Method 6**. For Laravel see **Method 7**. For ASP.NET Core see **Method 8**.

### Overview
Injecting the module script tag directly inside the `<head>` of your application's `index.html` file is the lightest, fastest, and most straightforward method to enable AccessiMate globally across all routes in standard Vite, Create React App, Vue CLI, Angular CLI, and static HTML websites.

### Detailed Step-by-Step Implementation

1. Open your project's main HTML entry point:
   - **Angular CLI**: `src/index.html`
   - **Vite React / Vue 3**: `index.html` (in root directory)
   - **Create React App / Public**: `public/index.html`
   - **Static Website**: `index.html` (or master template)
2. Locate the `<head>` tag.
3. Paste the AccessiMate module script tag inside `<head>`, replacing `data-account` with your valid AccessiMate Account Token.
4. Save the file. The widget will automatically load on all pages and routes.

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
  <!-- Root Mounting Container -->
  <!-- Angular: <app-root></app-root> -->
  <!-- React / Vue: <div id="root"></div> or <div id="app"></div> -->
  <div id="root"></div>
</body>
</html>
```

---

## ⚛️ Method 2: Dynamic React Component Injection (`src/App.jsx`)

```jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://dev-script.accessimate.com/js/main.js';
    
    const token = import.meta.env.VITE_ACCESIMATE_KEY || 'yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ';
    script.setAttribute('data-account', token);
    script.async = true;

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <Router>
      <div className="app-container">
        {/* Your React Components */}
      </div>
    </Router>
  );
}
```

---

## 🅰️ Method 3: Dynamic Angular Component Injection (`src/app/app.component.ts`)

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

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';

let injectedScript = null;

onMounted(() => {
  injectedScript = document.createElement('script');
  injectedScript.type = 'module';
  injectedScript.src = 'https://dev-script.accessimate.com/js/main.js';
  
  const token = import.meta.env.VITE_ACCESIMATE_KEY || 'yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ';
  injectedScript.setAttribute('data-account', token);
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
  <div id="app">
    <router-view />
  </div>
</template>
```

---

## 🖤 Method 5: Next.js Integration Options

### Option A: Next.js App Router (`app/layout.js`)

```jsx
import Script from 'next/script';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <Script
          src="https://dev-script.accessimate.com/js/main.js"
          data-account="yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ"
          type="module"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 💚 Method 6: Nuxt 3 Integration Options

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
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

## 🔴 Method 7: Laravel Integration Options (`resources/views/layouts/app.blade.php`)

```blade
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="utf-8">
    <title>@yield('title', 'AccessiService')</title>

    <!-- AccessiMate Accessibility Widget Script injected in Laravel Blade layout -->
    <script type="module" 
            src="https://dev-script.accessimate.com/js/main.js" 
            data-account="{{ config('services.accessimate.key', 'yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ') }}">
    </script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
    @yield('content')
</body>
</html>
```

---

## 🔷 Method 8: ASP.NET Core Integration Options (*Razor Views / MVC*)

ASP.NET Core uses Razor Templating (`.cshtml`) for server-side HTML view rendering. The AccessiMate script tag is injected into the primary master layout file (`Views/Shared/_Layout.cshtml`).

---

### Option A: Master Razor Layout (`Views/Shared/_Layout.cshtml`) — *Recommended*

Inject the script directly into the `<head>` tag of `Views/Shared/_Layout.cshtml`:

```html
@* Views/Shared/_Layout.cshtml *@
<!DOCTYPE html>
<html lang="en" class="dark">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"] - AccessiCorp ASP.NET Core</title>

    <!-- AccessiMate Accessibility Widget Script injected in ASP.NET Core Razor Layout -->
    <script type="module" 
            src="https://dev-script.accessimate.com/js/main.js" 
            data-account="yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ">
    </script>
</head>
<body>
    @RenderBody()
</body>
</html>
```

---

### Option B: Binding via `appsettings.json` & Dependency Injection

1. Add your token in `appsettings.json`:
```json
{
  "AccessiMate": {
    "ScriptUrl": "https://dev-script.accessimate.com/js/main.js",
    "AccountKey": "yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ"
  }
}
```

2. Inject `IConfiguration` inside `Views/Shared/_Layout.cshtml`:
```html
@inject Microsoft.Extensions.Configuration.IConfiguration Configuration

<script type="module" 
        src="@Configuration["AccessiMate:ScriptUrl"]" 
        data-account="@Configuration["AccessiMate:AccountKey"]">
</script>
```

---

## 🔍 Comprehensive Verification Checklist

> [!CHECKLIST]
> - [ ] **DOM Verification**: Open browser DevTools (`F12`), check `<head>` to verify `<script type="module" src="..." data-account="...">` is present and active.
> - [ ] **Console Inspection**: Check browser Console tab. Ensure no `Failed to validate token` error alerts occur.
> - [ ] **Token Validation**: Confirm `data-account="..."` matches your active account key in the AccessiMate Admin portal.
> - [ ] **Network Tab**: In browser DevTools Network tab, check requests to `https://dev-api.accessimate.com/api/customer/validete`. It should return HTTP 200 OK.
