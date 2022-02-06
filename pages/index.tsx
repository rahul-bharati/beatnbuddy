import type { NextPage } from "next";
import CreatorsSection from "../components/CreatorsSection";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TrendingContainer from "../components/TrendingContainer";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <SearchBar />
      <TrendingContainer />
      <CreatorsSection />
    </>
  );
};

export default Home;
