"use client";

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const HLSVideoPlayer = () => {
  const searchParams = useSearchParams();
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState('dark');
  const currentBlobUrlRef = useRef(null);
  const requestCounterRef = useRef(Math.floor(Math.random() * 10));

  const API_BASE_URL = 'https://api.ronnieverse.site';
  
  const PROXY_WORKERS = [
    'https://hls-proxy.himanshumehta720.workers.dev'
  ];

  const updateStatus = (message, loading = false) => {
    setStatus(message);
    setIsLoading(loading);
  };

  const getNextProxyWorker = () => {
    const workerIndex = requestCounterRef.current % PROXY_WORKERS.length;
    requestCounterRef.current++;
    return PROXY_WORKERS[workerIndex];
  };

  const cleanupBlobUrls = () => {
    if (currentBlobUrlRef.current) {
      URL.revokeObjectURL(currentBlobUrlRef.current);
      currentBlobUrlRef.current = null;
    }
  };

  const fetchStreamFromStartParam = async (startParam) => {
    try {
      const m3u8StreamURL = decodeURIComponent(startParam);
      
      updateStatus('Fetching authenticated stream...', true);

      // Hit the get_m3u8_stream_fast endpoint as specified
      const getm3u8segmentsURL = `${API_BASE_URL}/get_m3u8_stream_fast/${encodeURIComponent(m3u8StreamURL)}`;
      console.log("Stream URL to hit", getm3u8segmentsURL);

      const response = await fetch(getm3u8segmentsURL, {
        headers: {
          'Referer': window.location.href,
        }
      });

      console.log('Request sent with referer:', window.location.href);

      if (!response.ok) {
        throw new Error(`Failed to get stream: ${response.status}`);
      }

      // Get the M3U8 content as text
      const m3u8Content = await response.text();

      if (!m3u8Content || !m3u8Content.includes('#EXTM3U')) {
        console.error('Invalid M3U8 content received:', m3u8Content.substring(0, 100));
        throw new Error('Invalid M3U8 content received');
      }

      console.log('Raw M3U8 content preview:', m3u8Content.substring(0, 500));

      // Process M3U8 content to ensure all URLs are absolute
      const lines = m3u8Content.split('\n');
      const processedLines = lines.map(line => {
        const trimmedLine = line.trim();
        // If line is a segment URL (not a comment line starting with #) and not already absolute
        if (!trimmedLine.startsWith('#') && trimmedLine &&
            !trimmedLine.startsWith('http') && !trimmedLine.startsWith('blob:')) {
          // This shouldn't happen with TeraBox, but just in case, log it
          console.warn('Found relative URL in M3U8:', trimmedLine);
        }
        return line;
      });

      const processedM3u8Content = processedLines.join('\n');
      console.log('Processed M3U8 content preview:', processedM3u8Content.substring(0, 500));

      // Create a blob URL from the processed M3U8 content
      const blob = new Blob([processedM3u8Content], { type: 'application/vnd.apple.mpegurl' });
      const blobUrl = URL.createObjectURL(blob);

      // Store the blob URL for later cleanup
      currentBlobUrlRef.current = blobUrl;

      return blobUrl;
    } catch (error) {
      console.error('Error fetching authenticated stream:', error);
      updateStatus(`Error: ${error.message}`);
      return null;
    }
  };

  const loadVideo = async (streamUrl) => {
    const video = videoRef.current;
    if (!video) return;

    const currentTime = video.currentTime;
    const wasPlaying = !video.paused;

    updateStatus('Loading video stream...', true);

    // Dynamic import of HLS.js to avoid SSR issues
    const Hls = (await import('hls.js')).default;

    if (Hls.isSupported()) {
      if (hlsRef.current) {
        hlsRef.current.destroy();
      }

      hlsRef.current = new Hls({
        xhrSetup: function(xhr, url) {
          console.log('HLS.js requesting URL:', url);

          // For blob URLs or API URLs, access directly (FIRST PRIORITY)
          if (url.startsWith('blob:') ||
              url.startsWith('https://api.ronnieverse.site') ||
              url.startsWith('https://ronnieverse.site')) {
            console.log('Direct access for blob/API URL:', url);
            xhr.open('GET', url, true);
          }
          // For TeraBox/freeterabox domains, USE ROUND-ROBIN WORKER
          else if (url.includes('freeterabox.com') ||
              url.includes('1024tera.com') ||
              url.includes('terabox.com')) {

            const proxyWorker = getNextProxyWorker();
            const newUrl = `${proxyWorker}/?url=${encodeURIComponent(url)}`;
            console.log('Proxying TeraBox URL:', newUrl);
            xhr.open('GET', newUrl, true);
          }
          // For all other URLs, use round-robin proxying
          else {
            const proxyWorker = getNextProxyWorker();
            const newUrl = `${proxyWorker}/?url=${encodeURIComponent(url)}`;
            console.log('Proxying other URL:', newUrl);
            xhr.open('GET', newUrl, true);
          }
          xhr.withCredentials = false;
        },
        // Implement retry logic for segment loading failures
        fragLoadingMaxRetry: 5,
        fragLoadingRetryDelay: 1000,
        manifestLoadingMaxRetry: 5,
        manifestLoadingRetryDelay: 1000
      });

      hlsRef.current.on(Hls.Events.ERROR, function(_, data) {
        if (data.fatal) {
          console.error('Fatal HLS error:', data);
          updateStatus(`Loading error: ${data.type}. Please try refreshing.`);
        }
      });

      hlsRef.current.on(Hls.Events.MANIFEST_PARSED, function() {
        video.currentTime = currentTime;
        updateStatus('Ready to play');
        if (wasPlaying) {
          video.play().catch(() => {
            updateStatus('Click play to start');
          });
        }
      });

      try {
        hlsRef.current.loadSource(streamUrl);
        hlsRef.current.attachMedia(video);
      } catch (error) {
        console.error('Error loading HLS source:', error);
        updateStatus('Error loading video');
      }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', function() {
        video.currentTime = currentTime;
        updateStatus('Ready to play');
        if (wasPlaying) {
          video.play().catch(() => {
            updateStatus('Click play to start');
          });
        }
      });
    } else {
      updateStatus('HLS not supported in this browser');
    }
  };

  const initPlayer = async () => {
    updateStatus('Initializing player...', true);

    const streamUrl = searchParams.get('url');
    console.log("Received stream url:", streamUrl);

    if (streamUrl) {
      const blobUrl = await fetchStreamFromStartParam(streamUrl);
      if (blobUrl) {
        loadVideo(blobUrl);
        return;
      }
    }

    updateStatus('Server Is Down Right Now, Only Download Option is Working');
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch (e) {
      console.warn('Could not save theme preference:', e);
    }
  };

  useEffect(() => {
    // Load saved theme
    try {
      const savedTheme = localStorage.getItem('theme') || 'dark';
      setTheme(savedTheme);
    } catch (e) {
      console.warn('Could not load theme preference:', e);
    }

    // Initialize player
    initPlayer();

    // Cleanup on unmount
    return () => {
      cleanupBlobUrls();
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [searchParams]);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' : 'bg-gradient-to-br from-gray-100 via-blue-100 to-purple-100'} flex flex-col items-center justify-center p-5 relative`}>
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-violet-200/30 via-transparent to-pink-200/30"></div>
        <div className="absolute top-1/5 left-1/5 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/5 right-1/5 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className={`fixed top-5 right-5 flex items-center gap-2 px-3 py-2 ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white' : 'bg-black/10 border-black/20 text-black'} border rounded-full backdrop-blur-md transition-all duration-300 hover:scale-105 z-50`}
      >
        {theme === 'dark' ? (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
            </svg>
            <span className="text-xs font-medium">Light</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"/>
            </svg>
            <span className="text-xs font-medium">Dark</span>
          </>
        )}
      </button>

      {/* Video container */}
      <div className={`relative w-full max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border backdrop-blur-xl z-10`}>
        <video
          ref={videoRef}
          controls
          className="w-full block bg-black rounded-3xl transition-all duration-400 min-h-[400px] focus:outline-none focus:ring-4 focus:ring-blue-500/60"
        />

        {/* Loading animation */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-3xl">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-blue-500/30"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
              <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-purple-500 animate-spin animation-delay-150"></div>
              <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-pink-500 animate-spin animation-delay-300"></div>
            </div>
          </div>
        )}
      </div>

      {/* Status display */}
      {status && (
        <div className={`mt-6 px-6 py-3 rounded-2xl ${theme === 'dark' ? 'bg-white/10 border-white/20 text-white' : 'bg-black/10 border-black/20 text-black'} border backdrop-blur-md shadow-lg z-10`}>
          <div className="flex items-center gap-3">
            {isLoading && (
              <div className="w-5 h-5 relative">
                <div className="absolute inset-0 rounded-full border-2 border-current opacity-30"></div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-current animate-spin"></div>
              </div>
            )}
            <span className="font-medium">{status}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HLSVideoPlayer;
