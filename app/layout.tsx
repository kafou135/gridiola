import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gridiola', // Updated app name
  description: 'Your go-to app for football stats, live matches, and team insights.', // Updated description
  icons:{
    icon:['/khdam1.png?v=4'],
    apple:['/apple-touch-icon1.png?v=4'],
    shortcut:['/apple-touch-icon1.png']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      <meta property="og:image" content="/khdam1.png?v=4"/>
      <meta property="og:image:width" content="1200"/>
      <meta property="og:image:height" content="630"/>
      <meta name="twitter:image" content="/khdam1.png?v=4"/>
      <meta name="twitter:card" content="summary_large_image"/>
       <meta name="google-adsense-account" content="ca-pub-8853506957457177"/>
       <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8853506957457177"
     crossOrigin="anonymous"></Script>
     <Script async custom-element="amp-ad" src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"></Script>
     
      </head>
      <body>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8853506957457177"
     crossOrigin="anonymous"></Script>
<ins className="adsbygoogle display:block"
     data-ad-client="ca-pub-8853506957457177"
     data-ad-slot="2490295919"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<Script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</Script>
<Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-LJ4735L424`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LJ4735L424', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
        {/* Simple Background */}
        <div className="min-h-screen bg-gray-900"> {/* Changed to solid dark background */}
          {/* Content */}
          <div className="relative z-10">
            {/* SearchBar */}
            <div className="sticky top-0 z-20">
            </div>

            {/* Main Content (Children) */}
            <main className="px-4 py-8 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}