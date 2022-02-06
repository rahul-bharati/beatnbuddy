import { AiFillPlayCircle } from "react-icons/ai";
import { useContext } from "react";
import { AppContext } from "./../context/AppContext";
interface Props {
  data: {
    tokenId: string;
    owner: string;
    title: string;
    soundUri: string;
  };
}

const AlbumArtContainer = ({ data }: Props) => {
  const { setPlayerData } = useContext(AppContext);

  const handleClick = () => {
    setPlayerData({ ...data });
  };

  return (
    <div
      className="w-full flex items-center border-b-2 border-gray-500 px-4 mt-3 cursor-pointer"
      onClick={handleClick}
    >
      <AiFillPlayCircle className="text-5xl text-gray-900 mr-5" />
      <div className="details-container flex flex-col">
        <p className="text-gray-900 text-2xl font-bold">{data.title}</p>
        <p className="text-gray-500">{data.owner}</p>
      </div>
    </div>
  );
};

export default AlbumArtContainer;
