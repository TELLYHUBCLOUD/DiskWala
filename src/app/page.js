import Downloader from "@/components/Downloader";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";

export const metadata = {
  title: "PlayTerabox: Video Downloader, Player, 100% Working ✔️ No login",
  description:
    "Play and download Terabox videos easily with PlayTerabox. Our tool is 100% Working and offers embed videos, skip ads, no login, and just pure video enjoyment!",
  keywords: ["terabox", "terabox video downloader online", "terabox direct download", "terabox downloader", "terabox online downloader", "terabox video downloader", "terabox player", "terabox online player", "terabox links", "terabox link converter", "terabox direct link", "terabox direct videos", "terabox direct files", "terabox bypass", "terabox link bypass", "terabox video downloader", "terabox video download", "terabox link downloader", "terabox downloader online"],
  openGraph: {
    title: "PlayTerabox: Video Downloader, Player, 100% Working ✔️ No login",
    description: "Play and download Terabox videos easily with PlayTerabox. Our tool is 100% Working and offers embed videos, skip ads, no login, and just pure video enjoyment!",
    type: "website",
    url: "https://playterabox.com",
    images: ["/logo.ico"],
  },
  robots: "index, follow",
};

export default function Home() {
  return (
    <>
      <Header />
    {/* Ad Code */}
<div id="ad-container" className="my-4">
  <div
    dangerouslySetInnerHTML={{
      __html: `<meta name="juicyads-site-verification" content="8b17a38e75176adb954a514bf910d7a2">`,
    }}
  ></div>
</div>
{/* End of Ad Code */
      <main className="mt-10">
        <Downloader />
      </main>
      <Footer />
    </>
  );
}
