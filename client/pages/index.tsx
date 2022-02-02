import type { NextPage } from "next";
import Header from "../components/Header";
import Player from "../components/Player";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <h1 className="text-3xl font-bold underline">Beat &amp; Buddy</h1>
      <Player />
    </>
  );
};

export default Home;
