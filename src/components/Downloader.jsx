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
    setInputUrl(url);
    // Update the URL with the input URL parameter only if valid
    if (isValidUrl(url)) {
      const newUrl = `${window.location.pathname}?url=${encodeURIComponent(
        url
      )}`;
      router.push(newUrl);
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
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black-400 to-white-600 text-black p-6">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper />
      </Suspense>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold mb-6 text-center bg-white text-blue-600 rounded-lg shadow-lg p-4">
            PlayTerabox Video Downloader, Player, Embed Videos
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Play and download Terabox videos easily with PlayTerabox. Our tool offers embed videos, skip ads, no login, and just pure video enjoyment!
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-700">
          <div className="relative">
            <input
              id="input-url"
              type="text"
              value={inputUrl}
              onChange={handleUrlChange}
              placeholder="Paste your Terabox URL here"
              className="w-full bg-slate-900/50 text-white placeholder-slate-400 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
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

            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-slate-700">
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
                Open Video
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Downloader;

export function DisqusComments() {
  return (
    <div>
      <div id="disqus_thread" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          var disqus_config = function () {
            this.page.url = window.location.href;
            this.page.identifier = window.location.pathname;
          };
          (function() {
            var d = document, s = d.createElement('script');
            s.src = 'https://terabox-1.disqus.com/embed.js';
            s.setAttribute('data-timestamp', +new Date());
            (d.head || d.body).appendChild(s);
          })();
        `,
        }}
      />
      <noscript>
        Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
      <script id="dsq-count-scr" src="//terabox-1.disqus.com/count.js" async></script>
    </div>
  );
}

const TeraboxScriptSection = () => {
  return (
    <section className="py-16 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">🎥 Terabox Video Player/Downloader Script</h1>
        <p className="text-lg text-gray-700 mb-8">
          Simplify your workflow with our Terabox script! Easily play, embed, and download Terabox videos directly from your website or application. Ideal for content creators and developers looking to enhance video integration seamlessly. Contact us for more information: jokes4ush@gmail.com
        </p>
        <button
          onClick={() => window.open('https://buymeacoffee.com/sh20raj/e/335508', '_blank')}
          className="px-6 py-3 text-lg font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-400 transition-colors"
        >
          Buy Now 🚀
        </button>
      </div>
    </section>
  );
};
