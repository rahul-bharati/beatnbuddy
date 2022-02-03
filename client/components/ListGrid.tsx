import AlbumArtContainer from "./AlbumArtContainer";

interface Props {
  data_array?: {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }[];
}

const ListGrid = ({ data_array }: Props) => {
  return (
    <div className="flex flex-nowrap gap-5 mt-10">
      {data_array &&
        data_array.map((data, index) => (
          <AlbumArtContainer data={data} key={index} />
        ))}
    </div>
  );
};

export default ListGrid;
