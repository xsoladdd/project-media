import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "react-calendar/dist/Calendar.css";

import type { AppProps } from "next/app";
import ApolloProvider from "../providers/ApolloProvider";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Project Media</title>
      </Head>
      <ApolloProvider>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  );
}
export default MyApp;
