// "use client";

// import { useState, useEffect, Suspense } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import AdsenseAd from "@/components/AdsenseAd";
// import VideoMetadataCard from "@/components/VideoMetadataCard";
// import { sendEncryptedRequest } from "@/utils/encryption";

// const Downloader = () => {
//   const router = useRouter();
//   const [inputUrl, setInputUrl] = useState("");
//   const [videoData, setVideoData] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const SearchParamsWrapper = () => {
//     const searchParams = useSearchParams();

//     useEffect(() => {
//       const url = searchParams.get("url");
//       if (url) {
//         setInputUrl(decodeURIComponent(url));
//       }
//     }, [searchParams]);

//     return null;
//   };

//   const handleUrlChange = (e) => {
//     const url = e.target.value;
//     setInputUrl(url);
//     if (isValidUrl(url)) {
//       const newUrl = `${typeof window !== 'undefined' ? window.location.pathname : ''}?url=${encodeURIComponent(url)}`;
//       router.push(newUrl);
//     }
//   };

//   const fetchVideoData = async (url) => {
//     setIsLoading(true);
//     setError(null);
//     setVideoData(null);

//     try {
//       const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
//       const apiKey = process.env.NEXT_PUBLIC_API_KEY;
//       const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY;

//       if (!apiUrl || !apiKey) {
//         throw new Error("Backend API configuration missing");
//       }

//       if (!secretKey) {
//         throw new Error("Encryption secret key missing");
//       }

//       // Use the new v2 encrypted API
//       const data = await sendEncryptedRequest(apiUrl, url, apiKey, secretKey);
//       setVideoData(data);
//     } catch (err) {
//       console.error("Error fetching video data:", err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleWatchVideo = () => {
//     if (isValidUrl(inputUrl)) {
//       fetchVideoData(inputUrl);
//     } else {
//       alert("Please enter a valid Terabox URL.");
//     }
//   };

//   const isValidUrl = (url) => {
//     if (!url) return false;
//     if (!url.startsWith("http://") && !url.startsWith("https://")) {
//         url = "https://" + url;
//     }

//     // Check if it's a valid Terabox URL
//     const teraboxDomains = [
//       'terabox.com', 'www.terabox.com', 'terabox.app', 'www.terabox.app',
//       '1024terabox.com', 'www.1024terabox.com', 'mirrobox.com', 'www.mirrobox.com',
//       'nephobox.com', 'www.nephobox.com', 'freeterabox.com', 'www.freeterabox.com',
//       '4funbox.com', 'www.4funbox.com', '4funbox.co', 'terabox.fun',
//       'tibibox.com', 'www.tibibox.com', 'momerybox.com', 'www.momerybox.com',
//       'teraboxapp.com', 'www.teraboxapp.com', '1024tera.com', 'www.1024tera.com',
//       'terasharelink.com', 'www.terasharelink.com', 'terafileshare.com', 'www.terafileshare.com',
//       'teraboxlink.com', 'www.teraboxlink.com'
//     ];

//     try {
//       const urlObj = new URL(url);
//       return teraboxDomains.includes(urlObj.hostname.toLowerCase());
//     } catch {
//       return false;
//     }
//   };

//   return (
//     <div className="from-black-400 to-white-600 text-black">
//       <Suspense fallback={<div>Loading...</div>}>
//         <SearchParamsWrapper />
//       </Suspense>
//       <div className="max-w-4xl mx-auto space-y-8">
//         <div className="backdrop-blur-lg rounded-2xl p-4 shadow-xl" style={{ marginTop: "10px" }}>
//           <div className="relative space-y-4">
//             <input
//               id="input-url"
//               type="text"
//               value={inputUrl}
//               onChange={handleUrlChange}
//               placeholder="Paste your Terabox URL here (e.g., https://terabox.com/s/...)"
//               className="w-full bg-white text-blue-600/text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//             />
//             <button
//               onClick={handleWatchVideo}
//               disabled={isLoading || !isValidUrl(inputUrl)}
//               className="w-full px-6 py-3 bg-black hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
//             >
//               {isLoading ? "Processing..." : "Get Video"}
//             </button>
//           </div>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//             <div className="text-red-800 font-semibold">Error:</div>
//             <div className="text-red-600">{error}</div>
//           </div>
//         )}

//         {/* Video Metadata Card */}
//         {(isLoading || videoData || error) && (
//           <VideoMetadataCard
//             videoData={videoData}
//             isLoading={isLoading}
//           />
//         )}
//       </div>
//     </div>
//   );
// };
//               {/* Banner Ad */}
// {/* <AdsenseAd adSlot="7504515148" /> */}
// export default Downloader;

"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AdsenseAd from "@/components/AdsenseAd";
import VideoMetadataCard from "@/components/VideoMetadataCard";
import { sendEncryptedRequest } from "@/utils/encryption";

