import type { NextPage } from "next";
import CreatorsSection from "../components/CreatorsSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
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
      <Footer />
      <Player />
    </>
  );
};

export default Home;
