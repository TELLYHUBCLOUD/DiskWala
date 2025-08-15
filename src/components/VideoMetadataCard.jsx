// "use client";

// import { useState } from "react";
// import { Download, Play, FileVideo, Calendar, HardDrive } from "lucide-react";

// const VideoMetadataCard = ({ videoData, isLoading }) => {
//   const [downloadLoading, setDownloadLoading] = useState({});
//   const [streamLoading, setStreamLoading] = useState({});
//   const [selectedFileIndex, setSelectedFileIndex] = useState(0);

//   if (isLoading) {
//     return (
//       <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 animate-pulse">
//         <div className="space-y-4">
//           <div className="h-6 bg-gray-200 rounded w-3/4"></div>
//           <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//           <div className="h-4 bg-gray-200 rounded w-2/3"></div>
//           <div className="flex space-x-4">
//             <div className="h-12 bg-gray-200 rounded w-32"></div>
//             <div className="h-12 bg-gray-200 rounded w-32"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!videoData || !videoData.list || videoData.list.length === 0) {
//     return (
//       <div className="bg-red-50 rounded-2xl p-6 shadow-xl border border-red-200">
//         <div className="text-center">
//           <FileVideo className="mx-auto h-12 w-12 text-red-400 mb-4" />
//           <h3 className="text-lg font-semibold text-red-800 mb-2">No Video Found</h3>
//           <p className="text-red-600">
//             Unable to fetch video data. Please check the URL and try again.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const files = videoData.list; // Get all files
//   const selectedFile = files[selectedFileIndex];
//   const downloadPrefix = process.env.NEXT_PUBLIC_DOWNLOAD_PREFIX;
//   const streamPlayer = process.env.NEXT_PUBLIC_STREAM_PLAYER;

//   const handleDownload = async (fileIndex) => {
//     const file = files[fileIndex];
//     if (!file.direct_link) {
//       alert("Download link not available");
//       return;
//     }

//     setDownloadLoading(prev => ({ ...prev, [fileIndex]: true }));
//     try {
//       const downloadUrl = `${downloadPrefix}${file.direct_link}`;
//       if (typeof window !== 'undefined') {
//         window.open(downloadUrl, '_blank');
//       }
//     } catch (error) {
//       console.error("Download error:", error);
//       alert("Failed to initiate download");
//     } finally {
//       setDownloadLoading(prev => ({ ...prev, [fileIndex]: false }));
//     }
//   };

//   const handleStream = async (fileIndex) => {
//     const file = files[fileIndex];
//     if (!file.stream_url) {
//       alert("Stream URL not available");
//       return;
//     }

//     setStreamLoading(prev => ({ ...prev, [fileIndex]: true }));
//     try {
//       // Redirect to our internal HLS video player
//       // Pass the stream_url as a URL parameter to our /player page
//       const playerUrl = `/player?url=${encodeURIComponent(file.stream_url)}`;
//       if (typeof window !== 'undefined') {
//         window.open(playerUrl, '_blank');
//       }
//     } catch (error) {
//       console.error("Stream error:", error);
//       alert("Failed to open stream");
//     } finally {
//       setStreamLoading(prev => ({ ...prev, [fileIndex]: false }));
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (!bytes) return "Unknown size";
//     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//     if (bytes === 0) return '0 Bytes';
//     const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
//     return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
//   };

//   const formatDate = (timestamp) => {
//     if (!timestamp) return "Unknown date";
//     return new Date(timestamp * 1000).toLocaleDateString();
//   };

//   // If multiple files, show beautiful grid layout
//   if (files.length > 1) {
//     return (
//       <div className="space-y-6">
//         <div className="text-center">
//           <h3 className="text-2xl font-bold text-gray-900 mb-2">
//             Found {files.length} Files
//           </h3>
//           <p className="text-gray-600">Choose a file to download or stream</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {files.map((file, index) => (
//             <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
//               {/* Thumbnail */}
//               <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
//                 {file.thumbs && file.thumbs.url1 ? (
//                   <img
//                     src={file.thumbs.url1}
//                     alt={file.server_filename}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center">
//                     <FileVideo className="h-16 w-16 text-white opacity-80" />
//                   </div>
//                 )}
//                 <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-xs font-medium">
//                   {formatFileSize(file.size)}
//                 </div>
//               </div>

//               {/* Content */}
//               <div className="p-4">
//                 <h4 className="font-semibold text-gray-900 mb-2 truncate" title={file.server_filename}>
//                   {file.server_filename || `Video File ${index + 1}`}
//                 </h4>

//                 <div className="flex items-center text-sm text-gray-500 mb-4">
//                   <Calendar className="h-4 w-4 mr-1" />
//                   <span>{formatDate(file.server_mtime)}</span>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex space-x-2">
//                   <button
//                     onClick={() => handleDownload(index)}
//                     disabled={downloadLoading[index] || !file.direct_link}
//                     className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-all duration-200"
//                   >
//                     <Download className="h-4 w-4" />
//                     <span>{downloadLoading[index] ? "..." : "Download"}</span>
//                   </button>

