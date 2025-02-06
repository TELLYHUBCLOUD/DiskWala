"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export const links = [
  { name: "Home", slug: "/" },
  { name: "Blog", slug: "/blog" },
  { name: "Terabox Downloader", slug: "/tools/terabox-downloader" },
  { name: "Terabox Online Player", slug: "/tools/terabox-online-player" },
  { name: "Use our Bot", slug: "https://t.me/TeraboxxVideoDownloaderbot" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHomeClick = (e) => {
    e.preventDefault();
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-blue-300 to-transparent backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <a
            href="/blog/"
            className="flex items-center gap-3 transition duration-200 hover:opacity-80"
            onClick={handleHomeClick}
          >
            <img
              src="/logo.ico"
              alt="PlayTerabox Logo"
              className="w-12 h-12"
            />
            <span className="text-lg font-bold text-black">PlayTerabox Blog</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map(({ name, slug }, i) => (
              <Link
                key={i}
                href={slug}
                className="relative text-sm text-gray-900 hover:text-red transition-colors duration-200 group"
              >
                {name}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-red-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-full bg-gray-100 hover:bg-white/10 transition-colors duration-200"
            aria-label="Toggle menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-gray-300" />
            ) : (
              <Menu className="w-5 h-5 text-gray-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <nav className="absolute top-full left-0 right-0 bg-gray-950/95 backdrop-blur-lg border-b border-white/5 px-4 py-3 flex flex-col gap-2">
            {links.map(({ name, slug }, i) => (
              <Link
                key={i}
                href={slug}
                className="py-2 px-4 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
