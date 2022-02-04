import type { NextComponentType } from "next";

const Footer: NextComponentType = () => {
  return (
    <div className="container max-w-[1200px] mx-auto flex items-center justify-center mt-10 pt-10">
      <p className="text-gray-900">Copyright &copy; 2022, @BEAT&amp;BUDDY</p>
    </div>
  );
};

export default Footer;