//                   <button
//                     onClick={() => handleStream(index)}
//                     disabled={streamLoading[index] || !file.stream_url}
//                     className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-all duration-200"
//                   >
//                     <Play className="h-4 w-4" />
//                     <span>{streamLoading[index] ? "..." : "Stream"}</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   // Single file display
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
//       <div className="space-y-6">
//         {/* Single Video Info Header */}
//         <div className="border-b border-gray-200 pb-4">
//           <div className="flex items-start space-x-3">
//             <FileVideo className="h-8 w-8 text-blue-600 mt-1" />
//             <div className="flex-1">
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 {selectedFile.server_filename || "Video File"}
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
//                 <div className="flex items-center space-x-2">
//                   <HardDrive className="h-4 w-4" />
//                   <span>Size: {formatFileSize(selectedFile.size)}</span>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Calendar className="h-4 w-4" />
//                   <span>Modified: {formatDate(selectedFile.server_mtime)}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Thumbnail */}
//         {selectedFile.thumbs && selectedFile.thumbs.url1 && (
//           <div className="flex justify-center">
//             <img
//               src={selectedFile.thumbs.url1}
//               alt="Video thumbnail"
//               className="max-w-full h-auto rounded-lg shadow-md"
//               style={{ maxHeight: "200px" }}
//             />
//           </div>
//         )}

//         {/* Action Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4">
//           <button
//             onClick={() => handleDownload(selectedFileIndex)}
//             disabled={downloadLoading[selectedFileIndex] || !selectedFile.direct_link}
//             className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
//           >
//             <Download className="h-5 w-5" />
//             <span>{downloadLoading[selectedFileIndex] ? "Preparing..." : "Download"}</span>
//           </button>

//           <button
//             onClick={() => handleStream(selectedFileIndex)}
//             disabled={streamLoading[selectedFileIndex] || !selectedFile.stream_url}
//             className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
//           >
//             <Play className="h-5 w-5" />
//             <span>{streamLoading[selectedFileIndex] ? "Opening..." : "HD Stream"}</span>
//           </button>
//         </div>

//         {/* Additional Info */}
//         <div className="bg-gray-50 rounded-lg p-4">
//           <h4 className="font-semibold text-gray-800 mb-2">File Details</h4>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
//             <div>File ID: {selectedFile.fs_id}</div>
//             <div>Path: {selectedFile.path}</div>
//             {selectedFile.md5 && <div>MD5: {selectedFile.md5.substring(0, 16)}...</div>}
//             {selectedFile.emd5 && <div>eMD5: {selectedFile.emd5.substring(0, 16)}...</div>}
//           </div>
//         </div>

//         {/* Debug Info (only in development) */}
//         {process.env.NODE_ENV === 'development' && (
//           <details className="bg-yellow-50 rounded-lg p-4">
//             <summary className="font-semibold text-yellow-800 cursor-pointer">
//               Debug Info (Development Only)
//             </summary>
//             <pre className="mt-2 text-xs text-yellow-700 overflow-auto">
//               {JSON.stringify(selectedFile, null, 2)}
//             </pre>
//           </details>
//         )}
//       </div>
//     </div>
//   );
// };

// export default VideoMetadataCard;
"use client";

import { useState, useEffect } from "react";
import { Download, Play, FileVideo, Calendar, HardDrive, Info } from "lucide-react";

