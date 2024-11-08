import localFont from "next/font/local";
import "./globals.css";

export const metadata = {
  title: "Dom Docciê - A melhor doceria de Curitiba",
  description: "Doces e sobremesas para toda Curitiba!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="icon" href="/favicon.svg" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content="https://www.domdoccie.com.br/" />
        <meta property="og:type" content="website" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
