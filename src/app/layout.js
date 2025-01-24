import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

let analytics = `
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-GQQKJ4TV2K"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-GQQKJ4TV2K');
</script>`;

const jsonld = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "PlayTerabox",
  "url": "https://playterabox.com",
  "description": "Play and download Terabox videos easily with PlayTerabox. Our tool is 100% Working and offers embed videos, skip ads, no login, and just pure video enjoyment!",
  "publisher": {
    "@type": "Organization",
    "name": "PlayTerabox"
  }
}
</script>`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000000" />

        <div className="analytics">
          <div dangerouslySetInnerHTML={{ __html: analytics }}></div>
        </div>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4291572749420740"
          crossOrigin="anonymous"
        ></Script>
        <div dangerouslySetInnerHTML={{ __html: jsonld }}></div>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