const VideoMetadataCard = ({ videoData, isLoading }) => {
  const [downloadLoading, setDownloadLoading] = useState({});
  const [streamLoading, setStreamLoading] = useState({});
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Unlock time in hours (change to 12 or 24)
  const UNLOCK_DURATION_HOURS = 12;

  // Replace this with your actual ad link
  const AD_URL = "https://www.profitableratecpm.com/ffh9hsd52?key=5d61b42be252572d45b9bceaf0a155ae";

  useEffect(() => {
    const unlockData = localStorage.getItem("adUnlockData");
    if (unlockData) {
      const { timestamp } = JSON.parse(unlockData);
      const now = Date.now();
      if (now - timestamp < UNLOCK_DURATION_HOURS * 60 * 60 * 1000) {
        setIsUnlocked(true);
      }
    }
  }, []);

  const handleAdClick = () => {
    // Step 1: Open actual ad in new tab
    if (typeof window !== "undefined") {
      window.open(AD_URL, "_blank");
    }

    // Step 2: Save unlock data locally
    localStorage.setItem("adUnlockData", JSON.stringify({ timestamp: Date.now() }));
    setIsUnlocked(true);
    alert(`✅ Access unlocked! You can now download or stream for the next ${UNLOCK_DURATION_HOURS} hours.`);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200 animate-pulse">
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="flex space-x-4">
            <div className="h-12 bg-gray-200 rounded w-32"></div>
            <div className="h-12 bg-gray-200 rounded w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!videoData || !videoData.list || videoData.list.length === 0) {
    return (
      <div className="bg-red-50 rounded-2xl p-6 shadow-xl border border-red-200">
        <div className="text-center">
          <FileVideo className="mx-auto h-12 w-12 text-red-400 mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">No Video Found</h3>
          <p className="text-red-600">Unable to fetch video data. Please check the URL and try again.</p>
        </div>
      </div>
    );
  }

  const files = videoData.list;
  const selectedFile = files[selectedFileIndex];
  const downloadPrefix = process.env.NEXT_PUBLIC_DOWNLOAD_PREFIX;

  const handleDownload = async (fileIndex) => {
    const file = files[fileIndex];
    if (!file.direct_link) {
      alert("Download link not available");
      return;
    }
    setDownloadLoading((prev) => ({ ...prev, [fileIndex]: true }));
    try {
      const downloadUrl = `${downloadPrefix}${file.direct_link}`;
      window.open(downloadUrl, "_blank");
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to initiate download");
    } finally {
      setDownloadLoading((prev) => ({ ...prev, [fileIndex]: false }));
    }
  };

  const handleStream = async (fileIndex) => {
    const file = files[fileIndex];
    if (!file.stream_url) {
      alert("Stream URL not available");
      return;
    }
    setStreamLoading((prev) => ({ ...prev, [fileIndex]: true }));
    try {
      const playerUrl = `/player?url=${encodeURIComponent(file.stream_url)}`;
      window.open(playerUrl, "_blank");
    } catch (error) {
      console.error("Stream error:", error);
      alert("Failed to open stream");
    } finally {
      setStreamLoading((prev) => ({ ...prev, [fileIndex]: false }));
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "Unknown size";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 Bytes";
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + " " + sizes[i];
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const AdUnlockButton = () => (
    <div className="flex flex-col items-center bg-yellow-100 p-4 rounded-lg border border-yellow-300 shadow-md">
      <button
        onClick={handleAdClick}
        className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
      >
        <span>🔓 Click Here to Unlock Access</span>
        <Info className="h-5 w-5" title="Click this button to reveal Download & Stream options. This helps support the site." />
      </button>
      <p className="text-xs text-gray-700 mt-2 text-center">
        Click the button above to support us and unlock the download & streaming features for {UNLOCK_DURATION_HOURS} hours.
      </p>
    </div>
  );

  if (files.length > 1) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Found {files.length} Files</h3>
          <p className="text-gray-600">Choose a file to download or stream</p>
        </div>

        {!isUnlocked && <AdUnlockButton />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                {file.thumbs?.url1 ? (
                  <img src={file.thumbs.url1} alt={file.server_filename} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileVideo className="h-16 w-16 text-white opacity-80" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-xs font-medium">{formatFileSize(file.size)}</div>
              </div>

              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2 truncate" title={file.server_filename}>
                  {file.server_filename || `Video File ${index + 1}`}
                </h4>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(file.server_mtime)}</span>
                </div>

                {isUnlocked && (
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleDownload(index)}
                      disabled={downloadLoading[index] || !file.direct_link}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-all duration-200"
                    >
                      <Download className="h-4 w-4" />
                      <span>{downloadLoading[index] ? "..." : "Download"}</span>
                    </button>
                    <button
                      onClick={() => handleStream(index)}
                      disabled={streamLoading[index] || !file.stream_url}
                      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-all duration-200"
                    >
                      <Play className="h-4 w-4" />
                      <span>{streamLoading[index] ? "..." : "Stream"}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-start space-x-3">
            <FileVideo className="h-8 w-8 text-blue-600 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedFile.server_filename || "Video File"}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-4 w-4" />
                  <span>Size: {formatFileSize(selectedFile.size)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Modified: {formatDate(selectedFile.server_mtime)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {selectedFile.thumbs?.url1 && (
          <div className="flex justify-center">
            <img src={selectedFile.thumbs.url1} alt="Video thumbnail" className="max-w-full h-auto rounded-lg shadow-md" style={{ maxHeight: "200px" }} />
          </div>
        )}

        {!isUnlocked && <AdUnlockButton />}

        {isUnlocked && (
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => handleDownload(selectedFileIndex)}
              disabled={downloadLoading[selectedFileIndex] || !selectedFile.direct_link}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
            >
              <Download className="h-5 w-5" />
              <span>{downloadLoading[selectedFileIndex] ? "Preparing..." : "Download"}</span>
            </button>
            <button
              onClick={() => handleStream(selectedFileIndex)}
              disabled={streamLoading[selectedFileIndex] || !selectedFile.stream_url}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              <Play className="h-5 w-5" />
              <span>{streamLoading[selectedFileIndex] ? "Opening..." : "HD Stream"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoMetadataCard;
