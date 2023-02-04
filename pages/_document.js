import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
            <title>PerFEKTní drill</title>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
            <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-4GTYB84KXB"></script>
        </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}