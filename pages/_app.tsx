import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import { AppContextProvider } from "../context/AppContext";
import Footer from "../components/Footer";
import Player from "./../components/Player";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <Player />
      </>
    </AppContextProvider>
  );
}

export default MyApp;
