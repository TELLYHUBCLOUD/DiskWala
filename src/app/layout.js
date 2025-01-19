import { Inter } from "next/font/google";
import "./globals.css";
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
  "name": "Playterabox.com",
  "url": "https://playterabox.com",
  "description": "Watch, Embed and download Terabox Videos 🔥 100% working ✅ Download Terabox videos with TeraDL",
  "publisher": {
    "@type": "Organization",
    "name": "Playterabox.com"
  }
}
</script>`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="">
      <head>
        <link rel="icon" href="/image.png" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
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
