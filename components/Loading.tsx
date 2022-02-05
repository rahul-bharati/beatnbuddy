import { CgSpinnerTwo } from "react-icons/cg";

interface Props {
  percent: number;
}

const Loading = ({ percent }: Props) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-gray-900/[.6] flex items-center justify-center flex-col">
      <CgSpinnerTwo className="text-8xl text-white animate-spin" />
      {/* <h3 className="text-3xl font-bold text-white mt-3">
        {percent.toFixed(2)}% uploaded
      </h3> */}
      <h3 className="text-3xl font-bold text-white mt-3">Please wait...</h3>
    </div>
  );
};

export default Loading;
