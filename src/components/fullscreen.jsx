// "use client";

// import { useSearchParams } from "next/navigation";
// import { Suspense } from "react";
// import AdsenseAd from "@/components/AdsenseAd";

// const VideoPlayer = () => {
//   const searchParams = useSearchParams();
//   const videoUrl = searchParams.get("url");

//   if (!videoUrl) {
//     return <p className="text-center text-red-500 font-bold">Invalid or Missing URL</p>;
//   }

//   return (
//     <div className="relative overflow-hidden rounded-lg">
//       <iframe
//         src={`https://player.terabox.tech/?url=${encodeURIComponent(videoUrl)}`}
//         className="w-full rounded-lg"
//         frameBorder="0"
//         allowFullScreen
//         scrolling="no"
//         style={{ height: window.innerWidth < 768 ? "450px" : "600px" }}
//       />
//     </div>
//   );
// };

// // ✅ Wrap it in Suspense
// const SafeVideoPlayer = () => (
//   <Suspense fallback={<p className="text-center">Loading...</p>}>
//     <VideoPlayer />
//   </Suspense>
// );

// export default SafeVideoPlayer;