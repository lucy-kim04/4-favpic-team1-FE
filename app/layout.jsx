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

export default function HTMLLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${baskinB.variable} ${baskin.variable}`}>
        {children}
      </body>
    </html>
  );
}
