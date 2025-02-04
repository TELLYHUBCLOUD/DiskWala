"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdsenseAd from "@/components/AdsenseAd";

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
    if (isValidUrl(url)) {
      setInputUrl(url);
      const newUrl = `${window.location.pathname}?url=${encodeURIComponent(url)}`;
      router.push(newUrl);
    }
  };

  const handleWatchVideo = () => {
    if (isValidUrl(inputUrl)) {
      const newUrl = `/play/?url=${encodeURIComponent(inputUrl)}`;
      router.push(newUrl); // Open the new URL in the same tab
    } else {
      alert("Please enter a valid URL.");
    }
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
        <div className="backdrop-blur-lg rounded-2xl p-4 shadow-xl" style={{ marginTop: "10px" }}>
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
              Watch Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
              {/* Banner Ad */}
{/* <AdsenseAd adSlot="7504515148" /> */}
export default Downloader;
