import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Open Graph Tags */}
        <meta property="og:title" content="TroopHunter - Find your next client!" />
        <meta property="og:description" content="TroopHunter simplifies finding and connecting with businesses around the world." />
        <meta property="og:image" content="https://www.troophunter.com/troophunter.png" />
        <meta property="og:url" content="https://www.troophunter.com" />
        <meta property="og:type" content="website" />
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TroopHunter - Find your next client!" />
        <meta name="twitter:description" content="TroopHunter simplifies finding and connecting with businesses around the world." />
        <meta name="twitter:image" content="https://www.troophunter.com/troophunter.png" />
        <meta name="twitter:site" content="@TroopHunter" />
        <link rel="apple-touch-icon" type="image/svg+xml" sizes="180x180" href="/apple-touch-icon.svg" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        {/* <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon-32x32.svg">
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16x16.svg"> */}
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
