"use client";

import { Suspense } from 'react';
import HLSVideoPlayer from '@/components/HLSVideoPlayer';

export const dynamic = "force-dynamic"; // ✅ Force dynamic rendering

function PlayerPageContent() {
  return (
    <main className="min-h-screen">
      <HLSVideoPlayer />
    </main>
  );
}

export default function PlayerPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading player...</div>
      </div>
    }>
      <PlayerPageContent />
    </Suspense>
  );
}
