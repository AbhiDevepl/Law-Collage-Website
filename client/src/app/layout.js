import "./globals.css";
import Footer from "@/components/Common/Footer/Footer";
import Navbar from "@/components/Common/NavBar/NavBar";
import NextTopLoader from 'nextjs-toploader';
import Script from 'next/script';
import ScrollingAnnouncements from '@/components/ScrollingAnnouncements';
import ComplaintWidget from '@/components/ComplaintWidget/ComplaintWidget';

export const metadata = {
  title: 'SSNLC - Shri Shivajirao Nagawade Law College',
  description: 'Official website of Shri Shivajirao Nagawade Law College. Explore academics, events, faculty, and more.',
  generator: 'Next.js',
  applicationName: 'SSNLC',
  referrer: 'origin-when-cross-origin',
  keywords: 'Law College, SSNLC, Academics, Events, Faculty, Shrigonda, Education, Legal Education, Maharashtra Law College, Best Law College in Maharashtra',
  metadataBase: new URL('https://ssnlc.in'),
  authors: [{ name: 'SSNLC', url: 'https://ssnlc.in' }],
  creator: 'SSNLC',
  publisher: 'SSNLC',
  manifest: '/manifest.json',
  alternates: {
    canonical: 'https://ssnlc.in',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification=FWUIogef4ycBJUm404SHD0gxt27xmnYQSzAiVwrVKQc',
  },
  icons: {
    icon: [
      { url: 'https://ik.imagekit.io/sk67opnzi/collegelogonew.png', sizes: '32x32', type: 'image/png' },
      { url: 'https://ik.imagekit.io/sk67opnzi/collegelogonew.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: 'https://ik.imagekit.io/sk67opnzi/collegelogonew.png',
    apple: 'https://ik.imagekit.io/sk67opnzi/collegelogonew.png',
  },
  openGraph: {
    title: 'SSNLC - Shri Shivajirao Nagawade Law College',
    description: 'Official website of Shri Shivajirao Nagawade Law College. Explore academics, events, faculty, and more.',
    url: 'https://ssnlc.in',
    siteName: 'SSNLC',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SSNLC Logo',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@ssnlc',
    title: 'SSNLC - Shri Shivajirao Nagawade Law College',
    description: 'Official website of Shri Shivajirao Nagawade Law College. Explore academics, events, faculty, and more.',
    images: ['/images/og-image.jpg'], // was `image` (singular) — invalid key, card silently broke
  },
}

export const viewport = {
  themeColor: '#431d7a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
}

// Escapes < to prevent premature </script> termination in dangerouslySetInnerHTML JSON-LD
const safeJsonLd = (data) =>
  JSON.stringify(data).replace(/</g, '\\u003c');

const structuredData = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Shri Shivajirao Nagawade Law College",
  "alternateName": "SSNLC",
  "url": "https://ssnlc.in",
  "logo": "https://ssnlc.in/collegelogonew.png",
  "sameAs": [
    // TODO: confirm these are real, live profiles — dead/incorrect sameAs links hurt entity trust
    "https://www.facebook.com/ssnlc",
    "https://twitter.com/ssnlc",
    "https://www.instagram.com/ssnlc"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Shrigonda",
    "addressLocality": "Ahilyanagar", // renamed from Ahmednagar
    "addressRegion": "Maharashtra",
    "postalCode": "413701",
    "addressCountry": "IN"
  },
  "telephone": "+91-9270709696", // TODO: replace with real number before deploy
  "email": "info@ssnlc.in",
  "description": "Shri Shivajirao Nagawade Law College offers comprehensive legal education programs with a focus on practical skills and ethical values.",
  "foundingDate": "2010",
  "areaServed": "Maharashtra",
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Academic Programs",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "LL.B. (3 Years)",
          "description": "Bachelor of Law - 3 Year Program"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Course",
          "name": "B.A. LL.B. (5 Years)",
          "description": "Integrated Bachelor of Arts and Bachelor of Law - 5 Year Program"
        }
      }
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="apple-touch-icon" href="https://ik.imagekit.io/sk67opnzi/logo.jpeg" />
        <link rel="apple-touch-startup-image" href="/images/splash.png" />

        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(structuredData) }}
        />

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body className="min-h-screen font-sans antialiased">
        <div className="h-screen w-full fixed top-0 left-0 -z-50 bg-gradient-to-b from-white to-blue-100"></div>
        <NextTopLoader
          color="#431d7a"
          initialPosition={0.08}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Navbar />
        <ScrollingAnnouncements />
        <main className="min-h-screen overflow-x-hidden mt-2">
          {children}
        </main>
        <Footer />
        <ComplaintWidget />

        <Script id="service-worker" strategy="lazyOnload">
          {`
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.register('/sw.js').then(
                function(registration) {
                  console.log('Service Worker registration successful with scope: ', registration.scope);
                },
                function(err) {
                  console.log('Service Worker registration failed: ', err);
                }
              );
            }
          `}
        </Script>
      </body>
    </html>
  );
}