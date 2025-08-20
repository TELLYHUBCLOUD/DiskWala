import { Header } from "@/components/Header";
import { PageContainer } from "@/components/layout/PageContainer";
import React from "react";

export const metadata = {
  title: "Contact Us - TheDiskWala",
  description:
    "Get in Touch With TheDiskWala Team Now.",
  robots: "index, follow",
  openGraph: {
    title: "Contact Us - TheDiskWala",
    description: "Get in Touch With TheDiskWala Team Now.",
    type: "website",
    url: "https://thediskwala.com/contact-us",
    images: ["/og.jpg"],
  },
};

export default function page() {
  return (
    <>
      <Header />
      <PageContainer title="Contact Us">
        <Content />
      </PageContainer>
    </>
  );
}

const Content = () => {
  return (
    <div className="text-center">
      <div className="max-w-xl mx-auto">
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-6 shadow-inner">
          <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-lg">
            Email us at:{" "}
            <a 
              href="mailto:plugovate@gmail.com" 
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              plugovate@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
