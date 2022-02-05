import type { NextComponentType } from "next";
import Image from "next/image";

import CreatorImage from "../images/creator.jpg";
import { useContext } from "react";
import { AppContext } from "./../context/AppContext";
import Link from "next/link";

const CreatorsSection: NextComponentType = () => {
  const { walletConnected, connectWallet } = useContext(AppContext);
  const handleJoinBtnClick = () => {
    if (!walletConnected) {
      connectWallet();
    }
  };

  return (
    <div className="flex items-center gap-10 bg-black mt-40 py-10 relative">
      <div className="w-1/2 min-w-[600px]">
        <Image src={CreatorImage} alt="creators" objectFit="cover" />
      </div>
      <div className="flex max-w-[600px] w-full flex-col items-center justify-center absolute top-50 sm:right-10 px-4">
        <h1 className="text-white font-semibold text-4xl tracking-wide text-center">
          Calling all creators
        </h1>
        <p className="text-xl mt-8 text-white max-w-[600px] text-center">
          Connect with your fans, share your sound and grow your audience and
          earn in cryptos. What are you waiting for?
        </p>
        {!walletConnected ? (
          <button
            className="btn px-10 py-3 bg-green-600 text-white mt-5 rounded-full shadow-lg text-xl mt-12"
            onClick={handleJoinBtnClick}
          >
            Join Now
          </button>
        ) : (
          <Link href="/create" passHref>
            <a className="btn px-10 py-3 bg-green-600 text-white mt-5 rounded-full shadow-lg text-xl mt-12">
              Create
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CreatorsSection;
