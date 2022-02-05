import type { NextComponentType } from "next";
import ListGrid from "./ListGrid";
import { useContext, useEffect } from "react";
import { AppContext } from "./../context/AppContext";

const TrendingContainer: NextComponentType = () => {
  const {
    getSoundNFTContract,
    getBeatnBuddyContract,
    walletConnected,
    connectWallet,
  } = useContext(AppContext);

  const fetchLatestMusics = async () => {
    if (!walletConnected) {
      await connectWallet();
    }
    if (walletConnected) {
      const soundContract = getSoundNFTContract();
      const beatnBuddyContract = getBeatnBuddyContract();
      const data: [] = await beatnBuddyContract.getSounds(false);
      console.log(data);

      const items = await Promise.all(
        data.map(async (i: { soundId: string }) => {
          const tokenUri = await soundContract.tokenURI(i.soundId);
        })
      );
    }
  };

  useEffect(() => {
    fetchLatestMusics();
  }, []);

  return (
    <div className="px-4 max-w-[1200px] mx-auto">
      <h2 className="text-2xl text-gray-900 text-center font-bold">
        Hear what&apos;s trending today
      </h2>
      <div className="relative overflow-auto">
        {/* <ListGrid data_array={data} /> */}
      </div>
    </div>
  );
};

export default TrendingContainer;
