import type { NextComponentType } from "next";
import Link from "next/link";

const Navbar: NextComponentType = () => {
  return (
    <nav className="bg-transparent py-4 px-4 fixed top-0 left-0 w-full z-10">
      <div className="max-w-[1200px] w-100 mx-auto flex items-center justify-between">
        <Link href="/" passHref>
          <h3 className="text-xl font-bold tracking-wide text-white">
            BEAT&amp;BUDDY
          </h3>
        </Link>
        <ul className="list-none flex items-center">
          <li className="md:text-lg mr-4">
            <button className="btn px-5 py-1 rounded-lg border-2 text-white">
              Sign In
            </button>
          </li>
          <li className="md:text-lg hidden sm:block">
            <button className="btn px-5 py-1 rounded-lg text-white border-2 border-green-600 bg-green-600">
              Create Account
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
