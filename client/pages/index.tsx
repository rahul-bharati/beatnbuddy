import type { NextPage } from "next";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import SearchBar from "../components/SearchBar";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <SearchBar />
      <h1 className="text-3xl font-bold underline">Beat &amp; Buddy</h1>
      <Player />
    </>
  );
};

export default Home;
