"use client";
import Link from 'next/link';
import { useState } from "react";
import { Download, Play, FileVideo, Calendar, HardDrive } from "lucide-react";

const VideoMetadataCard = ({ videoData, isLoading }) => {
  const [downloadLoading, setDownloadLoading] = useState({});
  const [streamLoading, setStreamLoading] = useState({});
  const [selectedFileIndex, setSelectedFileIndex] = useState(0);

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
          <p className="text-red-600">
            Unable to fetch video data. Please check the URL and try again.
          </p>
        </div>
      </div>
    );
  }

  const files = videoData.list; // Get all files
  const selectedFile = files[selectedFileIndex];
  const downloadPrefix = process.env.NEXT_PUBLIC_DOWNLOAD_PREFIX;
  const streamPlayer = process.env.NEXT_PUBLIC_STREAM_PLAYER;

  const handleDownload = async (fileIndex) => {
    const file = files[fileIndex];
    if (!file.direct_link) {
      alert("Download link not available");
      return;
    }

    setDownloadLoading(prev => ({ ...prev, [fileIndex]: true }));
    try {
      const downloadUrl = `${downloadPrefix}${file.direct_link}`;
      if (typeof window !== 'undefined') {
        window.open(downloadUrl, '_blank');
      }
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to initiate download");
    } finally {
      setDownloadLoading(prev => ({ ...prev, [fileIndex]: false }));
    }
  };

  const handleStream = async (fileIndex) => {
    const file = files[fileIndex];
    if (!file.stream_url) {
      alert("Stream URL not available");
      return;
    }

    setStreamLoading(prev => ({ ...prev, [fileIndex]: true }));
    try {
      // Use player.teraboxdl.site as requested
      const streamUrl = `https://${streamPlayer}${file.stream_url}`;
      if (typeof window !== 'undefined') {
        window.open(streamUrl, '_blank');
      }
    } catch (error) {
      console.error("Stream error:", error);
      alert("Failed to open stream");
    } finally {
      setStreamLoading(prev => ({ ...prev, [fileIndex]: false }));
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return "Unknown size";
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown date";
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  // If multiple files, show beautiful grid layout
  if (files.length > 1) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Found {files.length} Files
          </h3>
          <p className="text-gray-600">Choose a file to download or stream</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                {file.thumbs && file.thumbs.url1 ? (
                  <img
                    src={file.thumbs.url1}
                    alt={file.server_filename}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileVideo className="h-16 w-16 text-white opacity-80" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-lg text-xs font-medium">
                  {formatFileSize(file.size)}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2 truncate" title={file.server_filename}>
                  {file.server_filename || `Video File ${index + 1}`}
                </h4>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{formatDate(file.server_mtime)}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
  <div className="flex space-x-2">
    {/* Real Download */}
    <button
      onClick={() => handleDownload(index)}
      disabled={downloadLoading[index] || !file.direct_link}
      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-all duration-200"
    >
      <Download className="h-4 w-4" />
      <span>{downloadLoading[index] ? "..." : "Download"}</span>
    </button>

    {/* Real Stream */}
    <button
      onClick={() => handleStream(index)}
      disabled={streamLoading[index] || !file.stream_url}
      className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white text-sm font-medium rounded-lg transition-all duration-200"
    >
      <Play className="h-4 w-4" />
      <span>{streamLoading[index] ? "..." : "Stream"}</span>
    </button>
  </div>

  {/* Ad Download Button */}
  <button
    onClick={() =>
      window.open(
        "https://acridiumverneukeryoverfill.monster/zqr0k15a163761db9187780a2bdfe7d6ff52de395b4ad?q=free-download",
        "_blank"
      )
    }
    className="flex items-center justify-center space-x-1 px-3 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-semibold rounded-lg transition-all duration-200"
  >
    <span>🎬 Free Download (Ad)</span>
  </button>
</div>

              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Single file display
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-slate-200">
      <div className="space-y-6">
        {/* Single Video Info Header */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-start space-x-3">
            <FileVideo className="h-8 w-8 text-blue-600 mt-1" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedFile.server_filename || "Video File"}
              </h3>
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

        {/* Thumbnail */}
        {selectedFile.thumbs && selectedFile.thumbs.url1 && (
          <div className="flex justify-center">
            <img
              src={selectedFile.thumbs.url1}
              alt="Video thumbnail"
              className="max-w-full h-auto rounded-lg shadow-md"
              style={{ maxHeight: "200px" }}
            />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
  <Link
    href={`https://${streamPlayer}/player/${files[0].id}`}
    target="_blank"
    className="flex-1 text-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-400/25"
  >
    ▶️ Stream
  </Link>

  <Link
    href={`${downloadPrefix}${files[0].id}`}
    target="_blank"
    className="flex-1 text-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-400/25"
  >
    ⬇️ Download
  </Link>

  {/* 💡 Free Download (Ad) Button */}
  <button
    onClick={() =>
      window.open(
        "https://acridiumverneukeryoverfill.monster/zqr0k15a163761db9187780a2bdfe7d6ff52de395b4ad?q=free-download",
        "_blank"
      )
    }
    className="flex-1 text-center px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-yellow-400/25"
  >
    🎬 Free Download (Ad)
  </button>
</div>


        {/* Additional Info */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-800 mb-2">File Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
            <div>File ID: {selectedFile.fs_id}</div>
            <div>Path: {selectedFile.path}</div>
            {selectedFile.md5 && <div>MD5: {selectedFile.md5.substring(0, 16)}...</div>}
            {selectedFile.emd5 && <div>eMD5: {selectedFile.emd5.substring(0, 16)}...</div>}
          </div>
        </div>

        {/* Debug Info (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="bg-yellow-50 rounded-lg p-4">
            <summary className="font-semibold text-yellow-800 cursor-pointer">
              Debug Info (Development Only)
            </summary>
            <pre className="mt-2 text-xs text-yellow-700 overflow-auto">
              {JSON.stringify(selectedFile, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};

export default VideoMetadataCard;
