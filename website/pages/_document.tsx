import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preload" href="/fonts/light.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/light-italic.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/regular.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/bold.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/italic.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/medium.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/medium-italic.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/bold.otf" as="font" crossOrigin="" type="font/otf"></link>
        <link rel="preload" href="/fonts/bold-italic.otf" as="font" crossOrigin="" type="font/otf"></link>

        <link rel="apple-touch-icon" sizes="180x180" href={`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/apple-touch-icon.svg`} />
        <link rel="icon" type="image/x-icon" href={`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/favicon.ico`} />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href={`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/favicon-32x32.svg`} />
        <link rel="icon" type="image/svg+xml" sizes="16x16" href={`${process.env.NEXT_PUBLIC_TROOPHUNTER_URL}/favicon-16x16.svg`} />

        {/* <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" /> */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <body className="font-poppins text-zinc-700">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
