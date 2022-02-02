import type { NextComponentType } from "next";

const Header: NextComponentType = () => {
  return (
    <>
      <div className="w-full min-h-[550px] relative overflow-hidden">
        <div className="w-full h-full absolute t-0 l-0 -z-10">
          <video
            className="w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
          >
            <source src="/videos/beatnbuddy.mp4" />
          </video>
        </div>
        <div className="flex flex-col h-[550px] justify-center items-center bg-gray-900/[.5] px-3 py-5">
          <h1 className="text-white font-semibold text-4xl tracking-wide text-center">
            Connect on Beat&amp;Buddy
          </h1>
          <p className="text-xl mt-8 text-white max-w-[600px] text-center">
            Built on top of blockchain to provide a place to discover, stream
            and share a constantly expanding mix of music.
          </p>
          <button className="btn px-10 py-3 bg-green-600 text-white mt-5 rounded-full shadow-lg text-xl mt-12">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
