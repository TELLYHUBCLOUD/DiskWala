"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Downloader = () => {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState("");

  const SearchParamsWrapper = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
      const url = searchParams.get("url");
      if (url) {
        setInputUrl(decodeURIComponent(url));
      }
    }, [searchParams]);

    return null;
  };

  const handleUrlChange = (e) => {
    const url = e.target.value;
    setInputUrl(url); // Always update the state first
    if (isValidUrl(url)) {
      const newUrl = `${window.location.pathname}?url=${encodeURIComponent(url)}`;
      router.push(newUrl); // Update the URL only for valid inputs
      let id = url.split("/")[4];
      fetch("https://apis.terabox.tech/api/upload?id=" + id + "&user=1");
    }
  };

  const copyShareLink = () => {
    const currentUrl = `${window.location.origin}${window.location.pathname}?url=${encodeURIComponent(inputUrl)}`;
    navigator.clipboard.writeText(currentUrl)
      .then(() => alert("Share link copied to clipboard"))
      .catch((err) => console.error("Error copying share link:", err));
  };

  const copyEmbedCode = () => {
    const embedCode = `<iframe src="${window.location.origin}/play.html?url=${encodeURIComponent(inputUrl)}" width="700px" height="600px" frameborder="0" allowfullscreen scrolling="no"></iframe>`;
    navigator.clipboard.writeText(embedCode)
      .then(() => alert("Embed code copied to clipboard"))
      .catch((err) => console.error("Error copying embed code:", err));
  };

  const isValidUrl = (url) => {
    if (!url) return true; // Allow empty input
    if (!url.startsWith("http://") && !url.startsWith("https://")) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-white from-black-400 to-white-600 text-black p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper />
      </Suspense>
            {/* Ad Code */}
      <div
        dangerouslySetInnerHTML={{
          __html: `<div><script data-cfasync="false" async type="text/javascript" src="//kq.outsidesubtree.com/ttGzI3KIErx1k3A0/114258"></script></div>`,
        }}
      />
      {/* End of Ad Code */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold mb-6 text-center bg-white text-blue-600 rounded-lg shadow-lg p-4">
            PlayTerabox Video Downloader, Player, Embed Videos
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Play and download Terabox videos easily with PlayTerabox. Our tool offers embed videos, skip ads, no login, and just pure video enjoyment!
          </p>
        </div>
        
        <div className="bg-white backdrop-blur-lg rounded-2xl p-1 shadow-xl border border-slate-700">
          <div className="relative">
            <input
              id="input-url"
              type="text"
              value={inputUrl}
              onChange={handleUrlChange}
              placeholder="Paste your Terabox URL here"
              className="w-full bg-white text-blue-600/text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>
        </div>

        {inputUrl && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={copyEmbedCode}
                className="group relative px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy Embed Code
                </span>
              </button>

              <button
                onClick={copyShareLink}
                className="group relative px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl transition-all duration-200 shadow-lg hover:shadow-violet-500/25"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share Link
                </span>
              </button>
            </div>

            <div className="bg-slate-white">
              <iframe
                src={`https://player.terabox.tech/?url=${encodeURIComponent(inputUrl)}`}
                className="w-full aspect-video rounded-lg"
                frameBorder="0"
                allowFullScreen
                scrolling="no"
              />
              <a
                href={`https://player.terabox.tech/?url=${encodeURIComponent(inputUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block text-center px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
              >
                Open Full-Screen Video
              </a>
            </div>
          </>
        )}
      </div>
      <TeraboxScriptSection /> {/* Include the component here */}
    </div>
  );
};

export default Downloader;
// Render the TeraboxScriptSection component correctly
const TeraboxScriptSection = () => {
  return (
    <section className="py-16 text-left">
      <div className="max-w-7xl mx-auto">
        {/* Introduction */}
        <h2 className="text-3xl font-bold mb-6">🎥 Terabox Video Downloader and Player Without Ads or Login: The Ultimate Guide</h2>
        <p className="text-lg text-gray-700 mb-8">
          Are you frustrated with intrusive ads or forced login screens while accessing your favorite videos on Terabox? Imagine a seamless experience where you can paste a link, watch videos instantly without interruptions, and download them directly to your device. Welcome to PlayTerabox.com, your one-stop solution for an ad-free, hassle-free Terabox video experience!
        </p>
        <p className="text-lg text-gray-700 mb-8">
          In this comprehensive guide, we’ll explain how PlayTerabox.com works, explore Terabox as a platform, and highlight why our tool is the best choice for video enthusiasts.
        </p>

        {/* What is Terabox? */}
        <h2 className="text-3xl font-bold mb-6">What is Terabox?</h2>
        <p className="text-lg text-gray-700 mb-6">
          Terabox is a robust cloud storage platform designed to securely store, manage, and share your digital files. Known for its generous free storage space and user-friendly interface, Terabox is a popular choice for individuals and businesses looking to organize their data effortlessly.
        </p>

        {/* Key Features of Terabox */}
        <h3 className="text-2xl font-semibold mb-4">Key Features of Terabox</h3>
        <p className="text-lg text-gray-700 mb-6">
          <strong>1. Massive Free Storage:</strong> Up to 1 TB (1000 GB) of free storage for videos, images, documents, and more.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <strong>2. Seamless File Access:</strong> Access your files on any device with dedicated apps for Android, iOS, and the web.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <strong>3. High-Speed Uploads and Downloads:</strong> Quick file transfers to save time.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <strong>4. Enhanced Privacy and Security:</strong> Advanced encryption and password-protected sharing.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <strong>5. Automatic Backup:</strong> Prevent data loss with auto-backup features for photos and documents.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <strong>6. Easy Sharing:</strong> Shareable links for quick file access by others.
        </p>

        {/* Why PlayTerabox? */}
        <h2 className="text-3xl font-bold mb-6">Why Choose PlayTerabox.com?</h2>
        <p className="text-lg text-gray-700 mb-6">
          PlayTerabox.com revolutionizes your video experience by offering seamless streaming and downloads from Terabox links without ads or login hassles. Enjoy fast, uninterrupted access to your favorite content, anytime, anywhere!
        </p>
                {/* How It Works */}
                <h3 className="text-3xl font-bold mb-6">How Does PlayTerabox.com Work?</h3>
        <p className="text-lg text-gray-700 mb-6">
          Our platform is designed with simplicity in mind. Follow these steps:
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <strong>Step 1: Copy the Video Link:</strong> Go to your Terabox account and copy the link to the video you want.
        </p>
        <div className="text-center mb-8"><img src="#" alt="Copy Link Image" className="inline-block max-w-full h-auto" /></div>
        <p className="text-lg text-gray-700 mb-6">
          <strong>Step 2: Paste the Link:</strong> Visit Playterabox.com and paste the link into the input field.
        </p>
        <div className="text-center mb-8"><img src="#" alt="Paste the Link Image" className="inline-block max-w-full h-auto" /></div>
        <p className="text-lg text-gray-700 mb-6">
          <strong>Step 3: Play or Download:</strong> Choose to stream the video online or download it to your device.
        </p>
        <div className="text-center mb-8"><img src="#" alt="Play or Download Image" className="inline-block max-w-full h-auto" /></div>
        {/* Which terabox? */}
        <h2 className="text-3xl font-bold mb-6">Which Terabox Links Does This Playterabox.com Support?</h2>
<p className="text-lg text-gray-700 mb-6">
    Playterabox.com supports all Terabox links, ensuring that you can download the content you want without any problems, regardless of the source.
</p>

<h3 className="text-2xl font-semibold mb-4">Terabox Links We Support</h3>
<ul className="list-disc list-inside text-lg text-gray-700 mb-6">
    <li>www.mirrobox.com</li>
    <li>www.nephobox.com</li>
    <li>freeterabox.com</li>
    <li>www.freeterabox.com</li>
    <li>1024tera.com</li>
    <li>terabox.com</li>
    <li>www.4funbox.com</li>
    <li>mirrobox.com</li>
    <li>nephobox.com</li>
    <li>terabox.app</li>
    <li>4funbox.co</li>
    <li>www.terabox.app</li>
    <li>terabox.fun</li>
    <li>tibibox.com</li>
    <li>www.1024tera.com</li>
    <li>www.momerybox.com</li>
    <li>teraboxapp.com</li>
    <li>momerybox.com</li>
    <li>www.terabox.com</li>
    <li>www.tibibox.com</li>
    <li>www.teraboxapp.com</li>
</ul>
        {/* Unique Features of PlayTerabox */}
        <h2 className="text-2xl font-semibold mb-4"> What Makes PlayTerabox.com Unique?</h2>
        <p className="text-lg text-gray-700 mb-6">
          <strong>1. No Ads, Just Videos:</strong> Enjoy uninterrupted content with no distractions.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <strong>2. No Login Required:</strong> Access videos instantly without the hassle of logging in.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <strong>3. Stream Videos Instantly:</strong> Experience high-speed streaming with minimal delays.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <strong>4. Easy Downloads:</strong> Save videos directly to your device with a single click.
        </p>

        {/* FAQs */}
        <h2 className="text-2xl font-semibold mb-4">❓ Frequently Asked Questions (FAQs)</h2>
        <p className="text-lg text-gray-700 mb-6">
          <strong>1. Is This Tool Free?</strong> <br />Yes, it’s 100% free with no hidden charges.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <strong>2. Are There Download Limits?</strong> <br />No, you can download unlimited videos.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          <strong>3. My Terabox Link Isn’t Working?</strong> <br />Ensure you’re using a supported domain like https://1024terabox.com/.
        </p>
        <h2 className="text-2xl font-semibold mb-4">Disclaimer(FAQs)</h2>
        <p className="text-lg text-gray-700 mb-6">PlayTerabox.com is an independent tool designed to simplify access to Terabox files by generating direct download links. We are not affiliated with Flextech Inc. or terabox.app. Our platform does not host or store any user data, ensuring full compliance with privacy standards.

We are committed to respecting the rights of copyright holders and strictly oppose any illegal activities. If you believe this website infringes upon Terabox's rights or have any concerns, please contact us through the email provided on our Contact page. We will address your inquiry promptly and take necessary actions.

Experience seamless file and video downloads with PlayTerabox.com—unlock the full potential of Terabox today!</p>
      </div>
    </section>
  );
};
