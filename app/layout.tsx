import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientLayout from "../components/ClientLayout";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Architectorly - Find Verified Architects in Pakistan",
  description: "Architectorly is Pakistan's #1 directory for architects and home designers. Search verified professionals in Lahore, Karachi, and Islamabad.",
  metadataBase: new URL('https://www.architectorly.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.architectorly.com',
    title: 'Architectorly - Find Verified Architects in Pakistan',
    description: 'Connect with elite architectural practices. Search verified professionals in Lahore, Karachi, and Islamabad.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style dangerouslySetInnerHTML={{__html: `
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #fbfbfd;
            color: #1d1d1f;
            -webkit-font-smoothing: antialiased;
            letter-spacing: -0.011em;
          }
          .apple-glass {
            background: rgba(255, 255, 255, 0.72);
            backdrop-filter: saturate(180%) blur(20px);
            -webkit-backdrop-filter: saturate(180%) blur(20px);
          }
          .page-transition {
            animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}} />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}