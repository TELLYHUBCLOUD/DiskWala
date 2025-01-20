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
    <div className="from-black-400 to-white-600 text-black">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper />
      </Suspense>
      <div className="max-w-4xl mx-auto space-y-8">

        <div className="backdrop-blur-lg rounded-2xl p-4 shadow-xl" style={{marginTop : '10px'}}>
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
              className="w-full px-6 py-3 bg-black hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              Download + Watch Video
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
                  style={{
                    height: window.innerWidth < 768 ? "450px" : "auto", // For mobile devices
                  }}
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
    </div>
  );
};

export default Downloader;


