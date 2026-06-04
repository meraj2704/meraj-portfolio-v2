import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "../components/SmoothScroll";
import CustomCursor from "../components/CustomCursor";
import Preloader from "../components/Preloader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://merajhossain.online";

const description =
  "Meraj Hossain is a freelance full-stack web developer in Uttara, Dhaka, Bangladesh, available to hire for custom web apps, SaaS platforms, e-commerce, and REST API & database integration — built with Next.js, Nest.js, React, Node.js, PostgreSQL, and Prisma.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Meraj Hossain — Next.js & Nest.js Full-Stack Developer",
    template: "%s | Meraj Hossain",
  },
  description,
  applicationName: "Meraj Hossain — Portfolio",
  authors: [{ name: "Meraj Hossain", url: siteUrl }],
  creator: "Meraj Hossain",
  publisher: "Meraj Hossain",
  category: "technology",
  keywords: [
    // Brand
    "Meraj Hossain",
    // "Best" + location intent
    "best website developer in Uttara",
    "best website developer in Dhaka",
    "best website developer in Bangladesh",
    "best web developer in Uttara",
    "best web developer in Dhaka",
    "best web developer in Bangladesh",
    "best Next.js developer in Bangladesh",
    "best Nest.js developer in Dhaka",
    "best React developer in Dhaka",
    "best full-stack developer in Bangladesh",
    "best frontend developer in Dhaka",
    "best software developer in Uttara",
    "best freelance web developer in Dhaka",
    "best portfolio website developer in Bangladesh",
    // "Best" + tech intent
    "best Next.js developer",
    "best Nest.js developer",
    "best React developer",
    "best full-stack developer",
    "best frontend developer",
    "best backend developer",
    "best web application developer",
    "best TypeScript developer",
    "best Node.js developer",
    // Freelance / hire / service intent
    "freelance full stack developer portfolio",
    "Meraj Hossain freelance full stack developer",
    "hire full stack web developer",
    "hire Meraj Hossain full stack developer",
    "remote Next.js developer portfolio",
    "custom web application developer freelance",
    "MERN stack developer freelance",
    "hire React and Node.js developer",
    "custom SaaS platform web developer",
    "e-commerce website developer Next.js",
    "REST API and database integration expert",
    "Next.js speed optimization specialist",
    "Prisma and PostgreSQL full stack developer",
    "full stack web developer in Uttara",
    "full stack web developer in Dhaka",
    "full stack web developer in Bangladesh",
    "freelance website developer Uttara",
    "freelance website developer Dhaka",
    "web development services Uttara",
    "web development services Dhaka",
    "web development services Bangladesh",
    // Core skills
    "Next.js developer",
    "Nest.js developer",
    "full-stack developer",
    "React developer",
    "TypeScript developer",
    "Node.js developer",
    "frontend developer",
    "backend developer",
    "web developer Dhaka",
    "web developer Bangladesh",
    "PostgreSQL",
    "Prisma",
    "JavaScript developer",
    "software engineer",
    "ATI Limited",
    "portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "JEWECwhWTt1uJatw6k6uyaZfaErkHBZaDxflyIO7Da0",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Meraj Hossain",
    title: "Meraj Hossain — Next.js & Nest.js Full-Stack Developer",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Meraj Hossain — Next.js & Nest.js Full-Stack Developer",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Meraj Hossain",
  url: siteUrl,
  image: `${siteUrl}/meraj-profile.jpg`,
  jobTitle: "Full-Stack Developer",
  description,
  worksFor: {
    "@type": "Organization",
    name: "ATI Limited",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Uttara",
    addressRegion: "Dhaka",
    addressCountry: "Bangladesh",
  },
  nationality: "Bangladeshi",
  knowsAbout: [
    "Next.js",
    "Nest.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Prisma",
    "MERN Stack",
    "SaaS Development",
    "E-commerce Development",
    "REST API Development",
    "Web Performance Optimization",
    "Web Development",
    "Frontend Development",
    "Backend Development",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Custom Web Application Development",
        serviceType: "Full-Stack Web Development",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "SaaS Platform Development",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "E-commerce Website Development",
        serviceType: "Next.js Development",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "REST API & Database Integration",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Next.js Performance Optimization",
      },
    },
  ],
  sameAs: [
    "https://github.com/meraj2704",
    "https://www.linkedin.com/in/meraj-hossain-6566b8231/",
    "https://www.facebook.com/ije0010/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white font-[var(--font-inter)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
