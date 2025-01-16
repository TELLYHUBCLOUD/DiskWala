"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Downloader = () => {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState(""); // Input field state
  const [videoUrl, setVideoUrl] = useState(""); // Rendered video URL state
  const [isLoading, setIsLoading] = useState(false); // Loading bar state
  const [loadingProgress, setLoadingProgress] = useState(0); // Progress bar state

  const SearchParamsWrapper = () => {
    const searchParams = useSearchParams();

    useEffect(() => {
      const url = searchParams.get("url");
      if (url && !videoUrl) {
        setInputUrl(decodeURIComponent(url));
      }
    }, [searchParams, videoUrl]);

    return null;
  };

  const handleUrlChange = (e) => {
    setInputUrl(e.target.value); // Update the state for input value
  };

  const handleWatchVideo = () => {
    if (isValidUrl(inputUrl)) {
      const newUrl = `${window.location.pathname}?url=${encodeURIComponent(inputUrl)}`;
      router.push(newUrl); // Update the URL
      const id = inputUrl.split("/")[4];
      fetch(`https://apis.terabox.tech/api/upload?id=${id}&user=1`);

      setIsLoading(true); // Show the loading bar
      setLoadingProgress(0); // Reset the progress bar
      setVideoUrl(inputUrl); // Set the video URL immediately
      setInputUrl(""); // Clear the input box

      // Simulate loading bar progress
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval); // Stop progress when it reaches 100%
            setIsLoading(false); // Hide the loading bar
            scrollToVideo(); // Scroll to the video iframe
          }
          return prev + 10; // Increment progress
        });
      }, 500);
    } else {
      alert("Please enter a valid URL.");
    }
  };

  const scrollToVideo = () => {
    const iframeElement = document.querySelector("iframe");
    if (iframeElement) {
      iframeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const copyShareLink = () => {
    const currentUrl = `${window.location.origin}${window.location.pathname}?url=${encodeURIComponent(videoUrl)}`;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => alert("Share link copied to clipboard"))
      .catch((err) => console.error("Error copying share link:", err));
  };

  const copyEmbedCode = () => {
    const embedCode = `<iframe src="${window.location.origin}/play.html?url=${encodeURIComponent(videoUrl)}" width="700px" height="600px" frameborder="0" allowfullscreen scrolling="no"></iframe>`;
    navigator.clipboard
      .writeText(embedCode)
      .then(() => alert("Embed code copied to clipboard"))
      .catch((err) => console.error("Error copying embed code:", err));
  };

  const isValidUrl = (url) => {
    if (!url) return false;
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

      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-extrabold mb-6 text-center bg-white text-blue-600 rounded-lg shadow-lg p-4">
            PlayTerabox Video Downloader, Player, Embed Videos
          </h1>
{/* Ad Code */}
<div id="ad-container" className="my-4">
  <div
    dangerouslySetInnerHTML={{
      __html: `<script data-cfasync="false" async type="text/javascript" src="//kq.outsidesubtree.com/ttGzI3KIErx1k3A0/114258"></script>`,
    }}
  ></div>
</div>
{/* End of Ad Code */}

          <p className="text-lg text-gray-700 mb-6">
            Play and download Terabox videos easily with PlayTerabox. Our tool offers embed videos, skip ads, no login, and just pure video enjoyment!
          </p>
        </div>

        <div className="bg-white backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-slate-700">
          <div className="relative space-y-4">
            <input
              id="input-url"
              type="text"
              value={inputUrl}
              onChange={handleUrlChange}
              placeholder="Paste your Terabox URL here"
              className="w-full bg-white text-blue-600/text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <button
              onClick={handleWatchVideo}
              className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              Watch Video
            </button>
          </div>
        </div>

        {/* Video and Loading Bar */}
        {(isLoading || videoUrl) && (
          <div className="relative space-y-4 mt-4">
            {/* Video iframe */}
            {videoUrl && (
              <div className="bg-slate-white">
                <iframe
                  src={`https://player.terabox.tech/?url=${encodeURIComponent(videoUrl)}`}
                  className="w-full aspect-video rounded-lg"
                  frameBorder="0"
                  allowFullScreen
                  scrolling="no"
                />
              </div>
            )}

            {/* Loading Bar */}
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="relative w-3/4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${loadingProgress}%` }}
                    className="absolute h-full bg-blue-600 transition-all duration-200"
                  ></div>
                </div>
                <p className="text-center text-gray-700 font-medium animate-pulse mt-2">
                  Loading Your Video Please Wait
                </p>
              </div>
            )}
          </div>
        )}

        {/* Buttons below the video */}
        {videoUrl && (
          <div className="space-y-4">
            <button
              className="block w-full px-6 py-3 bg-orange-500 hover:bg-orange-400 rounded-xl text-white font-bold transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
              onClick={() => {
                window.open("https://acridiumverneukeryoverfill.monster/EFrgmdcf526a23e34fa5209d7d4e9a7d9a40561164584?q={KEYWORD}");
              }}
            >
              Download Now
            </button>

            <a
              href={`https://player.terabox.tech/?url=${encodeURIComponent(videoUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-6 py-3 bg-green-600 hover:bg-green-500 rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
            >
              Open Full-Screen Video
            </a>

            <div className="grid gap-4 md:grid-cols-2">
              <button
                onClick={copyEmbedCode}
                className="group relative px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
              >
                Copy Embed Code
              </button>

              <button
                onClick={copyShareLink}
                className="group relative px-6 py-3 bg-violet-600 hover:bg-violet-500 rounded-xl transition-all duration-200 shadow-lg hover:shadow-violet-500/25"
              >
                Share Link
              </button>
            </div>
          </div>
        )}
      </div>
      <TeraboxScriptSection /> {/* Include the component */}
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
        <div className="text-center mb-8"><img src="https://tgpaste.me/wp-content/uploads/2025/01/copy.png" alt="Copy Link Image" className="inline-block w-[18rem] h-[28rem]" /></div>
        <p className="text-lg text-gray-700 mb-6">
          <strong>Step 2: Paste the Link:</strong> Visit Playterabox.com and paste the link into the input field.
        </p>
        <div className="text-center mb-8"><img src="https://tgpaste.me/wp-content/uploads/2025/01/Paste.jpg" alt="Paste the Link Image" className="inline-block w-[18rem] h-[28rem]" /></div>
        <p className="text-lg text-gray-700 mb-6">
          <strong>Step 3: Play or Download:</strong> Click On Watch Now Button. The Video starts playing below, You can also download the video.
        </p>
        <div className="text-center mb-8"><img src="https://tgpaste.me/wp-content/uploads/2025/01/photo_2025-01-16_02-26-56.jpg" alt="Play or Download Image" className="inline-block w-[18rem] h-[28rem]" /></div>
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
