"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
// import AdsenseAd from "@/components/AdsenseAd";

const VideoPlayer = () => {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get("url");
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const scrollToBottom = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Check if mobile on client side
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    // Simulate progress fill-up from 0 to 100% over 7 seconds
    if (isLoading) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const nextProgress = prev + 2; // Increase progress
          if (nextProgress >= 100) {
            clearInterval(interval);
            setIsLoading(false); // Stop loading after 100%
          }
          return nextProgress;
        });
      }, 140); // Update every 140ms
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!videoUrl) {
    return (
      <p className="text-center text-red-500 font-bold">
        Invalid or Missing URL
      </p>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-1">
      <div className="shadow-lg rounded-lg max-w-4xl w-full p-6 space-y-4">
        {/* Loading Bar */}
        {isLoading && (
          <div className="text-center mb-4">
            <div className="w-full bg-gray-300 rounded-md overflow-hidden mb-2 mt-4">
              <div
                className="bg-blue-600 h-2 rounded-md transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm font-semibold text-gray-600">
              Wait, Your Video is Loading
            </p>
          </div>
        )}
        {/* Banner Ad
        <AdsenseAd adSlot="7504515148" /> */}
        {/* Video iframe with correct spacing */}
        <div className="relative overflow-hidden rounded-lg">
          <iframe
            src={`https://player.terabox.tech/?url=${encodeURIComponent(
              videoUrl
            )}`}
            className="w-full rounded-lg"
            frameBorder="0"
            allowFullScreen
            scrolling="no"
            style={{ height: isMobile ? "450px" : "600px" }}
          />
        </div>

        {/* Scroll to Bottom Button */}
        <div className="text-center mt-4 space-y-2">
          <a
            href="https://benpoin.online?pub_id=341&id_site=441&name=Download+Now"
            className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-green-500/25"
          >
            Download Video
          </a>
          <button
            onClick={scrollToBottom}
            className="px-7 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
          >
            Play Another Video
          </button>
        </div>
      </div>
        {/* Banner Ad
        <AdsenseAd adSlot="7504515148" /> */}
      {/* Content Section */}
      <TeraboxScriptSection />
    </div>
  );
};

