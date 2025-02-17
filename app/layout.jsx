import { Noto_Sans_KR } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';

const baskinB = localFont({
  src: '../assets/fonts/baskin/br_b.otf',
  variable: '--font-baskinB',
});
const baskin = localFont({
  src: '../assets/fonts/baskin/br_r.otf',
  variable: '--font-baskin',
});

const notoSansKr = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function HTMLLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${baskinB.variable} ${baskin.variable} ${notoSansKr.className}`}
      >
        {children}
      </body>
    </html>
  );
}
