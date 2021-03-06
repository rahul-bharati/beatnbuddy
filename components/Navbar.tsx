import type { NextComponentType } from "next";
import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "./../context/AppContext";
import { shortenAddress } from "./../utils/shortenAddress";

const Navbar: NextComponentType = () => {
  const { walletConnected, currentAccount, connectWallet } =
    useContext(AppContext);

  return (
    <nav className="bg-black py-4 px-4 fixed top-0 left-0 w-full z-10">
      <div className="max-w-[1200px] w-100 mx-auto flex items-center justify-between">
        <Link href="/" passHref>
          <a className="text-xl font-bold tracking-wide text-white">
            BEAT&amp;BUDDY
          </a>
        </Link>
        <ul className="list-none flex items-center">
          {!walletConnected ? (
            <>
              <li className="md:text-lg mr-4">
                <button
                  className="btn px-5 py-1 rounded-lg border-2 text-white"
                  onClick={() => connectWallet()}
                >
                  Sign In
                </button>
              </li>
              <li className="md:text-lg hidden sm:block">
                <button
                  className="btn px-5 py-1 rounded-lg text-white border-2 border-green-600 bg-green-600"
                  onClick={() => connectWallet()}
                >
                  Create Account
                </button>
              </li>
            </>
          ) : (
            <li className="md:text-lg mr-4">
              <span className="text-white">
                {shortenAddress(currentAccount)}
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