// ✅ Keep the TeraboxScriptSection below the video
const TeraboxScriptSection = () => {
  return (
    <section className="py-16 text-left border-t border-gray-300 mt-10 w-full">
      <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        🏋️ How to Get Fit in 2025: The Ultimate Health & Fitness Guide
      </h1>
                    {/* Banner Ad */}
{/* <AdsenseAd adSlot="7504515148" /> */}
      <p className="text-lg text-gray-700 mb-8">
        Staying fit in 2025 requires a combination of smart workouts, proper nutrition, and the latest technology-driven fitness trends. 
        With evolving science and digital tools, achieving optimal health has never been more accessible. This guide covers everything you need 
        to know about staying fit, improving your diet, leveraging technology, and adopting new lifestyle habits for better overall well-being.
      </p>
              {/* Banner Ad */}
{/* <AdsenseAd adSlot="7504515148" /> */}
      <h3 className="text-2xl font-semibold mb-4">1. Embrace AI-Powered Workouts</h3>
      <p className="text-lg text-gray-700 mb-8">
        AI-driven fitness apps analyze your progress and create personalized workout routines. Platforms like FitAI and SmartCoach provide real-time 
        feedback, helping you maximize results. AI coaches can correct your posture, suggest personalized exercises, and track your progress over time.
      </p>
      <ul className="list-disc ml-6 text-gray-700 mb-8">
        <li>AI-driven workouts adjust intensity based on performance.</li>
        <li>Virtual personal trainers offer guidance in real-time.</li>
        <li>Smart home gyms provide interactive training experiences.</li>
      </ul>
      <h3 className="text-2xl font-semibold mb-4">2. Focus on Functional Training</h3>
      <p className="text-lg text-gray-700 mb-8">
        Functional workouts improve overall mobility and strength, making everyday movements easier. 
        Exercises like kettlebell swings, resistance band training, and compound lifts should be a priority. Incorporating these movements improves 
        posture, balance, and flexibility, reducing injury risks in daily activities.
      </p>
              {/* Banner Ad */}
{/* <AdsenseAd adSlot="7504515148" /> */}
      <ul className="list-disc ml-6 text-gray-700 mb-8">
        <li>Bodyweight exercises enhance flexibility and coordination.</li>
        <li>Kettlebell workouts improve core strength and endurance.</li>
        <li>Plyometric training enhances speed and power.</li>
      </ul>
      <h3 className="text-2xl font-semibold mb-4">3. Optimize Your Nutrition</h3>
      <p className="text-lg text-gray-700 mb-8">
        In 2025, bio-individual nutrition takes center stage. Personalized diet plans based on DNA analysis and gut health tests ensure you 
        get the right nutrients for your body type. Avoid fad diets and focus on sustainable eating habits with whole foods, lean proteins, and 
        healthy fats.
      </p>
      <ul className="list-disc ml-6 text-gray-700 mb-8">
        <li>Track macros and micronutrients for balanced nutrition.</li>
        <li>Hydrate with electrolyte-rich drinks for better recovery.</li>
        <li>Adopt intermittent fasting for improved metabolic health.</li>
      </ul>
              {/* Banner Ad */}
{/* <AdsenseAd adSlot="7504515148" /> */}
      <h3 className="text-2xl font-semibold mb-4">4. Prioritize Mental Wellness</h3>
      <p className="text-lg text-gray-700 mb-8">
        Fitness isn’t just about the body; mental health plays a crucial role. Meditation, mindfulness, and stress management techniques are essential 
        components of a well-rounded fitness plan. Apps like Calm and Headspace help integrate mental well-being into daily routines.
      </p>
      <ul className="list-disc ml-6 text-gray-700 mb-8">
        <li>Practice daily mindfulness exercises.</li>
        <li>Engage in stress-reducing activities like yoga or deep breathing.</li>
        <li>Ensure adequate sleep for cognitive and physical recovery.</li>
      </ul>
      
      <h3 className="text-2xl font-semibold mb-4">5. Leverage Wearable Technology</h3>
      <p className="text-lg text-gray-700 mb-8">
        Smartwatches and fitness trackers provide real-time insights into heart rate, sleep patterns, and activity levels, ensuring you stay on top of 
        your fitness goals. Devices like Fitbit, Apple Watch, and WHOOP help monitor progress and optimize workouts.
      </p>
      <ul className="list-disc ml-6 text-gray-700 mb-8">
        <li>Track daily steps and calorie expenditure.</li>
        <li>Monitor sleep quality for optimal recovery.</li>
        <li>Use HRV (heart rate variability) data to gauge stress levels.</li>
      </ul>
      <h3 className="text-2xl font-semibold mb-4">6. Hydration & Recovery</h3>
      <p className="text-lg text-gray-700 mb-8">
        Proper hydration and recovery techniques, such as cold therapy and foam rolling, help prevent injuries and promote faster muscle recovery. 
        Drinking at least 2-3 liters of water daily and incorporating electrolyte drinks post-workout aids muscle repair and energy replenishment.
      </p>
      <ul className="list-disc ml-6 text-gray-700 mb-8">
        <li>Stay hydrated throughout the day.</li>
        <li>Use contrast showers to improve circulation.</li>
        <li>Perform active recovery sessions after intense workouts.</li>
      </ul>
              {/* Banner Ad */}
{/* <AdsenseAd adSlot="7504515148" /> */}
      <h3 className="text-2xl font-semibold mb-4">7. Try Biohacking for Maximum Performance</h3>
      <p className="text-lg text-gray-700 mb-8">
        Biohacking involves making small lifestyle changes to optimize physical and mental performance. Techniques such as red light therapy, nootropic 
        supplements, and cold plunges are becoming popular among fitness enthusiasts to boost endurance, focus, and recovery.
      </p>
      <ul className="list-disc ml-6 text-gray-700 mb-8">
        <li>Experiment with intermittent fasting for metabolic benefits.</li>
        <li>Use nootropics to enhance cognitive function and focus.</li>
        <li>Implement sleep tracking for better recovery.</li>
      </ul>
      
      <h2 className="text-2xl font-bold mt-8">🚀 Take Charge of Your Health in 2025!</h2>
      <p className="text-lg text-gray-700 mt-4">
        By integrating these strategies, you can achieve peak fitness in 2025. Stay disciplined, adapt new health technologies, and maintain consistency. 
        Whether you're a beginner or a seasoned athlete, taking small steps every day will lead to significant results in the long run. 
        Prioritize your well-being and make fitness a lifelong journey!
      </p>
        <div className="text-center mt-8">
          <a
            href="https://playterabox.com/"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
          >
            Play Another Video
          </a>
        </div>
      </div>
    </section>
  );
};

// ✅ Wrap everything in Suspense
const SafeVideoPlayer = () => (
  <Suspense fallback={<p className="text-center">Loading...</p>}>
    <VideoPlayer />
  </Suspense>
);

export default SafeVideoPlayer;