const Downloader = () => {
  const router = useRouter();
  const [inputUrl, setInputUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isPasteMode, setIsPasteMode] = useState(true); // true = Paste button, false = Clear button

  // ✅ Validation + auto-https function
  const isValidUrl = (inputUrl) => {
    if (!inputUrl) return false;
    let url = inputUrl.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "https://" + url;
    }
    const teraboxDomains = [
      "terabox.com", "www.terabox.com", "terabox.app", "www.terabox.app",
      "1024terabox.com", "www.1024terabox.com", "mirrobox.com", "www.mirrobox.com",
      "nephobox.com", "www.nephobox.com", "freeterabox.com", "www.freeterabox.com",
      "4funbox.com", "www.4funbox.com", "4funbox.co", "terabox.fun",
      "tibibox.com", "www.tibibox.com", "momerybox.com", "www.momerybox.com",
      "teraboxapp.com", "www.teraboxapp.com", "1024tera.com", "www.1024tera.com",
      "terasharelink.com", "www.terasharelink.com", "terafileshare.com", "www.terafileshare.com",
      "teraboxlink.com", "www.teraboxlink.com"
    ];
    try {
      const urlObj = new URL(url);
      if (teraboxDomains.includes(urlObj.hostname.toLowerCase())) {
        return url;
      }
      return false;
    } catch {
      return false;
    }
  };

  const SearchParamsWrapper = () => {
    const searchParams = useSearchParams();
    useEffect(() => {
      const url = searchParams.get("url");
      if (url) {
        setInputUrl(decodeURIComponent(url));
        setIsLocked(true);
        setIsPasteMode(false); // Switch to clear mode if URL is loaded
      }
    }, [searchParams]);
    return null;
  };

  const handleUrlChange = (e) => {
    const typedUrl = e.target.value;
    setInputUrl(typedUrl);
    const validUrl = isValidUrl(typedUrl);
    if (validUrl) {
      setIsLocked(true);
      setIsPasteMode(false);
      const newUrl = `${typeof window !== "undefined" ? window.location.pathname : ""}?url=${encodeURIComponent(validUrl)}`;
      router.push(newUrl);
    }
  };

  const handlePasteOrClear = async () => {
    if (isPasteMode) {
      try {
        const text = await navigator.clipboard.readText();
        const validUrl = isValidUrl(text);
        if (!validUrl) {
          alert("Invalid Terabox link in clipboard!");
          return;
        }
        setInputUrl(validUrl);
        setIsLocked(true);
        setIsPasteMode(false);
        router.push(`?url=${encodeURIComponent(validUrl)}`);
      } catch {
        alert("Failed to read clipboard!");
      }
    } else {
      // Clear mode
      setInputUrl("");
      setIsLocked(false);
      setIsPasteMode(true);
      router.replace("/");
    }
  };

  const fetchVideoData = async (url) => {
    setIsLoading(true);
    setError(null);
    setVideoData(null);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY;
      if (!apiUrl || !apiKey) throw new Error("Backend API configuration missing");
      if (!secretKey) throw new Error("Encryption secret key missing");

      const data = await sendEncryptedRequest(apiUrl, url, apiKey, secretKey);
      setVideoData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWatchVideo = () => {
    const validUrl = isValidUrl(inputUrl);
    if (!validUrl) {
      alert("Please enter a valid Terabox URL.");
      return;
    }
    fetchVideoData(validUrl);
  };

  return (
    <div className="from-black-400 to-white-600 text-black px-4">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper />
      </Suspense>

      <div className="max-w-4xl mx-auto space-y-8"> {/* Restored bigger size */}
        <div className="backdrop-blur-lg rounded-2xl p-4 shadow-xl"style={{ marginTop: "10px" }}> {/* Bigger padding */}
          {/* Input with Paste/Clear toggle Button inside */}
          <div className="relative w-full">
            <input
              id="input-url"
              type="text"
              value={inputUrl}
              onChange={handleUrlChange}
              placeholder="Paste your Terabox URL here..."
              readOnly={isLocked}
              className="w-full bg-white text-blue-600/text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
            <button
              onClick={handlePasteOrClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition text-sm font-semibold"
            >
              {isPasteMode ? "Paste" : "Clear"}
            </button>
          </div>

          {/* Get Video Button */}
          <button
            onClick={handleWatchVideo}
            disabled={isLoading || !isValidUrl(inputUrl)}
            className="w-full px-6 py-3 mt-4 bg-black hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25
"
          >
            {isLoading ? "Processing..." : "Get Video"}
          </button>
        </div>
      {/* AdSense ad here */}
      <AdsenseAd adSlot="1048373308" />
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="text-red-800 font-semibold">Error:</div>
            <div className="text-red-600">{error}</div>
          </div>
        )}

        {/* Video Metadata */}
        {(isLoading || videoData || error) && (
          <VideoMetadataCard videoData={videoData} isLoading={isLoading} />
        )}
      </div>
    </div>
  );
};

export default Downloader;

