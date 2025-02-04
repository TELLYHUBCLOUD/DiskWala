"use client";

import SafeVideoPlayer from "@/components/playertera";
import Footer from "@/components/Footer";
import { Header } from "@/components/Header";

export const dynamic = "force-dynamic"; // ✅ Force dynamic rendering

export default function PlayPage() {
  return (
    <>
      <Header />
      <main className="mt-10">
        <SafeVideoPlayer />
      </main>
      <Footer />
    </>
  );
}
