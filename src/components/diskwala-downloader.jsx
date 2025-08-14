// "use client";

// import { useState } from "react";

// const Downloader = () => {
//   const [inputUrl, setInputUrl] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [showButtons, setShowButtons] = useState(false);

//   const handleUrlChange = (e) => {
//     setInputUrl(e.target.value);
//   };

//   const handleWatchVideo = () => {
//     if (!inputUrl.trim()) {
//       alert("Please enter a valid link.");
//       return;
//     }

//     setIsLoading(true);
//     setShowButtons(false);
//     setProgress(0);

//     // Progress bar animation (6–7 seconds)
//     let time = 0;
//     const interval = setInterval(() => {
//       time += 100;
//       setProgress(Math.min((time / 7000) * 100, 100));
//     }, 100);

//     // After loading finishes, show buttons
//     setTimeout(() => {
//       clearInterval(interval);
//       setIsLoading(false);
//       setProgress(100);
//       setShowButtons(true);
//     }, 7000);
//   };

//   const handleButtonClick = () => {
//     window.location.reload();
//   };

//   return (
//     <div className="from-black-400 to-white-600 text-black px-4">
//       <div className="max-w-3xl mx-auto space-y-8">
//         {/* Input Area */}
//         <div
//           className="backdrop-blur-lg rounded-2xl p-4 shadow-xl"
//           style={{ marginTop: "10px" }}
//         >
//           <div className="relative w-full">
//             <input
//               id="input-url"
//               type="text"
//               value={inputUrl}
//               onChange={handleUrlChange}
//               placeholder="Paste your video URL here..."
//               className="w-full bg-white text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
//             />
//           </div>

//           <button
//             onClick={handleWatchVideo}
//             disabled={isLoading || !inputUrl.trim()}
//             className="w-full px-6 py-3 mt-4 bg-black hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
//           >
//             {isLoading ? "Processing..." : "Get Video"}
//           </button>
//         </div>

//         {/* Progress Bar */}
//         {isLoading && (
//           <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
//             <div
//               className="bg-blue-500 h-4 transition-all duration-100 ease-linear"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//         )}

//         {/* Fake Thumbnail + Buttons */}
//         {showButtons && (
//           <div className="space-y-4 text-center">
//             <img
//               src="/fake-thumbnail.jpg"
//               alt="Video Thumbnail"
//               className="rounded-xl shadow-lg mx-auto"
//               style={{ maxHeight: "300px", objectFit: "cover" }}
//             />

//             {/* Download & Watch Buttons */}
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <button
//                 onClick={handleButtonClick}
//                 className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg"
//               >
//                 Download Video
//               </button>

//               <button
//                 onClick={handleButtonClick}
//                 className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg"
//               >
//                 Watch Now
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Downloader;


"use client";

import { useState } from "react";

const Downloader = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [playerError, setPlayerError] = useState(false);

  const handleUrlChange = (e) => {
    setInputUrl(e.target.value);
  };

  const handleGetVideo = () => {
    if (!inputUrl.trim()) {
      alert("Please enter a valid link.");
      return;
    }

    setIsLoading(true);
    setShowPlayer(false);
    setProgress(0);
    setPlayerError(false);

    let time = 0;
    const interval = setInterval(() => {
      time += 100;
      setProgress(Math.min((time / 7000) * 100, 100));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsLoading(false);
      setProgress(100);
      setShowPlayer(true);

      setTimeout(() => {
        setPlayerError(true);
      }, 60000);
    }, 7000);
  };

  const handleRetry = () => {
    setPlayerError(false);
    setTimeout(() => {
      setPlayerError(true);
    }, 60000);
  };

  return (
    <div className="from-black-400 to-white-600 text-black px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Input Area */}
        <div
          className="backdrop-blur-lg rounded-2xl p-4 shadow-xl"
          style={{ marginTop: "10px" }}
        >
          <div className="relative w-full">
            <input
              id="input-url"
              type="text"
              value={inputUrl}
              onChange={handleUrlChange}
              placeholder="Paste your video URL here..."
              className="w-full bg-white text-slate-900 placeholder-slate-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <button
            onClick={handleGetVideo}
            disabled={isLoading || !inputUrl.trim()}
            className="w-full px-6 py-3 mt-4 bg-black hover:bg-blue-500 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
          >
            {isLoading ? "Processing..." : "Get Video"}
          </button>
        </div>

        {/* Progress Bar */}
        {isLoading && (
          <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
            <div
              className="bg-blue-500 h-4 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Fake Player */}
        {showPlayer && (
          <div className="space-y-4 text-center">
            <div
              className="relative bg-black rounded-xl shadow-lg mx-auto flex items-center justify-center"
              style={{ height: "300px", maxWidth: "100%" }}
            >
              {!playerError ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
                  <p className="text-white text-lg">Loading video...</p>
                </div>
              ) : (
                <div className="flex flex-col items-center text-white">
                  <p className="text-red-500 text-lg font-bold">
                    Failed to load video.
                  </p>
                  <button
                    onClick={handleRetry}
                    className="mt-3 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg font-bold text-black"
                  >
                    Retry
                  </button>
                </div>
              )}
            </div>

            {/* Download Button with Info */}
            <div className="flex justify-center items-center relative">
              <button
                disabled
                className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl cursor-not-allowed shadow-lg pr-8"
              >
                Download Now
              </button>

              {/* Small Info Button */}
              <div className="absolute right-[calc(50%-92px)] flex items-center">
                <button
                  title="Sorry, Download option has some issues. Please try again later."
                  className="w-6 h-6 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-full transition-all shadow-md"
                >
                  i
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Downloader;
