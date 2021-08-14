import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title> Project Media</title>
        <meta
          name="description"
          content="My wonderfull dummy project using the latest technologies utilizing graphql caching and dataloader for data manipulation"
        />
        <meta
          name="keywords"
          content="Javascript, Typescript, GraphQL, ReactJS, NextJS"
        />
        <meta name="author" content="Ericson Orias Funtanar" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
