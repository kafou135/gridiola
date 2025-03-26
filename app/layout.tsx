import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import SearchBar from './components/searchBar/SearchBar'
import AdSense from "../app/components/adsense"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GRIDIOLA', // Updated app name
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
      <AdSense pId="ca-pub-8853506957457177"/>

      </head>
      <body className={inter.className}>
      

        {/* Simple Background */}
        <div className="min-h-screen bg-white"> {/* Changed to solid dark background */}
          {/* Content */}
          <div className="relative z-10">
            {/* SearchBar */}
            <div className="sticky top-0 z-20">
            </div>

            {/* Main Content (Children) */}
            <main >
              <SearchBar/>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}