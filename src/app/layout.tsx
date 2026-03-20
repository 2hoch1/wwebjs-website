import { RootProvider } from 'fumadocs-ui/provider/next';
import { Banner } from 'fumadocs-ui/components/banner';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://wwebjs.2hoch1.dev'),
};

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={inter.className}
      suppressHydrationWarning
      dir="ltr"
    >
      <body className="flex flex-col min-h-screen">
        <Banner id="banner-experimental-preview" className='text-red/90'>This is a experimental preview!</Banner>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
