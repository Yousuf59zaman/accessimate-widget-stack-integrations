import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        {/* Modern Google Typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/primeicons@6.0.0/primeicons.css" />

        {/* AccessiMate Accessibility Widget Script injected in Pages Router _document.js */}
        <script
          type="module"
          src="https://dev-script.accessimate.com/js/main.js"
          data-account="yUkg0nklTJ3PsHOUOqUsT3HQw1bmfAWq0E1lCcWJ"
        ></script>
      </Head>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
