import type { NextComponentType } from "next";
import ListGrid from "./ListGrid";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./../context/AppContext";
import axios from "axios";

interface itemStateProps {
  tokenId: any;
  owner: any;
  title: any;
  soundUri: any;
}

const MySoundsContainer: NextComponentType = () => {
  const {
    getSoundNFTContract,
    getBeatnBuddyContract,
    walletConnected,
    connectWallet,
  } = useContext(AppContext);

  const [items, setItem] = useState<itemStateProps[]>([]);

  const fetchLatestMusics = async () => {
    if (!walletConnected) {
      await connectWallet();
    }
    const soundContract = getSoundNFTContract();
    const beatnBuddyContract = getBeatnBuddyContract();
    const data: [] = await beatnBuddyContract.getMySounds();
    console.log(data);

    const items: itemStateProps[] = await Promise.all(
      data.map(async (i: { tokenId: any; owner: any }) => {
        const tokenUri = await soundContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        const item = {
          tokenId: i.tokenId.toNumber(),
          owner: i.owner,
          title: meta.data.title,
          soundUri: tokenUri.replace("metadata.json", meta.data.file),
        };

        return item;
      })
    );
    setItem(items);
  };

  useEffect(() => {
    fetchLatestMusics();
  }, []);

  return (
    <div className="px-4 max-w-[1200px] mx-auto mt-12 py-10">
      <h2 className="text-2xl text-gray-900 text-center font-bold">
        Hear are your uploads
      </h2>
      <div className="relative overflow-auto">
        <ListGrid data_array={items} />
      </div>
    </div>
  );
};

export default MySoundsContainer;
