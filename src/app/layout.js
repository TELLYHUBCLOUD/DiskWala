import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        {children}
        <Analytics />

        {/* Google Analytics */}
        <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FLZPLE5MV9"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-FLZPLE5MV9');
</script>

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4291572749420740"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "TheDiskWala",
              "url": "https://thediskwala.com",
              "description": "Easily download and watch Diskwala.com videos online with TheDiskWala.com. Enjoy fast, secure playback and offline saving with our Diskwala video downloader.",
              "publisher": {
                "@type": "Organization",
                "name": "TheDiskWala"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
