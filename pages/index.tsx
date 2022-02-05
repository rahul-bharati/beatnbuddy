import type { NextPage } from "next";
import CreatorsSection from "../components/CreatorsSection";
import Header from "../components/Header";
import Player from "../components/Player";
import SearchBar from "../components/SearchBar";
import TrendingContainer from "../components/TrendingContainer";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <TrendingContainer />
      <CreatorsSection />
      <Player />
    </>
  );
};

export default Home;
