"use client";

export default function Footer() {
  return (
    <div>
      {/* Desktop View */}
      <div className="hidden lg:flex flex-col">
        {/* Footer */}
        <footer className="bg-gray-100 backdrop-blur-sm border-t border-gray-300">
          <div className="max-w-7xl mx-auto px-8 py-6">
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-black">
              {[
                ["Privacy Policy", "/privacy-policy"],
                ["About Us", "/about-us"],
                ["Terms of Service", "/tos"],
                ["Contact", "/contact-us"],
                ["DMCA", "/dmca"],
              ].map(([title, url]) => (
                <a
                  key={title}
                  href={url}
                  className="hover:text-blue-500 transition-colors duration-200"
                >
                  {title}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden bg-gray-100 backdrop-blur-sm border-t border-gray-300 px-4 py-6">
        <nav className="flex flex-wrap justify-center gap-x-8 text-sm text-black">
          {[
            ["Privacy Policy", "/privacy-policy"],
            ["About Us", "/about-us"],
            ["Terms of Service", "/tos"],
            ["Contact", "/contact-us"],
            ["DMCA", "/dmca"],
          ].map(([title, url]) => (
            <a
              key={title}
              href={url}
              className="hover:text-blue-500 transition-colors duration-200"
            >
              {title}
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}
