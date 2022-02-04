import Image from "next/image";

interface Props {
  data: {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  };
}

const AlbumArtContainer = ({ data }: Props) => {
  return (
    <div className="max-w-[200px] w-75 flex-none">
      <Image width={200} height={200} src={data.url} alt={data.title} />
      <p className="text-gray-900">{data.title}</p>
    </div>
  );
};

export default AlbumArtContainer;
