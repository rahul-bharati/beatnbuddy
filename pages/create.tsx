import type { NextPage } from "next";
import { ChangeEvent, useContext, useEffect, useState } from "react";

import { AppContext } from "../context/AppContext";

import Loading from "../components/Loading";
import { Filelike } from "web3.storage";
import { jsonFile, makeGatewayURL } from "../utils/storage";
import { sound } from "../config";
import MySoundsContainer from "../components/MySoundsContainer";

const filePrefix = "BeatnBuddy";

const Create: NextPage = () => {
  const {
    currentAccount,
    storageClient,
    walletConnected,
    connectWallet,
    getSoundNFTContract,
    getBeatnBuddyContract,
  } = useContext(AppContext);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [percent, setPercent] = useState(0);

  const checkOrConnectWallet = async () => {
    if (!walletConnected) {
      await connectWallet();
    }
  };

  useEffect(() => {
    checkOrConnectWallet();
  }, []);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setFile(file);
  };

  const handleSubmit = async () => {
    if (!title) return;
    setLoading(true);

    try {
      const uploadname = [filePrefix, title.split(" ").join("-")].join("-");
      const metadata = { file: file?.name, title, owner: currentAccount };
      const metadataFile = jsonFile("metadata.json", metadata);
      const fileSize = file?.size || 0;
      const fileCid = await storageClient?.put(
        [file as Filelike, metadataFile],
        {
          name: uploadname,
          onStoredChunk: (bytes) => {
            const percent = (bytes * 100) / fileSize;
            setPercent(percent);
          },
        }
      );

      const metadataGatewayURL = makeGatewayURL(fileCid, "metadata.json");
      const soundGatewayURL = makeGatewayURL(fileCid, file?.name);
      const soundURI = `ipfs://${fileCid}/${file?.name}`;
      const metadataURI = `ipfs://${fileCid}/metadata.json`;
      console.log({
        fileCid,
        metadataGatewayURL,
        soundGatewayURL,
        soundURI,
        metadataURI,
      });
      const soundContract = getSoundNFTContract();
      const beatnbuddyContract = getBeatnBuddyContract();

      const soundTransaction = await soundContract.createToken(
        metadataGatewayURL
      );
      const soundTxn = await soundTransaction.wait();
      const soundEvent = soundTxn.events[0];
      const soundValue = soundEvent.args[2];
      const soundTokenId = soundValue.toNumber();

      const beatnbuddyTransaction = await beatnbuddyContract.createSoundItem(
        sound,
        soundTokenId
      );
      await beatnbuddyTransaction.wait();

      setTitle("");
      setLoading(false);
      setPercent(0);
      alert("NFT generated");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Loading percent={percent} />}
      <div className="max-w-[1200px] w-full py-10 px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 tracking-wide">
          Upload your music
        </h2>
        <p className="text-md text-gray-500 text-center">
          Please provide information about your music
        </p>
        <div className="container my-8 px-3 max-w-[600px] mx-auto">
          <div className="py-3">
            <label htmlFor="asset" className="text-gray-900 text-sm">
              Music file:
            </label>
            <input
              type="file"
              name="asset"
              id="asset"
              accept=".mp3,.wav,.m4a"
              className="bg-gray-200 w-full border-0 text-lg px-4 py-2 rounded-lg text-gray-900 font-bold"
              onChange={(e) => handleFileChange(e)}
              required
            />
          </div>
          <div className="py-3">
            <label htmlFor="title" className="text-gray-900 text-sm">
              Title:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="bg-gray-200 w-full border-0 text-lg px-4 py-2 rounded-lg text-gray-900 font-bold"
              placeholder="Title for your music"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="py-3">
            <label htmlFor="address" className="text-gray-900 text-sm">
              Creators Address:
            </label>
            <input
              type="text"
              name="address"
              id="address"
              className="bg-gray-200 w-full border-0 text-lg px-4 py-2 rounded-lg text-gray-900 font-bold"
              placeholder="Creators Address"
              readOnly
              value={currentAccount}
            />
          </div>
          <div className="text-center">
            <button
              className="btn px-8 py-2 bg-green-600 text-white rounded-lg shadow-lg text-lg mt-8 active:scale-90"
              onClick={handleSubmit}
            >
              Upload
            </button>
          </div>
        </div>
        <MySoundsContainer />
      </div>
    </>
  );
};

export default Create;
