import AlbumArtContainer from "./AlbumArtContainer";

interface Props {
  data_array?: {
    tokenId: string;
    owner: string;
    title: string;
    soundUri: string;
  }[];
}

const ListGrid = ({ data_array }: Props) => {
  return (
    <div className="mt-10 max-w-[992px] mx-auto">
      {data_array &&
        data_array.map((data, index) => (
          <AlbumArtContainer data={data} key={index} />
        ))}
    </div>
  );
};

export default ListGrid;
