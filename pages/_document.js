import { Html, Head, Main, NextScript } from "next/document";
// import Script from 'next/script'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Tourbook - one place to manage all your tours!"/>
        <link rel="icon" href="/tourbook_icon.svg" />
        
        <meta name="robots" content="all" />

        <meta property="og:title" content="Tourbook"/>
        <meta property="og:description" content="Tourbook - one place to manage all your tours!"/>
        <meta property="og:image" content="https://tour-book.s3.ap-south-1.amazonaws.com/tourbook.jpg"/>
        <meta property="og:image:secure" content="https://tour-book.s3.ap-south-1.amazonaws.com/tourbook.jpg"/>
        <meta property="og:url" content="https://tourbook.edwinroosevelt.com"/>

        <meta name="keywords" content="learning, courses, education, tutorial, web development"/>

        <link rel="preconnect" href="https://cdn.jsdelivr.net"></link>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
        ></link>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossOrigin="anonymous"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        ></Script> */}
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossOrigin="anonymous"
        ></script>
      </body>
    </Html>
  );
}
