import type { NextPage } from "next";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Player from "../components/Player";
import SearchBar from "../components/SearchBar";
import TrendingContainer from "../components/TrendingContainer";

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <Header />
      <SearchBar />
      <TrendingContainer />
      <Player />
    </>
  );
};

export default Home;
